import { SimpleArticle } from "./components/simple-article";
import { article1 } from "./data/article";

function App() {
  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-2">
        <SimpleArticle article={article1} />
        <div>PUT HERE COMPOUND ARTICLE</div>
      </div>
    </div>
  );
}

export default App;
