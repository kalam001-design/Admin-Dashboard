import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const navigate = useNavigate();

  const ordersData = [
    { id: "1001", customer: "John Doe", total: 80, status: "Completed", orderDate: "2024-08-01" },
    { id: "1002", customer: "Jane Smith", total: 40, status: "Pending", orderDate: "2024-08-03" },
    { id: "1003", customer: "Bob Lee", total: 100, status: "Cancelled", orderDate: "2024-08-04" },
    { id: "1004", customer: "Alice Johnson", total: 55, status: "Completed", orderDate: "2024-08-05" },
    { id: "1005", customer: "David Brown", total: 70, status: "Pending", orderDate: "2024-08-06" },
    { id: "1006", customer: "Emma Wilson", total: 90, status: "Completed", orderDate: "2024-08-07" },
    { id: "1007", customer: "Michael Clark", total: 60, status: "Pending", orderDate: "2024-08-08" },
    { id: "1008", customer: "Sophia Lee", total: 120, status: "Completed", orderDate: "2024-08-09" },
    { id: "1009", customer: "Chris Martin", total: 50, status: "Cancelled", orderDate: "2024-08-10" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredOrders = useMemo(() => {
    let filtered = ordersData;

    if (filterStatus !== "All") {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.includes(searchTerm)
      );
    }

    return filtered;
  }, [filterStatus, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [currentPage, filteredOrders]);

  const totalOrders = filteredOrders.length;
  const pendingOrders = filteredOrders.filter(o => o.status === "Pending").length;
  const completedOrders = filteredOrders.filter(o => o.status === "Completed").length;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Orders List</h2>

      <div className="d-flex gap-3 mb-4 flex-wrap">
        <div className="p-3 bg-primary text-white rounded flex-fill text-center">
          <i className="bi bi-basket fs-1 mb-2" style={{ color: "white" }}></i>
          <h5>Total Orders</h5>
          <p className="fs-4 mb-0">{totalOrders}</p>
        </div>
        <div className="p-3 bg-warning text-dark rounded flex-fill text-center">
          <i className="bi bi-hourglass-split fs-1 mb-2" style={{ color: "#856404" /* Bootstrap warning dark text */ }}></i>
          <h5>Pending Orders</h5>
          <p className="fs-4 mb-0">{pendingOrders}</p>
        </div>
        <div className="p-3 bg-success text-white rounded flex-fill text-center">
          <i className="bi bi-check-circle fs-1 mb-2" style={{ color: "white" }}></i>
          <h5>Completed Orders</h5>
          <p className="fs-4 mb-0">{completedOrders}</p>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Order ID or Customer"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No orders found.</td>
            </tr>
          ) : (
            paginatedOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.orderDate}</td>
                <td>
                  <span className={`badge ${
                    order.status === "Pending" ? "bg-warning text-dark" :
                    order.status === "Completed" ? "bg-success" :
                    "bg-secondary"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.total}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    title="Details"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <i className="bi bi-info-circle"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    title="Edit"
                    onClick={() => navigate(`/orders/edit/${order.id}`)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => goToPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default OrderList;
