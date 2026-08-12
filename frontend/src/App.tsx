import { useEffect, useState } from "react";
import "./App.css";

type Product = {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: string;
  stockQty: number;
  minimumStock: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const result = await response.json();
      setProducts(result.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>NexaFlow</h1>
          <p>Inventory Management Dashboard</p>
        </div>

        <div className="status">
          <span></span>
          API Connected
        </div>
      </header>

      <main>
        <section className="welcome">
          <div>
            <h2>Products</h2>
            <p>Manage and monitor your inventory.</p>
          </div>

          <button onClick={fetchProducts}>Refresh</button>
        </section>

        <section className="stats">
          <div className="card">
            <h3>Total Products</h3>
            <strong>{products.length}</strong>
          </div>

          <div className="card">
            <h3>Total Stock</h3>
            <strong>
              {products.reduce((total, product) => total + product.stockQty, 0)}
            </strong>
          </div>

          <div className="card">
            <h3>Low Stock</h3>
            <strong>
              {
                products.filter(
                  (product) => product.stockQty <= product.minimumStock
                ).length
              }
            </strong>
          </div>
        </section>

        <section className="products">
          <h2>Product Inventory</h2>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => {
                    const lowStock =
                      product.stockQty <= product.minimumStock;

                    return (
                      <tr key={product.id}>
                        <td>#{product.id}</td>
                        <td>
                          <strong>{product.name}</strong>
                        </td>
                        <td>{product.sku}</td>
                        <td>{product.description}</td>
                        <td>₹{Number(product.price).toLocaleString()}</td>
                        <td>{product.stockQty}</td>
                        <td>
                          <span
                            className={
                              lowStock ? "badge low" : "badge available"
                            }
                          >
                            {lowStock ? "Low Stock" : "Available"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;