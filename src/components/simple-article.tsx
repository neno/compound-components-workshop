import { Article } from "../types/article";

type ArticleProps = {
  article: Article;
};

export const SimpleArticle = ({ article }: ArticleProps) => {
  return (
    <article>
      <h2>{article.title}</h2>
      <p>{article.author}</p>
      <p>{article.publishedAt}</p>
      <p>{article.excerpt}</p>
      <img src={article.image} alt={article.title} />
      <p>{article.content}</p>
    </article>
  );
};
