import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'muicss/react';

const liff = window.liff;  

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayName : '',
      userId : '',
      pictureUrl : '',
      statusMessage : ''
    };
    this.initialize = this.initialize.bind(this);
    this.closeApp = this.closeApp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.initialize);
  }

  initialize() {
    liff.init(async (data) => {
      let profile = await liff.getProfile();
      this.setState({
        displayName : profile.displayName,
        userId : profile.userId,
        pictureUrl : profile.pictureUrl,
        statusMessage : profile.statusMessage
      });
    }); 
  }

  closeApp(event) {
    event.preventDefault();
    liff.sendMessages([{
      type: 'text',
      text: "Thank you, Bye!"
    }]).then(() => {
      liff.closeWindow();
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        
        <p className="App-intro">
          Display Name : {this.state.displayName} <br/>
          User ID : {this.state.userId} <br/>
          Status Msg : {this.state.statusMessage}
        </p>
        <Button color="primary" onClick={this.closeApp}>Close</Button>
        </header>
      </div>
    );
  }
}

export default App;
