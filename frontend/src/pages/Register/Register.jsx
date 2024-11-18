import "./Register.css"
import { useState , useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();
  const [admin , setadmin] = useState(false);
  const[user , setuser] = useState(false);

  const handleRegister = async (e) =>{
       e.preventDefault();
       if (passwordAgain.current.value !== password.current.value) {
        passwordAgain.current.setCustomValidity("Passwords don't match!");
      } else {
     
        try {
          if(admin){
            const adminData = {
              adminname: username.current.value,
              email: email.current.value,
              password: password.current.value,
            };
            await axios.post("http://localhost:8800/api/auth/register/admin", adminData);
            history("/login");
          }
          if(user){
            const userData = {
              username: username.current.value,
              email: email.current.value,
              password: password.current.value,
            };
            await axios.post("http://localhost:8800/api/auth/register/user", userData);
            history("/login");
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    
    return (
      <div className='register'>
        <div className='registerwrapper'>
          <div className='registerlogo'>
            <span>Exam center</span>
           </div>
           <div className='registerform'>
            <span className="registertitle"> Register </span> 
           <form onSubmit={handleRegister}>
              <div className='roleinput'>
              <span>Your role ..</span> <br />
              <input type="radio"  name='role' required onChange={(e) => setuser(true)} /> <label htmlFor="user">User (Enter and attempt exams)</label> <br/>
              <input type="radio" name='role' required  onChange={(e) => setadmin(true)} /> <label htmlFor="user">Admin (Create and manage exams)</label>
              </div>
             <input type="text" placeholder='username' ref={username}  className="registerinput" required/>
              <input type="email" placeholder='email' ref={email}  className="registerinput" required/><br />
              <input type= "text" placeholder='password' ref={password}  className="registerinput" required/><br />
              <input type= "text" placeholder='Enter password again' ref={passwordAgain}  className="registerinput" required/><br />
               <button type='submit' className="registerButton">Register</button>

               <Link to = "/login">
                <button className="loginRegisterButton">Already have account ? Login</button>
               </Link>
           </form>
           </div>
        </div>
    </div>
  )
  
}
