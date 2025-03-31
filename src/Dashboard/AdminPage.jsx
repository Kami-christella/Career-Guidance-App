import './Dashboard_Styles/AdminPage.css'
import { FaUserAlt } from "react-icons/fa";
import { MdAssessment } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { RiMessage2Fill } from "react-icons/ri";
import { LuNotebookPen } from "react-icons/lu";
import Piechart from './Piechart'


function AdminPage(){
    return (
        <div className="adminClass">
            <div className="container">
           <div class="row">
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        
        <span className='adminMess'> Users</span>
        <div className='sqaure1'>
        <FaUserAlt className='icon1'/>
        </div>
        <p className="admiPa">25</p>
       
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <div className='square2'>
        <MdAssessment className='icon2'/> 
        </div>
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
      
        <div className='square3'>
     <LuNotebookPen className='icon3'/> 
     </div>
        <span className='adminMess'>Careers</span>
        <p className="admiPa">5</p>
    
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="card">
      <div className="card-body">
        {/* <h5 className="card-title">Special title treatment</h5> */}
        <div className='square4'>
        <RiMessage2Fill className='icon4'/> 
        </div>
       
        <span className='adminMess'> Messages</span>
        <p className="admiPa">50</p>
        {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
      </div>
    </div>
  </div>
</div>
<br /> <br />
</div>
<Piechart/>

        </div>
    )
}

export default AdminPage