import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.values(editorialContent)
    .filter(article => article.category === "Fitness")
    .map(article => ({
      slug: article.slug,
    }));
}

export default function FitnessPage({ params }: { params: { slug: string } }) {
  const article = Object.values(editorialContent).find(a => a.slug === params.slug && a.category === "Fitness");

  if (!article || article.category !== "Fitness") {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/fitness" 
      backLabel="Fitness Hub" 
    />
  );
}
