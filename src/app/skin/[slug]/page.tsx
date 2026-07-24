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
  const article = editorialContent[params.slug];

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
