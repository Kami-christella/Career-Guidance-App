import React,{ useState, useEffect, useContext} from 'react';
import './Dashboard_Styles/AdminPage.css'
import { FaUserAlt } from "react-icons/fa";
import { MdAssessment } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { RiMessage2Fill } from "react-icons/ri";
import { LuNotebookPen } from "react-icons/lu";
import Piechart from './Piechart';
import Barchar from './Barchar';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';

function AdminPage() {
    // States to store counts from the database
    const [userCount, setUserCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    //for assessments
    const [assessmentCount, setAsessmentCount] = useState(0);
    //for contacts
    const [contactsCount, setContactsCount] = useState(0);

    const navigate = useNavigate();
    const { authToken } = useContext(AuthContext);

    let tokenValue;

  try {
    if (typeof authToken === 'object' && authToken.token) {
      tokenValue = authToken.token;
    } else {
      const tokenFromStorage = localStorage.getItem('userToken');
      const parsedToken = JSON.parse(tokenFromStorage);
      tokenValue = parsedToken.token || tokenFromStorage;
    }
  } catch (e) {
    tokenValue = authToken || localStorage.getItem('userToken');
  }

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                // console.log("Fetching user count...");
                // setIsLoading(true);
                const response = await axios.get('http://localhost:5000/api/count', {
                    headers: {
                        'Authorization': `Bearer ${tokenValue}`
                    }
                });
                // Set the user count from the response
                setUserCount(response.data.count);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching user count:', err);
                setError(`Failed to load user count: ${err.message}`);
                setIsLoading(false);
            }
        };

        fetchUserCount();
    }, []); 
   // counting assessments
    useEffect(() => {
        const fetchAssessmentCount = async () => {
            try {
                // console.log("Fetching user count...");
                setIsLoading(true);
      

                const response = await axios.get('http://localhost:5000/api/assessments/admin/count', {
                    headers: {
                        'Authorization': `Bearer ${tokenValue}`
                    }
                });
                
             
                // Set the user count from the response
                setAsessmentCount(response.data.count);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching assessment count:', err);
                setError(`Failed to load assessment count: ${err.message}`);
                setIsLoading(false);
            }
        };

        fetchAssessmentCount();
    }, []); 
    // for contacts
    useEffect(() => {
        const fetchContactsCount = async () => {
            try {
                // console.log("Fetching user count...");
                // setIsLoading(true);
                const response = await axios.get('http://localhost:5000/api/contacts/getContactCount', {
                    headers: {
                        'Authorization': `Bearer ${tokenValue}`
                    }
                });
                // Set the user count from the response
                setContactsCount(response.data.counts.total);
              
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching user count:', err);
                setError(`Failed to load user count: ${err.message}`);
                setIsLoading(false);
            }
        };

        fetchContactsCount();
    }, []); 
    return (
        <div className="adminClass">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <span className='adminMess'>Users</span>
                                <div className='sqaure1'>
                                    <FaUserAlt className='icon1'/>
                                </div>
                                <p className="admiPa">
                                    {isLoading ? 'Loading...' : 
                                     error ? error.split(': ')[0] : 
                                     userCount}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className='square12'>
                                    <MdAssessment className='icon12'/> 
                                </div>
                                <span className='adminMess'>Assessments</span>
                                <p className="admiPa">
                                {isLoading ? 'Loading...' : 
                                     error ? error.split(': ')[0] : 
                                     assessmentCount}
                                </p>
                               
                                {/* <p className="admiPa">40</p> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* second row */}
                <br /> 
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className='square3'>
                                    <LuNotebookPen className='icon3'/> 
                                </div>
                                <span className='adminMess'>Careers</span>
                                <p className="admiPa">15</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <div className='square4'>
                                    <RiMessage2Fill className='icon4'/> 
                                </div>
                                <span className='adminMess'>Messages</span>
                                <p className="admiPa">
                                {isLoading ? 'Loading...' : 
                                     error ? error.split(': ')[0] : 
                                     contactsCount}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <br /> <br />
            </div>
            {/* <Piechart/> */}
            <Barchar/>
        </div>
    );
}

export default AdminPage;