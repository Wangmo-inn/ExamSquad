import { useContext, useRef, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Login() {

  const email = useRef();
  const password = useRef();
  const [admin , setadmin] = useState(false);
  const[userrole , setuserrole] = useState(false);
  const Navigate = useNavigate();
  const { user , isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if(userrole=== true){ 
      
      const loginUser = async (userCredential, dispatch) => {  
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post("http://localhost:8800/api/auth/login/user", userCredential);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          Navigate(`/userprofile/${res.data._id}`)
          
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err });
        }
      }

      const userCredential =  { email: email.current.value, password: password.current.value };
      loginUser(userCredential , dispatch);

  }

    if(admin === true){

      const loginAdmin = async (userCredential, dispatch) => {
        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post("http://localhost:8800/api/auth/login/admin", userCredential);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          Navigate(`/adminprofile/${res.data._id}`)
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err });
        }
      };

      loginAdmin(
        { email: email.current.value, password: password.current.value },
        dispatch
      );

    }
  };

  return (
    <div className='login'>
        <div className='loginwrapper'>
          <div className='loginlogo'>
            <span>Exam center</span>
           </div>
           <div className='loginform'>
            <span className="logintitle">Login </span> 
           <form onSubmit={handleLogin}>
           <div className='roleinput'>
              <span>Login as</span> <br />
              <input type="radio"  name='role' required   onChange={(e) => setuserrole(true)}/> <label htmlFor="user">User (Enter and attempt exams)</label> <br/>
              <input type="radio" name='role' required   onChange={(e) => setadmin(true)}/> <label htmlFor="admin">Admin (Create and manage exams)</label>
              </div>
             <input type="email" placeholder='email'  className="logininput" ref={email} required/>
              <input type="password" placeholder='password' ref={password}  className="logininput" required/><br />
               <button type='submit' className="loginButton" disabled={isFetching}  >Login</button>
               <Link to = "/register">
              <button className="loginRegisterButton">New here ? Register</button>
               </Link>
           </form>
           </div>
        </div>
    </div>
  )
}
