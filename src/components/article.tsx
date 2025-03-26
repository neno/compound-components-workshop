import { createContext, PropsWithChildren, useContext } from "react";
import { type ArticleType } from "../types/article";

type ArticleContextType = {
  article: ArticleType;
};
const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticle must be used within a Article");
  }
  return context;
};

type ArticleProps = PropsWithChildren & {
  article: ArticleType;
};

export function Article({ article, children }: ArticleProps) {
  return (
    <ArticleContext.Provider value={{ article }}>
      <article>{children}</article>
    </ArticleContext.Provider>
  );
}

Article.Title = function ArticleTitle() {
  const { article } = useArticle();
  return <h2>{article.title}</h2>;
};

Article.Author = function ArticleAuthor() {
  const { article } = useArticle();
  return <p>{article.author}</p>;
};

Article.PublishedAt = function ArticlePublishedAt() {
  const { article } = useArticle();
  return <p>{article.publishedAt}</p>;
};

Article.Excerpt = function ArticleExcerpt() {
  const { article } = useArticle();
  return <p>{article.excerpt}</p>;
};

Article.Image = function ArticleImage() {
  const { article } = useArticle();
  return <img src={article.image} alt={article.title} />;
};

Article.Content = function ArticleContent() {
  const { article } = useArticle();
  return <p>{article.content}</p>;
};
