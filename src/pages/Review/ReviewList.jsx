import React, { useState, useEffect } from "react";

const demoReviews = [
  {
    id: 1,
    userName: "Rahim",
    text: "খুব ভালো প্রোডাক্ট, খুবই পছন্দ হয়েছে!",
    rating: 5,
    date: "2024-04-01",
    status: "Active",
  },
  {
    id: 2,
    userName: "Karim",
    text: "পণ্যের গুণগত মান ঠিক আছে, তবে ডেলিভারি দেরি হয়েছে।",
    rating: 3,
    date: "2024-03-28",
    status: "Pending",
  },
  {
    id: 3,
    userName: "Salma",
    text: "পণ্যের সাথে সমস্যা ছিলো, খুব খারাপ অভিজ্ঞতা।",
    rating: 1,
    date: "2024-03-20",
    status: "Active",
  },
  {
    id: 4,
    userName: "Jamila",
    text: "অত্যন্ত সন্তুষ্ট। দ্রুত ডেলিভারি।",
    rating: 4,
    date: "2024-04-05",
    status: "Active",
  },
];

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;


  useEffect(() => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        setReviews(demoReviews);
        setLoading(false);
      } catch (err) {
        setError("Review loading");
        setLoading(false);
      }
    }, 800);
  }, []);


  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.text.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || review.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });


  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handleDelete = (id) => {
    if (window.confirm("are you delet this?")) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === "Active" ? "Pending" : "Active" } : r
      )
    );
  };

  if (loading) return <div className="container mt-4">loading...</div>;
  if (error) return <div className="container mt-4 text-danger">{error}</div>;

  return (
    <div className="container my-4">
      <h2 className="mb-4">Review List</h2>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            placeholder="User name search..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pnding</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-primary">
          <tr>
            <th>USer name</th>
            <th>Review</th>
            <th>Rating</th>
            <th>Date</th>
            <th>Status</th>
            <th style={{ width: "160px" }} className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedReviews.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-3">
                Nothing found.
              </td>
            </tr>
          ) : (
            paginatedReviews.map(({ id, userName, text, rating, date, status }) => (
              <tr key={id}>
                <td>{userName}</td>
                <td>{text}</td>
                <td>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < rating ? "#ffc107" : "#e4e5e9" }}>
                      &#9733;
                    </span>
                  ))}
                </td>
                <td>{new Date(date).toLocaleDateString("bn-BD")}</td>
                <td>
                  <span
                    className={`badge ${
                      status === "Active" ? "bg-success" : "bg-warning text-dark"
                    }`}
                  >
                    {status === "Active" ? "Active" : "Pending"}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-info me-2"
                    title=" Change status"
                    onClick={() => toggleStatus(id)}
                  >
                    {status === "Active" ? "Pending" : "Active"}
                  </button>
                 
                  <button
                    className="btn btn-sm btn-primary me-2"
                    title="Done"
                    onClick={() => alert("Edit done")}
                  >
                    ✏️
                  </button>
                  
                  <button
                    className="btn btn-sm btn-danger"
                    title="Delete"
                    onClick={() => handleDelete(id)}
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
        <ul className="pagination justify-content-center mt-3">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(1)}
              aria-label="First"
            >
              1
            </button>
          </li>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Previous"
            >
              next
            </button>
          </li>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
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
              aria-label="Next"
            >
              Next
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(totalPages)}
              aria-label="Last"
            >
              end
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ReviewList;
