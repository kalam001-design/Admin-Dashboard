import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        await new Promise((r) => setTimeout(r, 800)); // simulate delay
        const data = [
          { id: 1, name: "Product A", stock: 25, price: 20 },
          { id: 2, name: "Product B", stock: 0, price: 15 },
          { id: 3, name: "Product C", stock: 12, price: 30 },
          { id: 4, name: "Product D", stock: 4, price: 25 },
          { id: 5, name: "Product E", stock: 10, price: 10 },
          { id: 6, name: "Product F", stock: 3, price: 40 },
          { id: 7, name: "Product G", stock: 0, price: 18 },
          { id: 8, name: "Product H", stock: 8, price: 22 },
          { id: 9, name: "Product I", stock: 15, price: 35 },
          { id: 10, name: "Product J", stock: 1, price: 28 },
        ];
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);


  const totalProducts = products.length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 5).length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);


  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortOrder === "asc") return a[sortKey] > b[sortKey] ? 1 : -1;
    else return a[sortKey] < b[sortKey] ? 1 : -1;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function handleSort(key) {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }
  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if ((paginated.length === 1) && currentPage > 1) setCurrentPage(currentPage - 1);
    }
  }

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container my-4 ">
      <div className="row mb-4">
        <div className="col-sm-6 col-md-3 mb-2">
          <div className="card text-white bg-primary h-100 d-flex align-items-center justify-content-center">
            <div className="card-body text-center">
              <h6 className="card-title">Total Products</h6>
              <h3>{totalProducts}</h3>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 mb-2">
          <div className="card text-white bg-danger h-100 d-flex align-items-center justify-content-center">
            <div className="card-body text-center">
              <h6 className="card-title">Out of Stock</h6>
              <h3>{outOfStock}</h3>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 mb-2">
          <div className="card text-white bg-warning h-100 d-flex align-items-center justify-content-center">
            <div className="card-body text-center">
              <h6 className="card-title">Low Stock (&lt; 5)</h6>
              <h3>{lowStock}</h3>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-3 mb-2">
          <div className="card text-white bg-success h-100 d-flex align-items-center justify-content-center">
            <div className="card-body text-center">
              <h6 className="card-title">Total Stock</h6>
              <h3>{totalStock}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search product by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="btn-group">
          <button
            className={`btn btn-outline-secondary ${sortKey === "name" ? "active" : ""}`}
            onClick={() => handleSort("name")}
          >
            Sort by Name {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </button>
          <button
            className={`btn btn-outline-secondary ${sortKey === "price" ? "active" : ""}`}
            onClick={() => handleSort("price")}
          >
            Sort by Price {sortKey === "price" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </button>
          <button
            className={`btn btn-outline-secondary ${sortKey === "stock" ? "active" : ""}`}
            onClick={() => handleSort("stock")}
          >
            Sort by Stock {sortKey === "stock" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
          </button>
        </div>
      </div>

      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No products found.
              </td>
            </tr>
          ) : (
            paginated.map(({ id, name, stock, price }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                  {stock === 0 ? (
                    <span className="text-danger d-flex align-items-center gap-1">
                      <FaExclamationTriangle /> Out of stock
                    </span>
                  ) : stock < 5 ? (
                    <span className="text-warning d-flex align-items-center gap-1">
                      <FaExclamationTriangle /> Low stock ({stock})
                    </span>
                  ) : (
                    <span className="text-success d-flex align-items-center gap-1">
                      <FaCheckCircle /> In stock ({stock})
                    </span>
                  )}
                </td>
                <td>{price.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    title="Edit product"
                    onClick={() => alert(`Edit product ${id} clicked`)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    title="Delete product"
                    onClick={() => handleDelete(id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <nav>
        <ul className="pagination justify-content-center flex-wrap gap-1">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(1)}>
              First
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
          </li>

          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1;
            return (
              <li
                key={page}
                className={`page-item ${page === currentPage ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(page)}>
                  {page}
                </button>
              </li>
            );
          })}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(totalPages)}>
              Last
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
