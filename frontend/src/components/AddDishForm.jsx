import React, { useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddDishForm = () => {
  const [dish, setDish] = useState({
    title: '',
    day: '',
    description: '',
    price: '',
    image: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setDish({
      ...dish,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }
      const response = await axios.post("http://localhost:8080/dishes", dish, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Dish added:', response.data);
      setDish({ title: '', day: '', description: '', price: '', image: '' });
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data.message : "Error adding dish");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Add New Dish</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formDishName" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="formDishName"
                placeholder="Enter dish name"
                name="title"
                value={dish.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formDishDay" className="form-label">Choose which day it is served</label>
              <select
                className="form-control"
                id="formDishDay"
                name="day"
                value={dish.day}
                onChange={handleChange}
              >
                <option value="">Any day</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
                <option value="7">Sunday</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="formDishDescription" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="formDishDescription"
                rows="3"
                placeholder="Enter dish description"
                name="description"
                value={dish.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formDishPrice" className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id="formDishPrice"
                placeholder="Enter dish price"
                name="price"
                value={dish.price}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formDishImage" className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                id="formDishImage"
                placeholder="Enter image URL"
                name="image"
                value={dish.image}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Add Dish</button>
            {error && <div className="mt-3 alert alert-danger" role="alert">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDishForm;
