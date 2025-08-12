import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderAdd = () => {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [shippingAddress, setShippingAddress] = useState("");
  const [items, setItems] = useState([
    { productName: "", quantity: 1, price: 0 },
  ]);

  const addItem = () => {
    setItems([...items, { productName: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    if (field === "quantity" || field === "price") {
      value = Number(value);
    }
    newItems[index][field] = value;
    setItems(newItems);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      customer,
      orderDate,
      paymentMethod,
      shippingAddress,
      items,
      total: getTotal(),
      status: "Pending",
    };

    console.log("New Order:", newOrder);
    alert("Order added successfully!");

    navigate("/orders");
  };

  return (
    <div className="container my-4">
      <h2>Add New Order</h2>
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
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            rows={3}
            required
          />
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
          Save Order
        </button>
      </form>
    </div>
  );
};

export default OrderAdd;
