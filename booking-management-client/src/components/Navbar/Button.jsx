/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {BiLogIn} from "react-icons/bi"
import LoginModal from "../Modal/LoginModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Button = () => {
  const [isOpen, setIsOpen] = useState(false);

  
  return (
  <>
  <LoginModal isOpen={isOpen} setIsOpen={setIsOpen}/>
   <div className="flex gap-2">
     <button onClick={()=>{
      
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Log in first',
        showConfirmButton: false,
        timer: 1500
      })
     
     }} className="bg-gray-600 text-white text-xs text-center px-6 py-2 btn-sm font-thin rounded">
      Become a Host
      
    </button>
    
    
    <div
                onClick={() => setIsOpen(!isOpen)}
                className=" bg-gray-600 hover:bg-gray-600 text-white font-thin normal-case rounded flex items-center justify-center gap-2 px-2  cursor-pointer"
                style={{  fontSize: '12px' }}
              > <BiLogIn></BiLogIn>
                Sign In
              </div>
    
   </div>
  </>
  );
};

export default Button;
