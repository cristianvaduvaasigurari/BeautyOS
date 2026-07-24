import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.values(editorialContent)
    .filter(article => article.category === "Supplements")
    .map(article => ({
      slug: article.slug,
    }));
}

export default function SupplementPage({ params }: { params: { slug: string } }) {
  const article = editorialContent[params.slug];

  if (!article || article.category !== "Supplements") {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/supplements" 
      backLabel="Supplements Database" 
    />
  );
}
