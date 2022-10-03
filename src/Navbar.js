import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Navbar(){
  return(
    <div>
      <ul>
        <li>
        <i class='bx bxs-home'></i>
          <Link to='/'>Home</Link>
        </li>
        <li>
        <i class='bx bxs-user'></i>
          <Link to='/student'>Student</Link>
        </li>
        <li>
          <i class='bx bxs-book-reader'></i>
          <Link to='/teacher'>Teacher</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;