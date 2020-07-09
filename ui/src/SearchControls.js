import React, {Component} from 'react';
import logo from './cma-logo.svg';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SearchControls.css';
import {URLs} from "./urls";

class SearchControls extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    console.log("in handleClick:", this.state['searchString'] )
    URLs.get(URLs.search_artwork(this.state['searchString']))
    .then(response => response.json())
    .then(json => {
      // message will be present if search is failure
      // TODO check status
      if (!json || json.length == 0)
        this.props.onSearchResults(null);
      else {
        // this.setState({message: ''});
        // when login succeeds (no message), tell PUApp so it can go somewhere useful
        this.props.onSearchResults(json);
      }

    })

  }


  render () {
    return <div className="SearchControls-div">
      <Form>
        <Form.Group as={Row} controlId="formHorizontalSearch">
          <Col sm={10}>
            <Form.Control type="text" onChange={(e) => this.setState({searchString: e.target.value}) } placeholder="Search" />
          </Col>
          <Col>
            <Button variant="outline-light" type="button" className="mb-2" onClick={this.handleClick}>
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  }
}

export default SearchControls