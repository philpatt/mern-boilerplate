import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Logout extends Component {
	handleLogout = (e) => {
		e.preventDefaul();
		//TODO: delete token from local storage
		localStorage.removeItem('mernToken');
		//TODO: Go back to home page
		this.props.updateUser();
	}
	render(){
		return (<Link to='/' onClick={this.handleLogout}>Logout</Link>);
	}
}

export default Logout;