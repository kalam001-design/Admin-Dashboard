import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const cardHoverStyle = {
  transition: "transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease",
};
const cardHoverEffect = {
  transform: "scale(1.03)",
  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
  filter: "brightness(1.05)",
};
const listItemHoverStyle = {
  transition: "background-color 0.3s ease, transform 0.3s ease",
};
const listItemHoverEffect = {
  backgroundColor: "#f8f9fa",
  transform: "scale(1.02)",
  borderRadius: "8px",
};

export default function Dashboard() {
  const stats = [
    {
      title: "Today's Sales",
      value: "85,670",
      icon: <i className="fas fa-shopping-cart"></i>,
      color: "primary",
      subtitle: "Up 55% from yesterday",
      subtitleColor: "success",
      bgColor: "#0d6efd", // Bootstrap primary
    },
    {
      title: "New Orders",
      value: "1,234",
      icon: <i className="fas fa-file-alt"></i>,
      color: "success",
      subtitle: "Up 12% from last month",
      subtitleColor: "success",
      bgColor: "#198754", // Bootstrap success
    },
    {
      title: "New Customers",
      value: "567",
      icon: <i className="fas fa-users"></i>,
      color: "warning",
      subtitle: "23 last week",
      subtitleColor: "muted",
      bgColor: "#ffc107", // Bootstrap warning
    },
    {
      title: "Total Balance",
      value: "8,901",
      icon: <i className="fas fa-wallet"></i>,
      color: "info",
      subtitle: "123 transactions today",
      subtitleColor: "info",
      bgColor: "#0dcaf0", // Bootstrap info
    },
  ];

  const recentOrders = [
    {
      id: 1001,
      product: "Smart Watch",
      category: "Electronics",
      total: "$2,500",
      status: "Delivered",
    },
    {
      id: 1002,
      product: "Bluetooth Speaker",
      category: "Electronics",
      total: "$850",
      status: "Processing",
    },
  ];

  const statusColors = {
    Delivered: "success",
    Processing: "warning",
    Cancelled: "danger",
  };

  const topSellingProducts = [
    {
      id: 1,
      name: "Cotton T-Shirt",
      sold: 50,
      img: "https://via.placeholder.com/50?text=T",
    },
    {
      id: 2,
      name: "Wireless Mouse",
      sold: 30,
      img: "https://via.placeholder.com/50?text=M",
    },
    {
      id: 3,
      name: "Gaming Keyboard",
      sold: 25,
      img: "https://via.placeholder.com/50?text=K",
    },
  ];

  const lowStockProducts = [
    { id: 1, name: "Product X", stock: 3, img: "https://via.placeholder.com/50?text=X" },
    { id: 2, name: "Product Y", stock: 1, img: "https://via.placeholder.com/50?text=Y" },
    { id: 3, name: "Product Z", stock: 0, img: "https://via.placeholder.com/50?text=Z" },
  ];

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <h2 className="mb-4 text-dark fw-bold">Dashboard</h2>

      {/* Stats Cards */}
      <div className="row mb-5">
        {stats.map(({ title, value, icon, bgColor, subtitle, subtitleColor }) => (
          <div key={title} className="col-lg-3 col-md-6 mb-4">
            <div
              className="card shadow-sm border-0 h-100 text-white"
              style={{ backgroundColor: bgColor, ...cardHoverStyle }}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, cardHoverEffect)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, { backgroundColor: bgColor, ...cardHoverStyle })
              }
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{title}</h6>
                  <h3 className="fw-bold">{value}</h3>
                  <small className={`text-${subtitleColor}`}>{subtitle}</small>
                </div>
                <div
                  className="rounded p-3 bg-white bg-opacity-25"
                  style={{ fontSize: "2rem", color: "white" }}
                >
                  {icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="card shadow-sm rounded mb-5">
        <div className="card-header bg-white border-bottom">
          <h5 className="mb-0">Recent Orders</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(({ id, product, category, total, status }) => (
                <tr key={id}>
                  <td>{product}</td>
                  <td>{category}</td>
                  <td>{total}</td>
                  <td>
                    <span
                      className={`badge bg-${statusColors[status] || "secondary"}`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling & Low Stock side-by-side */}
      <div className="row">
        {/* Top Selling */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm rounded h-100">
            <div className="card-header fw-semibold">Top Selling Products</div>
            <ul className="list-group list-group-flush">
              {topSellingProducts.map(({ id, name, sold, img }) => (
                <li
                  key={id}
                  className="list-group-item d-flex align-items-center gap-3"
                  style={listItemHoverStyle}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, listItemHoverEffect)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, listItemHoverStyle)
                  }
                >
                  <img
                    src={img}
                    alt={name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div>
                    <h6 className="mb-0">{name}</h6>
                    <small className="text-muted">{sold} sold</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Low Stock */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm rounded h-100 border-danger">
            <div className="card-header bg-danger text-white fw-semibold">
              Low Stock Alert
            </div>
            <ul className="list-group list-group-flush">
              {lowStockProducts.map(({ id, name, stock, img }) => (
                <li
                  key={id}
                  className="list-group-item d-flex align-items-center gap-3"
                  style={listItemHoverStyle}
                  onMouseEnter={(e) =>
                    Object.assign(e.currentTarget.style, listItemHoverEffect)
                  }
                  onMouseLeave={(e) =>
                    Object.assign(e.currentTarget.style, listItemHoverStyle)
                  }
                >
                  <img
                    src={img}
                    alt={name}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                  <div>
                    <h6 className="mb-0">{name}</h6>
                    <small
                      className={
                        stock === 0 ? "text-danger fw-bold" : "text-muted"
                      }
                    >
                      {stock > 0 ? `${stock} left` : "Out of stock!"}
                    </small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
