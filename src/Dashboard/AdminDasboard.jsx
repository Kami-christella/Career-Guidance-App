// import { useState } from "react";
// import { IoPersonCircle, IoHomeOutline, IoSettings } from "react-icons/io5";
// import { PiStudentBold } from "react-icons/pi";
// import { GrTest } from "react-icons/gr";
// import { LuNotebookPen } from "react-icons/lu";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Notify } from "notiflix";
// import { MdNoteAlt } from "react-icons/md";
// import { LuNotebookTabs } from "react-icons/lu";
// import { FaRegUserCircle } from "react-icons/fa";

// import "./Dashboard_Styles/NewDash.css";

// function AdminDashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showDropdown, setShowDropdown] = useState(false);
  
//   // Declare the variable in a higher scope
//   let userName = null;

//   // Get token from localStorage
//   const tokenFromStorage = localStorage.getItem('userToken');

//   if (tokenFromStorage) {
//     try {
//       const payload = tokenFromStorage.split('.')[1];
//       // Add base64 padding if needed
//       const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
//       const paddedBase64 = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
      
//       // Decode base64 first, then parse as JSON
//       const decodedString = atob(paddedBase64);
//       const decodedPayload = JSON.parse(decodedString);
//       userName = decodedPayload?.user?.name;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       userName = "User";
//     }
//   }

//   const handleLogoutBtn = async () => {
//     localStorage.removeItem('userToken');
//     navigate('/');
//     Notify.success("Logout successful, Thank you for using Our System");
//   }

//   return (
//     <div className="container-fluid vh-100 d-flex">
//       {/* Sidebar (Fixed) */}
//       <aside
//         className="bg-body-tertiary p-3 position-fixed top-0 start-0 vh-100 d-flex flex-column border-end"
//         style={{ width: "250px" }}
//       >
//         <h4 className=""> <PiStudentBold className="careerIcon" /> CareerPath</h4>
//         <div className="ActiveNavContainer mt-4">
//           <div
//             className={`divClassb ${location.pathname === "/adminDashboard" ? "active" : ""}`}
//             onClick={() => navigate("/adminDashboard")}
//           >
//             <IoHomeOutline />
//             <span className="sidei"> Dashboard</span>
//           </div>
          
//           <div
//             className={`divClassb ${location.pathname === "/dashboard/Settings" ? "active" : ""}`}
//             onClick={() => navigate("/adminDashboard/adminSettings")}
//           >
//             <div className="settingsClass">
//               <IoSettings/>
//               <span className="sidei">Settings</span>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
//         {/* Header (Fixed) */}
//         <header
//           className="bg-light border-bottom py-2 px-4 position-fixed top-0 w-100 d-flex justify-content-between align-items-center"
//           style={{ zIndex: 1050, height: "60px" }}
//         >
//           <h5 className="text-dark m-0"> <b>Welcome</b>, {userName || 'Admin'} </h5>
//           <div className="position-fixed">
//             <IoPersonCircle
//               style={{ color: "green", fontSize: "3rem", marginLeft: "65rem" }}
//               onClick={() => setShowDropdown(!showDropdown)}
//             />
//             {showDropdown && (
//               <div className="profile-dropdown position-absolute bg-white shadow p-2 rounded" style={{ right: "0px", top: "40px" }}>
//                 <p className="profile-name mb-2"><FaRegUserCircle className="ClassOfUsers"/>{userName || 'Admin'} </p>
//                 <span className="userworld">Admin</span>
//                 <button className="logout-button btn btn-danger btn-sm w-100" onClick={handleLogoutBtn}>Logout</button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="overflow-auto px-4 pt-5" style={{ marginTop: "80px", height: "calc(100vh - 60px)" }}>
//           {/* <CareerTest /> */}
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


import { useState, useEffect } from "react";
import { IoPersonCircle, IoHomeOutline, IoSettings } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import { GrTest } from "react-icons/gr";
import { LuNotebookPen } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { Notify } from "notiflix";
import { MdNoteAlt } from "react-icons/md";
import { LuNotebookTabs } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";

import "./Dashboard_Styles/NewDash.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    // Get token from localStorage
    const tokenFromStorage = localStorage.getItem('userToken');

    if (tokenFromStorage) {
      try {
        // Parse the JSON string to get the object with user data
        const userData = JSON.parse(tokenFromStorage);
        
        // Check if we have a name directly in the user data
        if (userData.name) {
          setUserName(userData.name);
        } 
        // Try to get name from the token if it exists
        else if (userData.token) {
          try {
            const base64Url = userData.token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            const decodedToken = JSON.parse(jsonPayload);
            if (decodedToken.user && decodedToken.user.name) {
              setUserName(decodedToken.user.name);
            }
          } catch (err) {
            console.error("Error decoding token:", err);
          }
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const handleLogoutBtn = () => {
    localStorage.removeItem('userToken');
    navigate('/');
    Notify.success("Logout successful, Thank you for using Our System");
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Sidebar (Fixed) */}
      <aside
        className="bg-body-tertiary p-3 position-fixed top-0 start-0 vh-100 d-flex flex-column border-end"
        style={{ width: "250px" }}
      >
        <h4 className=""> <PiStudentBold className="careerIcon" /> CareerPath</h4>
        <div className="ActiveNavContainer mt-4">
          <div
            className={`divClassb ${location.pathname === "/adminDashboard" ? "active" : ""}`}
            onClick={() => navigate("/adminDashboard")}
          >
            <IoHomeOutline />
            <span className="sidei"> Dashboard</span>
          </div>
          
          <div
            className={`divClassb ${location.pathname === "/adminDashboard/adminSettings" ? "active" : ""}`}
            onClick={() => navigate("/adminDashboard/adminSettings")}
          >
            <div className="settingsClass">
              <IoSettings/>
              <span className="sidei">Settings</span>
            </div>
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
          <h5 className="text-dark m-0"> <b>Welcome</b>, {userName} </h5>
          <div className="position-fixed">
            <IoPersonCircle
              style={{ color: "green", fontSize: "3rem", marginLeft: "65rem" }}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="profile-dropdown position-absolute bg-white shadow p-2 rounded" style={{ right: "0px", top: "40px" }}>
                <p className="profile-name mb-2"><FaRegUserCircle className="ClassOfUsers"/>{userName} </p>
                <span className="userworld">Admin</span>
                <button className="logout-button btn btn-danger btn-sm w-100" onClick={handleLogoutBtn}>Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="overflow-auto px-4 pt-5" style={{ marginTop: "80px", height: "calc(100vh - 60px)" }}>
          {/* Admin dashboard content will go here */}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;