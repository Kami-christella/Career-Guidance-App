import React from "react";

import image1 from '../assets/images/c4.png';
import image2 from '../assets/images/c3uu.jpg';
import image3 from '../assets/images/c14.jpg';

function Carousel(){
    return(
        <div>
              {/* Carousel Start */}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <ol className="carousel-indicators">
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
          <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
        </ol>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={image1} alt="First slide" />
            <div className="carousel-caption d-none d-md-block">
              <h5>We Help You Choose Your Future Career</h5>
              <button className="btn btn-primary">Join Us Today</button>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={image2} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={image3} alt="Third slide" />
          </div>
        </div>

        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>
      {/* Carousel End */}
        </div>
    )
}

export default Carousel;