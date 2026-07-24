import { editorialContent } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.values(editorialContent)
    .filter(article => article.category === "Community")
    .map(article => ({
      slug: article.slug,
    }));
}

export default function CommunityPage({ params }: { params: { slug: string } }) {
  const article = Object.values(editorialContent).find(a => a.slug === params.slug && a.category === "Community");

  if (!article || article.category !== "Community") {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/community" 
      backLabel="Community Hub" 
    />
  );
}
