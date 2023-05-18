import React from "react";
import "./Home.css";
import img from "./1.png";
const Home = () => {
  return (
    <div className="container-home">
      <div className="section-one">
        <div className="content">
          <h1 className="title-name">
            Academia<span>Net</span>
          </h1>
          <p>
            Streamline Your Academic Journey: Discover a Customized Platform for
            Efficient Knowledge Exchange and Enhanced Learning.
          </p>
        </div>
        <div className="logo">
          <img src={img} alt="Logo" />
        </div>
      </div>
      <div className="section-two">
        <div className="feature-list">Track contribition history</div>
        <div className="feature-list">Read papers with GPT</div>
        <div className="feature-list">Form communities</div>
      </div>
      <div className="section-three">
        <h2>FAQ</h2>
        <ul>
          <li>
            <h3>What if I have issues with the website?</h3>
            <p>Please email us at academianet@gmail.com</p>
          </li>
          <li>
            <h3>How contribution activity calculated</h3>
            <p>
              Depending on your action, some score given to your contribution
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
