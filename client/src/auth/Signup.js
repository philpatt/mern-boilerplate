import React, { Component } from 'react';
import axios from 'axios';
class Signup extends Component {
	constructor (props){
		super(props);
		this.state = {
			name: '',
			email:'',
			password:''
		}
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value });

	}
	handleFormSubmit = (e) => {
		e.preventDefault();
		console.log('form was submitted! this is state', this.state)
		// TODO: use axios to all server and attemp to log in
		// NOTE: expect to receive a token back from server on success
		// NOTE: Make sure to handle error messages on failure
		// TODO: redirect to profile

	}


	render(){
		return (
			<form onSubmit={this.handleFormSubmit}>
				<div>
					<label>Name: </label>
					<input type='text' name='name' placeholder='Your nombre' value={this.state.name} onChange={this.handleChange} />
				</div>
				<div>
					<label>Email: </label>
					<input type='text' name='email' placeholder='Your Email' value={this.state.email} onChange={this.handleChange} />
				</div>
				<div>
					<label>Password: </label>
					<input type='password' name='password' placeholder='Enter Password' value={this.state.password} onChange={this.handleChange} />
				</div>
				<input type='submit' value='Signup' className='btn' />
			</form>

		);
	}
}

export default Signup;