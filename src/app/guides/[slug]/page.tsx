import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.values(editorialContent)
    .filter(article => article.category === "Guides")
    .map(article => ({
      slug: article.slug,
    }));
}

export default function GuidesPage({ params }: { params: { slug: string } }) {
  const article = Object.values(editorialContent).find(a => a.slug === params.slug && a.category === "Guides");

  if (!article || article.category !== "Guides") {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/guides" 
      backLabel="Guides Hub" 
    />
  );
}
