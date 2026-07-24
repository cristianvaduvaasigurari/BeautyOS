import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.values(editorialContent)
    .filter(article => article.category === "Longevity")
    .map(article => ({
      slug: article.slug,
    }));
}

export default function LongevityPage({ params }: { params: { slug: string } }) {
  const article = editorialContent[params.slug];

  if (!article || article.category !== "Longevity") {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/longevity" 
      backLabel="Longevity Hub" 
    />
  );
}
