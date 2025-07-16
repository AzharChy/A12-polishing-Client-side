import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    return (
        <div>
            
              <button className='text-white rounded-xl bg-gray-900 font-bold flex m-auto p-5 mt-5'> <Link to='/login'>Go to Login</Link></button>
           <img className='flex m-auto p-5 max-w-7xl' src='https://i.ibb.co/xdn8v13/images.png'></img> 
        </div>
    );
};

export default Forbidden;