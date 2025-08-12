import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const orders = [
    {
      id: "1001",
      customer: "John Doe",
      orderDate: "2024-08-01",
      paymentMethod: "Credit Card",
      shippingAddress: "123 Street, City, Country",
      status: "Completed",
      items: [
        { productName: "Product A", quantity: 2, price: 20 },
        { productName: "Product B", quantity: 1, price: 40 },
      ],
    },
    {
      id: "1002",
      customer: "Jane Smith",
      orderDate: "2024-08-03",
      paymentMethod: "PayPal",
      shippingAddress: "456 Avenue, City, Country",
      status: "Pending",
      items: [{ productName: "Product C", quantity: 1, price: 40 }],
    },
  ];

  const orderToEdit = orders.find((order) => order.id === id);

  const [customer, setCustomer] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [status, setStatus] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (orderToEdit) {
      setCustomer(orderToEdit.customer);
      setOrderDate(orderToEdit.orderDate);
      setPaymentMethod(orderToEdit.paymentMethod);
      setShippingAddress(orderToEdit.shippingAddress);
      setStatus(orderToEdit.status);
      setItems(orderToEdit.items);
    }
  }, [orderToEdit]);

  if (!orderToEdit) {
    return (
      <div className="container my-4">
        <h2>Order Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  const addItem = () => {
    setItems([...items, { productName: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    if (field === "quantity" || field === "price") {
      value = Number(value);
    }
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedOrder = {
      id,
      customer,
      orderDate,
      paymentMethod,
      shippingAddress,
      status,
      items,
      total: getTotal(),
    };

    console.log("Updated Order:", updatedOrder);
    alert("Order updated successfully!");

    navigate("/orders");
  };

  return (
    <div className="container my-4">
      <h2>Edit Order - #{id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Order Date</label>
          <input
            type="date"
            className="form-control"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bkash">Bkash</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Shipping Address</label>
          <textarea
            className="form-control"
            rows={3}
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Order Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <h5>Order Items</h5>
        {items.map((item, index) => (
          <div key={index} className="row align-items-center mb-2">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Product Name"
                value={item.productName}
                onChange={(e) => handleItemChange(index, "productName", e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                min="1"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                min="0"
                step="0.01"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, "price", e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeItem(index)}
                disabled={items.length === 1}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-secondary mb-3" onClick={addItem}>
          Add Item
        </button>

        <h4>Total: ${getTotal().toFixed(2)}</h4>

        <button type="submit" className="btn btn-primary">
          Update Order
        </button>
      </form>
    </div>
  );
};

export default OrderEdit;
