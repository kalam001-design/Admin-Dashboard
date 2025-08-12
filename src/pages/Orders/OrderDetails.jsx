import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderTimeline from "./OrderTimeline"; 

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const orders = [
    {
      id: 1001,
      customer: "John Doe",
      total: 80,
      status: "Completed",
      items: [
        { name: "Product A", quantity: 2, price: 20 },
        { name: "Product B", quantity: 1, price: 40 },
      ],
      shippingAddress: "123 Street, City, Country",
      orderDate: "2024-08-01",
      paymentMethod: "Credit Card",
      timeline: [
        { status: "Order Placed", date: "2024-08-01 10:00 AM" },
        { status: "Processing", date: "2024-08-02 02:00 PM" },
        { status: "Shipped", date: "2024-08-03 09:30 AM" },
        { status: "Delivered", date: "2024-08-04 03:45 PM" },
      ],
    },
    {
      id: 1002,
      customer: "Jane Smith",
      total: 40,
      status: "Pending",
      items: [{ name: "Product C", quantity: 1, price: 40 }],
      shippingAddress: "456 Avenue, City, Country",
      orderDate: "2024-08-03",
      paymentMethod: "PayPal",
      timeline: [
        { status: "Order Placed", date: "2024-08-03 12:00 PM" },
        { status: "Pending", date: "2024-08-03 12:05 PM" },
      ],
    },
  ];

  const order = orders.find((o) => o.id.toString() === orderId);

  if (!order) {
    return (
      <div className="container my-4">
        <h2>Order Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Order Details - #{order.id}</h2>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5>Customer: {order.customer}</h5>
          <p>
            <strong>Order Date:</strong> {order.orderDate}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Shipping Address:</strong> {order.shippingAddress}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge ${
                order.status === "Pending"
                  ? "bg-warning text-dark"
                  : "bg-success"
              }`}
            >
              {order.status}
            </span>
          </p>
        </div>
      </div>

      <OrderTimeline timeline={order.timeline} />

      <h5>Items</h5>
      <table className="table table-striped mb-4">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Price ($)</th>
            <th>Subtotal ($)</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total: ${order.total}</h4>

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;
