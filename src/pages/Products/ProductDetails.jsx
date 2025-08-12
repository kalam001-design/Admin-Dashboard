import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Product A",
    description: "This is a high quality Product A.",
    price: 20,
    stock: 25,
    size: ["S", "M", "L"],
    color: ["Red", "Blue", "Green"],
    category: "Clothing",
    brand: "BrandX",
    tags: ["new", "popular"],
    images: [
      "https://via.placeholder.com/150?text=Product+A+Image+1",
      "https://via.placeholder.com/150?text=Product+A+Image+2",
    ],
  },
  {
    id: 2,
    name: "Product B",
    description: "This is an amazing Product B.",
    price: 15,
    stock: 0,
    size: ["M", "L"],
    color: ["Black"],
    category: "Accessories",
    brand: "BrandY",
    tags: ["sale"],
    images: [
      "https://via.placeholder.com/150?text=Product+B+Image+1",
    ],
  },
  
];

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();


  const product = products.find(p => p.id.toString() === productId);

  if (!product) {
    return (
      <div className="container my-4">
        <h2>Product Not Found</h2>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">{product.name}</h2>
      
      <div className="row mb-4">

        <div className="col-md-5">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} ${idx + 1}`}
              className="img-fluid mb-2 rounded"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          ))}
        </div>


        <div className="col-md-7">
          <p>{product.description}</p>
          <h4 className="text-primary">${product.price}</h4>
          <p>
            <strong>Stock: </strong>
            {product.stock > 0 ? (
              <span className="text-success">{product.stock} available</span>
            ) : (
              <span className="text-danger">Out of stock</span>
            )}
          </p>

          <p>
            <strong>Size: </strong>
            {product.size.join(", ")}
          </p>

          <p>
            <strong>Color: </strong>
            {product.color.join(", ")}
          </p>

          <p>
            <strong>Category: </strong> {product.category}
          </p>

          <p>
            <strong>Brand: </strong> {product.brand}
          </p>

          <p>
            <strong>Tags: </strong> {product.tags.join(", ")}
          </p>

          <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
            Back to Product List
          </button>
        </div>
      </div>
    </div>
  );
}
