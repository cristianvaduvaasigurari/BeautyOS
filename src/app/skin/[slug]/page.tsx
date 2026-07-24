import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.values(editorialContent)
    .filter(article => article.category === "Skin")
    .map(article => ({
      slug: article.slug,
    }));
}

export default function SkinPage({ params }: { params: { slug: string } }) {
  const article = Object.values(editorialContent).find(a => a.slug === params.slug && a.category === "Skin");

  if (!article || article.category !== "Skin") {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/skin" 
      backLabel="Skin Knowledge Base" 
    />
  );
}
