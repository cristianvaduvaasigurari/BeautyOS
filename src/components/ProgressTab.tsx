"use client";

import React, { useState, useRef, useEffect } from "react";
import { useBeautyOS, ProgressPhoto } from "../context/BeautyOSContext";
import { designSystem } from "../styles/designSystem";
import { Camera, Award, Compass, TrendingUp, Check, ShieldCheck } from "lucide-react";
import { trackBetaEvent } from "../lib/analytics";

export const ProgressTab: React.FC = () => {
  const { journalEntries, userSession } = useBeautyOS();
  const [photoAngle, setPhotoAngle] = useState<"Front" | "Left Profile" | "Right Profile">("Front");
  const [showCamera, setShowCamera] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [showPermissionPreScreen, setShowPermissionPreScreen] = useState(false);
  const [cameraSuccess, setCameraSuccess] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState<ProgressPhoto[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sync photo history logs from localStorage
  useEffect(() => {
    const fetchPhotos = () => {
      const stored = localStorage.getItem("progress_photos");
      if (stored) {
        setCapturedPhotos(JSON.parse(stored));
      }
    };
    fetchPhotos();
    
    // Catch local trigger events
    window.addEventListener("storage", fetchPhotos);
    return () => window.removeEventListener("storage", fetchPhotos);
  }, []);

  // 1. Prepare SVG Chart data
  const chartEntries = [...journalEntries].reverse();
  const indexPoints = chartEntries.map((e) => e.skinIndex);

  const width = 300;
  const height = 100;
  const padding = 15;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const getPointsPath = () => {
    if (indexPoints.length < 2) return "";
    const minVal = 0;
    const maxVal = 100;

    return indexPoints
      .map((score, index) => {
        const x = padding + (index / (indexPoints.length - 1)) * chartWidth;
        const y = padding + chartHeight - ((score - minVal) / (maxVal - minVal)) * chartHeight;
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  // 2. HTML5 Camera Stream Engine
  const requestCameraPermission = async () => {
    setShowPermissionPreScreen(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraPermissionGranted(true);
    } catch (err) {
      console.error("Camera access blocked by user or environment.", err);
      alert("Permisiunea pentru camera a fost blocata. Verifica setarile browserului.");
      setShowCamera(false);
    }
  };

  const handleStartCameraFlow = () => {
    if (cameraPermissionGranted) {
      setShowCamera(true);
      // Re-initialize stream if already granted
      setTimeout(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: false,
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (e) {
          console.error(e);
        }
      }, 100);
    } else {
      setShowPermissionPreScreen(true);
    }
  };

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraPermissionGranted(false);
  };

  const captureSnapshot = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Flip canvas horizontally to mirror user camera view
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const base64Img = canvas.toDataURL("image/jpeg");
        
        // Calculate dynamic mock lighting rating (based on center-pixel brightness average)
        const frameData = ctx.getImageData(canvas.width / 4, canvas.height / 4, canvas.width / 2, canvas.height / 2);
        let sumLuminance = 0;
        for (let i = 0; i < frameData.data.length; i += 4) {
          const r = frameData.data[i];
          const g = frameData.data[i + 1];
          const b = frameData.data[i + 2];
          sumLuminance += 0.299 * r + 0.587 * g + 0.114 * b;
        }
        const avgLuminance = sumLuminance / (frameData.data.length / 4);
        const lightingScore = Math.min(5, Math.max(1, Math.round((avgLuminance / 255) * 5)));

        setCameraSuccess(true);
        
        setTimeout(() => {
          setCameraSuccess(false);
          setShowCamera(false);
          stopCameraStream();

          const newPhoto: ProgressPhoto = {
            id: `img_${Date.now()}`,
            userId: userSession?.user?.id || "user_123",
            date: new Date().toISOString().split("T")[0],
            photoUrl: base64Img,
            angle: photoAngle,
            lightingRating: lightingScore,
            notes: `Captura realizata la intensitate luminoasa ${lightingScore}/5.`,
          };

          const updatedList = [newPhoto, ...capturedPhotos];
          setCapturedPhotos(updatedList);
          localStorage.setItem("progress_photos", JSON.stringify(updatedList));

          // Sync to Supabase queue
          const queue = JSON.parse(localStorage.getItem("offline_sync_queue") || "[]");
          queue.push({
            id: `q_${Date.now()}`,
            table: "progress_photos",
            action: "INSERT",
            payload: {
              id: newPhoto.id,
              date: newPhoto.date,
              photo_url: newPhoto.photoUrl,
              angle: newPhoto.angle,
              lighting_rating: newPhoto.lightingRating,
              notes: newPhoto.notes,
            },
          });
          localStorage.setItem("offline_sync_queue", JSON.stringify(queue));
          window.dispatchEvent(new Event("storage"));

          trackBetaEvent("photo_added", {
            angle: newPhoto.angle,
            lightingRating: newPhoto.lightingRating,
          });
        }, 800);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24 animate-fadeIn max-w-md mx-auto relative font-sans text-xs">
      
      {/* Tab Header */}
      <div>
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Jurnalul Pielii</span>
        <h1 className="text-xl font-extrabold text-white font-sans">Evoluție si Istoric</h1>
      </div>

      {/* 1. Skin Index Chart (Plain Performant SVG) */}
      <div className={designSystem.card + " space-y-4 shadow-lg"}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-white font-sans">Evoluție Scor Diagnostic</span>
          </div>
          <span className="text-[9px] font-mono text-zinc-500 uppercase">Istoric Check-in-uri</span>
        </div>

        {journalEntries.length < 2 ? (
          <div className="h-28 flex items-center justify-center border border-dashed border-white/5 rounded-2xl bg-zinc-900/10">
            <p className="text-[10.5px] text-zinc-500 text-center max-w-[240px] leading-relaxed">
              Măsurătorile graficului necesită minim 2 check-in-uri zilnice pentru a calibra curba Skin Index.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-full bg-zinc-950/40 rounded-2xl border border-white/5 p-2 overflow-hidden">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                <line x1={padding} y1={padding} x2={width - padding} y2={padding} className="stroke-white/5" strokeDasharray="3" />
                <line x1={padding} y1={padding + chartHeight / 2} x2={width - padding} y2={padding + chartHeight / 2} className="stroke-white/5" strokeDasharray="3" />
                <line x1={padding} y1={padding + chartHeight} x2={width - padding} y2={padding + chartHeight} className="stroke-white/5" strokeDasharray="3" />

                <path d={getPointsPath()} className="stroke-emerald-500 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {indexPoints.map((score, index) => {
                  const x = padding + (index / (indexPoints.length - 1)) * chartWidth;
                  const y = padding + chartHeight - ((score - 0) / (100 - 0)) * chartHeight;
                  return (
                    <g key={index}>
                      <circle cx={x} cy={y} r="3.5" className="fill-emerald-500 stroke-[#09090b]" strokeWidth="1.5" />
                      {index === indexPoints.length - 1 && (
                        <text x={x - 10} y={y - 8} className="fill-emerald-400 text-[8px] font-mono font-bold">
                          {score}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="flex justify-between text-[8px] font-mono text-zinc-500 px-1">
              <span>{chartEntries[0]?.date}</span>
              <span>{chartEntries[chartEntries.length - 1]?.date}</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Photo Journey Grid */}
      <div className={designSystem.card + " space-y-4 shadow-lg"}>
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-sm font-semibold text-white font-sans">Jurnal Foto Diagnostic</span>
          <button
            onClick={handleStartCameraFlow}
            className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-3 py-1.5 rounded-xl text-[10px] font-semibold cursor-pointer hover:bg-emerald-500/20 active:scale-95 transition-all"
          >
            <Camera className="w-3.5 h-3.5" /> Deschide Camera
          </button>
        </div>

        {capturedPhotos.length === 0 ? (
          <div className="grid grid-cols-3 gap-2">
            <div className="relative aspect-square bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-2 text-center">
              <span className="text-[10px] font-bold text-zinc-300">Baseline</span>
              <span className="text-[8px] text-zinc-500 font-mono mt-1">14 Iul 2026</span>
            </div>
            <div className="relative aspect-square bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-2 text-center">
              <span className="text-[10px] font-bold text-zinc-300">Ziua 3</span>
              <span className="text-[8px] text-zinc-500 font-mono mt-1">17 Iul 2026</span>
            </div>
            <div className="relative aspect-square bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-2 text-center text-zinc-650">
              <Camera className="w-5 h-5 mx-auto mb-1 opacity-20" />
              <span className="text-[8.5px] font-light">Foto noua</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {capturedPhotos.map((photo) => (
              <div key={photo.id} className="relative aspect-square bg-zinc-950 border border-white/5 rounded-2xl overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.photoUrl} alt="progress" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-2 transition-all duration-200">
                  <span className="text-[8px] font-mono text-emerald-400 font-bold">{photo.angle}</span>
                  <span className="text-[7.5px] font-mono text-zinc-400">{photo.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Milestones Tracker */}
      <div className={designSystem.card + " space-y-3 shadow-lg"}>
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white font-sans">Obiective & Realizari</span>
        </div>

        <div className="space-y-2.5 font-sans text-xs">
          <div className="p-3.5 rounded-2xl bg-zinc-950/40 border border-white/5 flex gap-3.5 items-center">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold text-xs">
              7z
            </div>
            <div>
              <div className="font-semibold text-zinc-200">Consistency Badge</div>
              <p className="text-[10px] text-zinc-500 leading-normal">Aplicare consecventa a rutinei de îngrijire timp de 7 zile.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/40 border border-white/5 flex gap-3.5 items-center">
            <div className="w-7 h-7 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 font-bold text-xs">
              H2O
            </div>
            <div>
              <div className="font-semibold text-zinc-200">Protectie Hidratare</div>
              <p className="text-[10px] text-zinc-500 leading-normal">Ai atins consumul optim de apa zilnic de 5 ori saptamana aceasta.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Pre-Screen Camera Permissions Dialog */}
      {showPermissionPreScreen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-zinc-950 border border-white/5 rounded-[32px] p-6 w-full max-w-sm shadow-2xl space-y-4 font-sans text-xs text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">Permisiune Camera</h3>
            <p className="text-[10.5px] text-zinc-400 leading-relaxed font-sans">
              BeautyOS are nevoie de acces la camera dispozitivului tău pentru a suprapune grila facială de încadrare și a asigura aceeași poziție, lumină și unghi în pozele din timeline.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowPermissionPreScreen(false)}
                className="flex-1 py-3 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-400 font-semibold cursor-pointer hover:text-white"
              >
                Refuză
              </button>
              <button
                onClick={requestCameraPermission}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold cursor-pointer shadow-lg shadow-emerald-500/15"
              >
                Permite accesul
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Guided Photo Capture Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-6 animate-fadeIn font-sans">
          
          <div className="flex justify-between items-center text-zinc-400 text-xs font-mono">
            <span>ALINIAMENT FACIAL ZILNIC</span>
            <button
              onClick={() => {
                setShowCamera(false);
                stopCameraStream();
              }}
              className="text-white hover:text-zinc-300 font-bold text-sm cursor-pointer"
            >
              Închide
            </button>
          </div>

          {/* Video Stream & Face Contour Frame */}
          <div className="flex-1 flex flex-col items-center justify-center relative my-4 overflow-hidden rounded-[24px] bg-zinc-950 border border-white/5">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
            />

            {/* Silhouette Frame */}
            <div className="absolute w-56 h-72 border-2 border-dashed border-emerald-500/40 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.08)] pointer-events-none">
              <div className="w-48 h-64 border border-dashed border-emerald-500/20 rounded-full" />
            </div>

            {/* Target Angle Indicator */}
            <div className="absolute top-4 bg-zinc-950/85 border border-white/5 px-4 py-2 rounded-2xl text-[9px] text-zinc-300 flex items-center gap-1.5 z-10 font-mono">
              <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span>Aliniază zona: {photoAngle}</span>
            </div>

            {cameraSuccess && (
              <div className="absolute inset-0 bg-zinc-950/95 flex flex-col items-center justify-center gap-2 animate-fadeIn z-20">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <span className="text-xs text-white font-bold font-mono uppercase tracking-widest">Foto Salvată</span>
              </div>
            )}
          </div>

          {/* Capture Actions Row */}
          <div className="space-y-5">
            
            {/* Target Angle selectors */}
            <div className="flex justify-center gap-2">
              {(["Front", "Left Profile", "Right Profile"] as const).map((ang) => (
                <button
                  key={ang}
                  onClick={() => setPhotoAngle(ang)}
                  className={`px-3 py-1.5 rounded-xl border text-[9px] font-mono ${
                    photoAngle === ang
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                      : "bg-zinc-900 border-white/5 text-zinc-500"
                  }`}
                >
                  {ang === "Front" ? "Față" : ang === "Left Profile" ? "Profil Stâng" : "Profil Drept"}
                </button>
              ))}
            </div>

            <div className="flex justify-center pb-4">
              <button
                onClick={captureSnapshot}
                className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center p-1 cursor-pointer transition-all active:scale-90"
              >
                <div className="w-full h-full bg-white rounded-full hover:bg-zinc-200 transition-colors" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
