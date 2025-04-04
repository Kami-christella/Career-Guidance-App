import { LuLogIn } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import {Notify} from "notiflix"

import '../styles/LoginForm.css'


const UsestateHook = () => {
  const navigate = useNavigate();
  const { register, handleSubmit

   } = useForm();
    
        const onsend = async (data) => {
            try {
                const formData = {
                  // userEmail: data.userEmail,
                  // userPassword: data.userPassword
                  email:data.email,
                  password:data.password
                };
    
                const response = await axios.post(
                    // "http://localhost:5001/user/login",
                    "http://localhost:5000/api/login",
                    formData,
                 
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                    }
                );

                Notify.success("Login sucessful")
                //reset();

                    const userToken=response.data;
                    localStorage.setItem("userToken", JSON.stringify(userToken))
                    const userRole = userToken?.user?.userRole;
                   // navigate("/dashboard")
                      console.log("user Roles",userRole)
                    if (userRole === "Admin"){
                        navigate("/adminDashboard")
                    } else{
                         navigate("/dashboard")
                    }

                //alert("Account logged In  successfully");
                console.log("Account logged In successfully:", response.data);
            } catch (error) {
                console.error("Error logging in :", error.response?.data || error.message);
                Notify.failure("Incorrect credentials")
            }
        };
  return (
    <div className="content">
      <div>
        <form className="formcontainer" onSubmit={handleSubmit(onsend)}>
          <div className="head">
            <h3 className="loginHeader">
              Login <LuLogIn className="loginicon"/>
            </h3> <br /> 
            {/* <IoClose onClick={handleLoginForm} className="iconhead" /> */}
          </div>

          
          {/* Email Input */}
          <div className="inputContainer">
            <MdOutlineEmail className="icon10 emailIcon2" />
            <input type="email" placeholder="Email" className="input" 
            {...register('email', { required: true })}
            />
          </div>

          {/* Password Input */}
          <div className="inputContainer">
            <RiLockPasswordLine className="icon10 passIcon2" />
            <input type="password" placeholder="Password" className="input" 
             {...register('password', { required: true })}
            />
          
          </div>

          <p className="para1">Forgot Password?</p>
          <button type="submit" className="btn btn-success1">Login</button> <br /> <br />

          <span className="text-center" style={{alignContent:'center'}}>
            Don’t have an Account? 
            <Link className="text-primary text-center" to="/Signup">Sign Up</Link>
            {/* <href className="text-primary text-center" onClick={() => navigate('/Signup')}>Sign Up</href> */}
          </span>
        </form>
      </div>
    </div>
  );
};

export default UsestateHook;
