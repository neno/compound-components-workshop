import { SimpleArticle } from "./components/simple-article";
import { article1 } from "./data/article";

function App() {
  return (
    <div className="container p-4 mx-auto">
      <SimpleArticle article={article1} />
    </div>
  );
}

export default App;
