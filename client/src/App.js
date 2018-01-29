import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './layout/Footer.js';
import Home from './Home.js';
import Flash from'./layout/Flash.js';
import Login from './auth/Login.js';
import axios from 'axios';
import Signup from './auth/Signup.js';
import Profile from './Profile.js';
import Nav from './layout/Nav.js';


import './App.css';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      token:'',
      user: null,
      flashType: '',
      flash: ''
    }
  }

  componentDidMount = () => {
    this.loadUser();
  }
  loadUser = () => {
    console.log('loading user...');
    const token = localStorage.getItem('mernToken');
    if(token){
      console.log('non-empty token', token);
      //use axios to get user from token
      axios.post('/auth/me/from/token', {
        token: token
      }).then(result => {
        console.log('Sucess! result is', result);
        //todo: if valid user oject is returned, assign it to the state
        if(result){
          this.state({
            token: result.data.token,
            user: result.data.user
          });
        }
        else{
          localStorage.removeItem('mernToken');
          this.setState({
            token: '',
            user: null
          });
        }
      }).catch(error => {
        console.log('there was an error with loadUser', error);
        localStorage.removeItem('mernToken');
        this.setState({
          token:'',
          user: null
        });
      });
    }
    else {
      console.log('NO TOKEN');
      this.setState({
        token:'',
        user: null
      })
    }
  }
  setFlash = (t, m) => {
    this.setState({
      flashType: t,
      flash: m
    })
  }

  cancelFlash = () => {
    this.setState({
      flashType: '',
      flash:''
    })
  }
  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <Nav user={this.state.user} updateUser={this.loadUser} />
          <Flash flashType={this.state.flashType} flash={this.state.flash} cancelFlash={this.cancelFlash} />
            <div className="content">
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={
                () => (<Signup user={this.state.user} updateUser={this.loadUser} setFlash={this.setFlash} />)
              } />
              <Route exact path='/profile' component={Profile} />
            }
          }
        }
          </div>
        </div>

      </Router>
        <Footer />
      </div>
    );
  }
}



export default App;