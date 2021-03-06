import React from 'react';
import '../scss/styles.scss';
import * as ROUTES from '../constants/Routes';
import {connect} from 'react-redux';
import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database"

const INITIAL_STATE ={
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class SignUp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      ...INITIAL_STATE
    }
  }

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  createUser = event => {
    event.preventDefault();
    const {username, email, passwordOne} = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, passwordOne).then(update => {
      firebase.auth().currentUser.updateProfile({displayName: username})
      this.setState({...INITIAL_STATE});
      this.props.history.push(ROUTES.HOME)
    }).then(database => {
      let user = firebase.auth().currentUser
      firebase.database().ref('users').child(user.uid).set({name: username, email: email})
    }).catch(error => {
      this.setState({error})
    })
  }

  render(){
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return(
      <div>
      <h1>Create your new account</h1>
      <form className="form" onSubmit={this.createUser}>
        <input
          name='username'
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"/>
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"/>
        <input
          name='passwordOne'
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"/>
        <input
          name='passwordTwo'
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"/>
        <button disabled={isInvalid} type="submit">Create Account</button>

      </form>
      {error && <p>{error.message}</p>}
      </div>
    )
  }
}

export default connect()(SignUp);
