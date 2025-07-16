import React from 'react';
import logo from '../../assets/logo.png'
const Footer = () => {
    return (
        <div>
            <footer className="px-4 py-8 dark:bg-gray-900 dark:text-gray-600">
	<div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
		<div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
			<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full dark:bg-violet-600">
				<img src={logo} className='w-16 h-16'></img>
			</div>
			<ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
				<li>
					<a rel="noopener noreferrer" href="#">Terms of Use</a>
				</li>
				<li>
					<a rel="noopener noreferrer" href="#">Privacy</a>
				</li>
			</ul>
		</div>
		<ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
			<li>
				<a rel="noopener noreferrer" href="www.instagram.com">Instagram</a>
			</li>
			<li>
				<a rel="noopener noreferrer" href="www.facebook.com">Facebook</a>
			</li>
			<li>
				<a rel="noopener noreferrer" href="wwww.youtube.com">Youtube</a>
			</li>
		</ul>
	</div>
</footer>
        </div>
    );
};

export default Footer;