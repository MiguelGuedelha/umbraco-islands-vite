import { JSX } from 'react';

interface Article {
  Name: string;
  Subtitle: string;
}

interface BlogListingProps {
  articles: Article[];
}

const BlogListing = ({ articles }: BlogListingProps): JSX.Element => {
  return (
    <div>
      {articles.map((article) => (
        <div className="bg-amber-200">
          <h1>{article.Name}</h1>
          <p> {article.Subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogListing;
