import { SimpleArticle } from "./components/simple-article";
import { article1 } from "./data/article";
import { List, Row } from "./components/list";
import { products } from "./data/products";
import { Tabs, Tab } from "./components/tabs";
import { tabs } from "./data/tabs";
import { ThemeContextProvider } from "./context/theme-context";
import { Layout } from "./components/layout";

function App() {
  return (
    <ThemeContextProvider>
      <Layout>
        <div className="container p-4 mx-auto">
          <div className="grid gap-8">
            <div className="grid grid-cols-2">
              <SimpleArticle article={article1} />
              <div>PUT HERE COMPOUND ARTICLE</div>
            </div>
            <hr />
            <List
              items={products}
              renderItem={(item, isSelected) => (
                <Row key={item.id} title={item.title} isSelected={isSelected} />
              )}
            />
            <hr />
            <Tabs
              tabs={tabs}
              renderTab={(tab, isActive) => (
                <Tab
                  key={tab.title}
                  content={tab.content}
                  isActive={isActive}
                />
              )}
            />
          </div>
        </div>
      </Layout>
    </ThemeContextProvider>
  );
}

export default App;
