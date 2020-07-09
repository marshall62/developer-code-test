import React, { Component } from 'react';
import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CMABanner from './CMABanner';
import SearchControls from './SearchControls';
import Artworks from './Artworks';
import './App.css';


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {artworks: [], curWork: undefined};
  }

  handleToolSelect = (e) => {
    // if not logged in, go to the login page; o/w go to requested tab.
    if (!this.state.user)
      this.setState({ontab: 'login'});
    else {
      this.setState({ontab: e});
      if (e === 'logout')
        this.logoutUser();
    }
  }

  handleSearchResults = (json) => {
    if (json == null)
      this.setState({artworks: [], curwork: undefined, message: "No results found"});
    else
      this.setState({artworks: json, curWork: json[0]});
  }

  handleMainImageChanged = (ix) => {

    const cw = this.state.artworks[ix];
    this.setState({curWork: cw});
    console.log("Changed main image to ", ix, cw);
  }

  render() {

    return (
        <div className="container">

          <CMABanner activeLink={this.state.ontab} onToolSelect={this.handleToolSelect}></CMABanner>
          <SearchControls onSearchResults={this.handleSearchResults}/>
          <Artworks artworks={this.state.artworks}
                    curWork={this.state.curWork}
                    message={this.state.message}
                    onMainImageChanged={this.handleMainImageChanged}/>
        </div>
    );
  }
}

export default App;
