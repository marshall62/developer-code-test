import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SlideShow from 'react-image-show';
import './Artworks.css';
import {FieldUtil} from './FieldUtil';
import { Lightbox } from "react-modal-image";

import img1 from './temp/a.jpg';
import img2 from './temp/b.jpg';
import img3 from './temp/c.jpg';


class Artworks extends Component {

  constructor (props) {
    super(props);
    this.state = {lightbox_open: false};
  }


  handleImageClick = (e) => {
    console.log("image clicked");
    this.setState({lightbox_open: true});
    document.getElementById("img-modal").style.display = "block";
    // document.getElementById("lightbox").style.display = "none";
  }

  closeLightbox = () => {
    console.log("close lightbox");
    this.setState({lightbox_open: false});
    document.getElementById("img-modal").style.display = "none";
    // document.getElementById("lightbox").style.display = "block";
  }

  abbreviateCreators = (creator_list) => {
    if (creator_list.length > 2)
      return creator_list[0] + "," + creator_list[1] + ", et al";
    else return creator_list;
  }



  render () {
    console.log("Artwork curwork", this.props.curWork);

    const results = this.props.artworks.length > 0;
    const imgList = this.props.artworks.map((artwork, index) => artwork['image']);
    let roles, title;
    if (this.props.curWork) {
      roles = this.props.curWork.roles.map((r, index) =>
          <div key="{index}" className="Artworks-info-div">
            {FieldUtil.capitalize(r)}: {FieldUtil.abbreviateCreators(this.props.curWork.creators[index])}
            </div>
      )
      title = this.props.curWork.title;
    }


    return (
        <div key='100' className="Artworks-div">
          {results ? <div className="Artworks-info-div">Title: {title}</div> : this.props.message}
          {roles}
          <div key='200' className="Artworks-img-container">
            {/*<div key='300' id="lightbox" className="Artworks-img-box">*/}
              <SlideShow
                  images={imgList}
                  width="920px"
                  imagesWidth="800px"
                  imagesHeight="300px"
                  imagesHeightMobile="56vw"
                  thumbnailsWidth="920px"
                  thumbnailsHeight="12vw"
                  indicators thumbnails fixedImagesHeight='30px' infinite
                  onImageClick={this.handleImageClick}
                  onMainImageChanged={this.props.onMainImageChanged}
                  arrows={true}
              />
            {/*</div>*/}
              <div key='400' id="img-modal" className="Artworks-img-box Artworks-img-box-stack">
                {results && this.state.lightbox_open
                    ?
                    <Lightbox small={this.props.curWork.image}
                                     large={this.props.curWork.image}
                                  onClose={this.closeLightbox}/>
                   : ""}
            </div>
          </div>

          <div key='210' className="Artworks-full-descr" >

            {results ? <div key='320' className="Artworks-info-div">Title: {title}</div> : ""}
            {roles}
            {results ?
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Full Description
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>{this.props.curWork ? this.props.curWork.tombstone : ""}</Card.Body>
                    </Accordion.Collapse>
                  </Card>

                </Accordion>
                : ""
            }

          </div>

        </div>)
  }

}

export default Artworks;