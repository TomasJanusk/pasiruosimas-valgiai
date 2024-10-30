import Logout from "./Logout"
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ()=> {
    const username = localStorage.getItem("username");


    return (
        <div className="container-fluid"  style={{ backgroundColor: 'silver' }}>
          <div className="row d-flex justify-content-between align-items-center">
            {/* Left side - Heading */}
            <div className="col-md-6">
              <h1 className="display-1">
                <Link to="/" className="text-decoration-none">Dienos Pietus</Link>
              </h1>
            </div>
    
            {/* Right side - Logout button and placeholder text */}
            <div className="col-md-6 d-flex justify-content-end">
              <div className="d-flex align-items-center m-4">
                <span className="display-5 mx-5">{username}</span>
                <Logout />
              </div>
            </div>
          </div>
        </div>
      );

}

export default Header