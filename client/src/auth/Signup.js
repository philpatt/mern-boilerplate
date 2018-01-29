import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
		//use axios to all server and attemp to signup
		axios.post('/auth/signup', {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		}).then(result => {
			console.log('response/result from server', result);
			localStorage.setItem('mernToken', result.data.token);
			//update the parent object
			this.props.updateUser();
		}).catch( error => {
			console.log('###### SERVER HAD AN ERROR...',error)
			this.props.setFlash('error', error.response.status + ': ' + error.response.data.message)
		});
	}


	render(){
		if( this.props.user){
			return( <Redirect to='/profile' />)
		}
		else{
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
}	

export default Signup;