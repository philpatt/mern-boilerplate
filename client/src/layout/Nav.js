import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout.js';

import logo from '../logo.svg';


class Nav extends Component {
	render(){
		let links = <span />;
		if(this.props.user){
			links =(
				<span>
				<Link to='/profile'>Profile</Link>
				<Logout updateUser={this.props.updateUser} />
				</span>);
		
		}
		else{
			links =(
				<span>
				<Link to='/login'>Login</Link>
				<Link to='/signup'>Signup</Link>
				</span>);
		}
		return(
			<div>
				<nav className="nav">
					<Link to='/'>Home</Link>
					<Link to='/login'>Login</Link>
					<Link to='/signup'>Signup</Link>
					<Link to='/profile'>Profile</Link>
					<Link to='/signup'>Logout</Link>
					<Logout updateUser={this.props.updateUser} />
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