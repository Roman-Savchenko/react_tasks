import React, { Component } from 'react';
import './App.css';
import Main from './MainBlock/Main';
import Header from './HeaderBlock/Header';
import Footer from './FooterBlock/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div id="wrapper" className="container">
              <Header/>
              <Main/>
              <Footer/>
          </div>
      </div>
    );
  }
}

export default App;
