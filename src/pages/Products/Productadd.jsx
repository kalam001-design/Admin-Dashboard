import React, { useState } from "react";

export default function ProductAdd() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    size: "",
    color: "",
    category: "",
    brand: "",
    tags: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setProductData(prev => ({
      ...prev,
      images: files,
    }));


    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    console.log("Submitted product data:", productData);

    alert("Product added successfully!");


    setProductData({
      name: "",
      description: "",
      price: "",
      stock: "",
      size: "",
      color: "",
      category: "",
      brand: "",
      tags: "",
      images: [],
    });
    setPreviewImages([]);
  };

  return (
    <div className="container my-4">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input 
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="form-control"
            rows={3}
            required
          />
        </div>

        <div className="mb-3 row">
          <div className="col-md-4">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="form-control"
              min="0"
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Stock</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              className="form-control"
              min="0"
              required
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-md-4">
            <label className="form-label">Size (comma separated)</label>
            <input
              type="text"
              name="size"
              value={productData.size}
              onChange={handleChange}
              placeholder="S, M, L"
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Color (comma separated)</label>
            <input
              type="text"
              name="color"
              value={productData.color}
              onChange={handleChange}
              placeholder="Red, Blue"
              className="form-control"
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-md-4">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Brand</label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={productData.tags}
            onChange={handleChange}
            placeholder="new, popular, sale"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>


        {previewImages.length > 0 && (
          <div className="mb-3 d-flex flex-wrap gap-2">
            {previewImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx + 1}`}
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "4px" }}
              />
            ))}
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
}
