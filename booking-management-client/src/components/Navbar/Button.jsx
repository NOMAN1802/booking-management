/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {BiLogIn} from "react-icons/bi"
import LoginModal from "../Modal/LoginModal";

const Button = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  
  return (
  <>
  <LoginModal isOpen={isOpen} setIsOpen={setIsOpen}/>
   <div className="flex gap-2">
     <button className="bg-gray-600 text-white text-xs text-center px-6 py-2 btn-sm font-thin rounded">
      Become a partner
      
    </button>
    
    
    <div
                onClick={() => setIsOpen(!isOpen)}
                className="btn  bg-gray-600 hover:bg-gray-600 text-white font-thin normal-case rounded flex items-center justify-center gap-2 mx-2 px-2"
                style={{  fontSize: '12px' }}
              > <BiLogIn></BiLogIn>
                Sign In
              </div>
    
   </div>
  </>
  );
};

export default Button;
