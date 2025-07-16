import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    return (
        <div>
           <button className='text-white rounded-xl bg-gray-900 font-bold flex m-auto p-5 mt-5'> <Link to='/login'>Go to Login</Link></button>
           <img className='flex m-auto p-5' src='https://i.ibb.co/4w2ZF752/401-error-wordpress-featured-image.jpg'></img> 
        </div>
    );
};

export default Unauthorized;