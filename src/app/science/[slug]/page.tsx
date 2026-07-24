import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.values(editorialContent)
    .filter(article => article.category === "Science")
    .map(article => ({
      slug: article.slug,
    }));
}

export default function SciencePage({ params }: { params: { slug: string } }) {
  const article = Object.values(editorialContent).find(a => a.slug === params.slug && a.category === "Science");

  if (!article || article.category !== "Science") {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/science" 
      backLabel="Science Hub" 
    />
  );
}
