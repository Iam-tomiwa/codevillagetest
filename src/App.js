import {useEffect, useState} from "react";
import TestCard from "./components/TestCard";
import "./app.scss";

const App = () => {
  const [products, setProducts] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchProducts = async () => {
      try {
        setIsPending(true);
        const res = await fetch("https://fakestoreapi.com/products?limit=10");
        let data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchProducts();

    // abort the fetch
    return () => abortCont.abort();
  }, []);

  return (
    <div className="App layout">
      <main className="inner">
        <h1>New Arrivals</h1>
        <section className="products-wrap">
          {isPending ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            products.map(product => (
              <TestCard key={product.id} product={product} />
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
