import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyFooter from "./components/MyFooter";
import MyHero from "./components/MyHero";
import MyNav from "./components/MyNav";

import fantasyBooks from "./books/fantasy.json";
import historyBooks from "./books/history.json";
import horrorBooks from "./books/horror.json";
import romanceBooks from "./books/romance.json";
import scifiBooks from "./books/scifi.json";
import { lazy, Suspense } from "react";

const libri = [...fantasyBooks, ...historyBooks, ...horrorBooks, ...romanceBooks, ...scifiBooks];
const books = libri.sort(() => Math.random() - 0.5);

const LazyBookList = lazy(() => import("./components/BookList"));

function App() {
  return (
    <>
      <MyNav />
      <MyHero />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyBookList selectedBooks={books} />
      </Suspense>
      <MyFooter />
    </>
  );
}

export default App;
export { books };
