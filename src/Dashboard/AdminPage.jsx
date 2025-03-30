import './Dashboard_Styles/AdminPage.css'
import { FaUserAlt } from "react-icons/fa";
import { MdAssessment } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { RiMessage2Fill } from "react-icons/ri";
import { LuNotebookPen } from "react-icons/lu";



function AdminPage(){
    return (
        <div className="adminClass">
            <div className="container">
           <div class="row">
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <FaUserAlt className='icon'/>
        <span className='adminMess'> Users</span>
        <p className="admiPa">25</p>
       
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <MdAssessment className='icon'/> 
        <span className='adminMess'> Assessments</span>
        <p className="admiPa">40</p>
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
        <LuNotebookPen className='icon'/> 
        <span className='adminMess'>Careers</span>
        <p className="admiPa">5</p>
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <RiMessage2Fill className='icon'/> 
        <span className='adminMess'> Messages</span>
        <p className="admiPa">50</p>
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