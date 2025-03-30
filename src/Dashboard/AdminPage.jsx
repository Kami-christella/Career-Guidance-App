import './Dashboard_Styles/AdminPage.css'
import { FaUserAlt } from "react-icons/fa";
import { MdAssessment } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { RiMessage2Fill } from "react-icons/ri";



function AdminPage(){
    return (
        <div className="adminClass">
            <div className="container">
           <div class="row">
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <p className="card-text"> <FaUserAlt />With supporting text below as a natural lead-in to additional content.</p>
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <p className="card-text"> <MdAssessment /> With supporting text below as a natural lead-in to additional content.</p>
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  </div>
</div>
{/* second row */}
  <br /> 
<div class="row">
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <p className="card-text"> <IoIosNotifications /> With supporting text below as a natural lead-in to additional content.</p>
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <p className="card-text"> <RiMessage2Fill /> With supporting text below as a natural lead-in to additional content.</p>
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  </div>
</div>

</div>
        </div>
    )
}

export default AdminPage