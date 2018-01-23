import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';


class Nav extends Component {
	render(){
		return(
			<div>
				<nav className="nav">
					<Link to='/'>Home</Link>
					<Link to='/login'>Login</Link>
					<Link to='/signup'>Signup</Link>
				</nav>
				<header className="App-header">
	        		<img src={logo} className="App-logo" alt="logo" />
	          		<h1 className="App-title">MERN Stack Boilerplate</h1>
	        	</header>
			</div>
		);
	}
}

export default Nav;