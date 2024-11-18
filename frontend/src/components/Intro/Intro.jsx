import "./Intro.css";
import { Link } from "react-router-dom";

export function Introstudent ({userData}) {
  return (
    <div className="intropart">
    <div className="intro">
        <div className="introwrapper">
        <div className="image">
        <img src="https://i0.wp.com/bamgreen.lk/wp-content/uploads/2019/04/tessfdst.jpg?fit=470%2C446&ssl=1" alt="" srcset=""  className="introImg"/>
        </div>
        <div className="introdesc">
        <h4>{userData.username}</h4>
        <h6>{userData.email}</h6>
        <h6>Student</h6>   
        <Link to={`/examenter/${userData._id}`}>
        <button className="testbutton">Attempt any test</button>  
        </Link>
        </div>
        </div>
    </div>
    </div>
  )
}

export function Introadmin ({adminData}) {
  return (
    <div className="intropart">
    <div className="intro">
        <div className="introwrapper">
        <div className="image">
        <img src="https://i0.wp.com/bamgreen.lk/wp-content/uploads/2019/04/tessfdst.jpg?fit=470%2C446&ssl=1" alt="" srcset=""  className="introImg"/>
        </div>
        <div className="introdesc">
        <h4>{adminData.adminname}</h4>
        <h6>{adminData.email}</h6>
        <h6>Admin</h6>  
        <Link to = {`/createtest/${adminData._id}`}>
        <button className="testbutton">Create test</button>  
        </Link> 
        </div>
        </div>
    </div>
    </div>
  )
}
