import { useState } from "react";
import { IoPersonCircle, IoHomeOutline, IoSettings } from "react-icons/io5";
import { GrTest } from "react-icons/gr";
import { LuNotebookPen } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard_Styles/NewDash.css";

function NewDash() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Sidebar (Fixed) */}
      <aside
        className="bg-body-tertiary p-3 position-fixed top-0 start-0 vh-100 d-flex flex-column border-end"
        style={{ width: "250px" }}
      >
        <h4 className="text-center">Dashboard</h4>
        <div className="ActiveNavContainer mt-4">
          <div 
            className={`divClassb ${location.pathname === "/dashboard" ? "active" : ""}`} 
            onClick={() => navigate("/dashboard")}
          >
            <IoHomeOutline />
            <span className="sidei"> Dashboard</span>
          </div>
          <div 
            className={`divClassb ${location.pathname === "/dashboard/Career-test" ? "active" : ""}`} 
            onClick={() => navigate("/dashboard/Career-test")}
          >
            <GrTest /> <span className="sidei"> Career Guidance Tests</span>
          </div>
          <div 
            className={`divClassb ${location.pathname === "/dashboard/Assessment2/assessment3/results" ? "active" : ""}`} 
            onClick={() => navigate("/dashboard/Assessment2/assessment3/results")}
          >
            <LuNotebookPen /> <span className="sidei"> Results</span>
          </div>
          <div 
            className={`divClassb ${location.pathname === "/Settings" ? "active" : ""}`} 
            onClick={() => navigate("/Settings")}
          >
            <IoSettings />
            <span className="sidei"> Settings</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        {/* Header (Fixed) */}
        <header
          className="bg-light border-bottom py-2 px-4 position-fixed top-0 w-100 d-flex justify-content-between align-items-center"
          style={{ zIndex: 1050, height: "60px" }}
        >
          <h5 className="text-dark m-0">Welcome, Christella</h5>
          <div className="position-fixed">
            <IoPersonCircle 
              style={{ color: "green", fontSize: "3rem", marginLeft: "65rem" }}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="profile-dropdown position-absolute bg-white shadow p-2 rounded" style={{ right: "0px", top: "40px" }}>
                <p className="profile-name mb-2">Christella</p>
                <button className="logout-button btn btn-danger btn-sm w-100">Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="overflow-auto px-4 pt-5" style={{ marginTop: "80px", height: "calc(100vh - 60px)" }}>
          {/* <CareerTest /> */}
        </main>
      </div>
    </div>
  );
}

export default NewDash;
