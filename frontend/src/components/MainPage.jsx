import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import Dishes from "./Dishes";

const MainPage = () => {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [day, setDay] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getDishes = () => {
      axios.get(`http://localhost:8080/dishes?${search}${day}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        setDishes(res.data.data.dishes);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    };

    if (loading) {
      getDishes();
    }
  }, [loading, search, day]);

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    const day = e.target.day.value;
    
    if (search.length > 0) {
      setSearch(`title=${search}`);
    } else {
      setSearch("");
    }
    if (day.length > 0) {
      setDay(`day=${day}`);
    } else {
      setDay("");
    }
    setLoading(true);
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  return (
    <>
    
      <div className="container my-4">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="mb-3">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Dish title"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="day" className="form-label">Choose a day dish is served</label>
            <select
              name="day"
              id="day"
              className="form-select"
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
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
        <h1 className="my-4 text-center">Food Ads</h1>
        <div className="text-center my-4">
          {role === "admin" && (
            <Link to="/addDish" className="btn btn-primary">Add Dish</Link>
          )}
        </div>
        <div className="row">
          {dishes.map((dish) => (
            <Dishes
              key={dish._id} // Pridėtas `key` atributas su unikalia reikšme
              image={dish.image}
              name={dish.title}
              description={dish.description}
              price={dish.price}
              id={dish._id}
            />
          ))}
        </div>
       
      </div>
    </>
  );
};

export default MainPage;
