import React from 'react'
import "./Home.css";
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className='home'>
     <div className='heading'>ExamCenter</div>
     <div className='text'>Welcome to Exam center</div><br />
     <div className='buttons'>
      <Link to = '/login'>
     <button className='button'>Login</button>
      </Link>
      <Link to = '/register'>
     <button className='button'>Register</button>
      </Link>
     
     </div>
    </div>
  )
}
