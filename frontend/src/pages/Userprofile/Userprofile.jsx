import React, { useContext } from 'react';
import {Introstudent} from '../../components/Intro/Intro';
import CollapsibleExample from '../../components/Topbar/Topbaruser';
import "./Userprofile.css";
import { Resultstudent } from '../../components/Result/Result';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const Userprofile = () => {
  const [userData, setUserData] = useState({});
  const userId = useParams().userId;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/user/${userId}`);
      setUserData(res.data);
    };
    fetchUser();
  }, [userId]);
  return (
    <>
      <CollapsibleExample/>
    <div className='userprofile'>
    {userData && <Introstudent userData={userData} />}
      <Resultstudent userData={userData} />
    </div>
    </>
  )
}
