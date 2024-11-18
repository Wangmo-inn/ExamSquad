import "./Adminprofile.css"
import AdminNavbar from "../../components/Topbar/Topbaradmin";
import { Examtable } from "../../components/Examtable/Examtable";
import { Introadmin } from "../../components/Intro/Intro";
import { useState , useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function Adminprofile ()  {

  const [adminData, setAdminData] = useState([]);
  const adminId = useParams().adminId;

  useEffect(() => {
  const fetchAdmin = async () =>{

    const res = await axios.get(`http://localhost:8800/api/admin/${adminId}`);
    setAdminData(res.data);
  }
  fetchAdmin();
  }, []);

  return (
    <>
    <AdminNavbar/>
    <div className='adminprofile'>
    {adminData && <Introadmin adminData={adminData} />}
      <Examtable/>
    </div>
    </>
  )
}
