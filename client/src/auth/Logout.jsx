import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Logout extends Component {
	handleLogout = (e) => {
		e.preventDefaul();
		//TODO: delete token from local storage
		//TODO: Go back to home page
		console.log('Logout function was called!');

	}
	render(){
		return (<Link to='/' onClick={this.handleLogout}>Logout</Link>);
	}
}

export default Logout;