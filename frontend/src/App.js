import Adminprofile from "./pages/Adminprofile/Adminprofile";
import { Home } from "./pages/Home/Home";
import { Userprofile } from "./pages/Userprofile/Userprofile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Examresult } from "./pages/Examresult/Examresult";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Createtest from "./pages/Createtest/Createtest";
import { BrowserRouter, Route , Routes , Navigate} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Examenter from "./pages/Examenter/Examenter";
import Exam from "./pages/Exam/Exam";
import { Examinstructions } from "./pages/Examinstuctions/Examinstructions";

function App() {
  
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
          <Route exact path='/' element={ <Home />} />
          <Route exact path='/login' element={<Login />}/>
          <Route exact path="/register"element = {<Register />} />
          <Route exact path="/userprofile/:userId" element = {< Userprofile />} />
          <Route exact path="/adminprofile/:adminId" element = {<Adminprofile/>}/> 
          <Route exact path="/examresult/:examId" element = {<Examresult/>}/> 
          <Route exact path="/createtest/:adminId" element = {<Createtest/>}/> 
          <Route exact path="/examenter/:userId" element = {<Examenter/>}/>
          <Route exact path="/exam/:examId" element = {<Exam/>}/>
          <Route exact path="/examinstructions/:examId" element = {<Examinstructions/>}/>
        </Routes>
         </BrowserRouter>
    </div>
  );
}

export default App;
