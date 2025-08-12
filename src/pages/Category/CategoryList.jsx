import React, { useState, useEffect } from "react";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 700));
        const data = [
          { id: 1, name: "Electronics" },
          { id: 2, name: "Clothing" },
          { id: 3, name: "Home & Garden" },
          { id: 4, name: "Sports" },
          { id: 5, name: "Books" },
          { id: 6, name: "Toys" },
          { id: 7, name: "Automotive" },
          { id: 8, name: "Beauty" },
          { id: 9, name: "Health" },
          { id: 10, name: "Music" },
        ];
        setCategories(data);
      } catch {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    }
  }

  function handleAddCategory() {
    const name = prompt("Enter new category name:");
    if (name) {
      const newCat = {
        id: categories.length ? categories[categories.length - 1].id + 1 : 1,
        name,
      };
      setCategories((prev) => [...prev, newCat]);
    }
  }

  function handleEditCategory(id) {
    const cat = categories.find((c) => c.id === id);
    const newName = prompt("Edit category name:", cat.name);
    if (newName) {
      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: newName } : c))
      );
    }
  }

  if (loading) return <div className="container mt-4">Loading categories...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container my-4">
      <h2>Category List</h2>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button className="btn btn-success" onClick={handleAddCategory}>
          + Add Category
        </button>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCategories.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No categories found.
              </td>
            </tr>
          ) : (
            paginatedCategories.map(({ id, name }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEditCategory(id)}
                    title="Edit category"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(id)}
                    title="Delete category"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <nav>
        <ul className="pagination justify-content-center">
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
