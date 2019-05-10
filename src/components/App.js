import React from 'react';
import './App.scss';
import Error404 from './Error404';
import Header from './Header';
import Home from './Home';
import Menu from './Menu';
import { Switch, Route } from 'react-router-dom';
import GiphyAPI from './GiphyAPI';
import * as ROUTES from '../constants/Routes';
import SignUp from './SignUp';
import {connect} from 'react-redux';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      menu: false,
      menuView: "vertical",
      authUser: null
    }
    this.menuToggle = this.menuToggle.bind(this)
    this.menuVerticalView = this.menuVerticalView.bind(this)
    this.menuHorizontalView = this.menuHorizontalView.bind(this)
  }

  menuToggle(){
    this.setState(prevState => ({menu: !prevState.menu}))
  }

  menuVerticalView(){
    this.setState({menuView: "vertical"})
  }

  menuHorizontalView(){
    this.setState({menuView: "horizontal"})
  }
  render(){
    return (
      <div className="App">
        <Header authUser={this.state.authUser} menuToggle={this.menuToggle} />
        <Menu menu={this.state.menu} closeMenu={this.menuToggle} verticalView={this.menuVerticalView} horizontalView={this.menuHorizontalView} menuRotation={this.state.menuView}/>
        <Switch>
          <Route exact path={ROUTES.HOME} component={Home} />
          <Route exact path={ROUTES.GIPHY_API} component={GiphyAPI} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUp}/>
          <Route component={Error404}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState
})

export default connect(mapStateToProps)(App);
