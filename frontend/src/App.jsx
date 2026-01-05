import { useEffect, useState } from "react";
import { api } from "./api";

export default function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const addProduct = async () => {
    await api.post("/products", { name, price: Number(price) });
    setName("");
    setPrice("");
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Product Dashboard</h2>

      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={addProduct}>Add</button>

      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - ₹{p.price}</li>
        ))}
      </ul>
    </div>
  );
}
