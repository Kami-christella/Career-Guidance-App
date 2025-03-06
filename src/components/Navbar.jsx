import React from "react";
import { Link } from 'react-router-dom';

import { IoHome } from "react-icons/io5";
import { FaPeopleRoof } from "react-icons/fa6";
import { RiHandCoinFill } from "react-icons/ri";
import { GrTest } from "react-icons/gr";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate(); // Initialize navigation function
  return (
    <div>
       {/* Navbar Start */}
       <nav className="navbar navbar-dark bg-dark d-flex justify-content-between px-3">
        <span className="navbar-brand mb-0 h1 text-white">
          Career Guidance Platform
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>

      <div className="collapse bg-dark p-4" id="navbarToggleExternalContent">
        {/* <h6 className="text-white">
          <IoHome /> Home
        </h6> */}
        <Link to="/"><IoHome /> Home</Link>
        <h6 className="text-white">
          <FaPeopleRoof /> About
        </h6>
        <Link to="/Services"> <RiHandCoinFill /> Service</Link>
        <h6 className="text-white">
          <GrTest /> Take Career Test
        </h6>
    
        <Link to="/Contact">  <MdEmail /> Contact</Link> <br/>
       
        <span>
          <button className="btn btn-primary">LOGIN</button>{" "}
          <button className="btn btn-success">SIGNUP</button>
        </span>
        <span className="text-muted">Toggleable via the navbar brand.</span>
      </div>
      {/* Navbar End */}

    
    </div>
  );
}

export default Navbar;
