import React from 'react';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to AgriInsurance</h1>
      <p>Protecting Your Crops, One Harvest at a Time</p>

      <div className="content-container">
        <div className="feature">
        <img src="./unforseen_events.jpg" alt="Feature 1" />

          <h3>Insure Customer Orders against unforeseen events.</h3>
        </div>
        <div className="feature">
          <img src="./affordable.jpg" alt="Feature 2" />
          <h3>Affordable premiums tailored to your needs.</h3>
        </div>
        <div className="feature">
          <img src="./track.jpg" alt="Feature 3" />
          <h3>Streamlined process to file and track claims.</h3>
        </div>
      </div>

      {/* <div className="action-buttons">
        <button className="buy-insurance-button">Buy Insurance</button>
        <button className="file-claim-button">File a Claim</button>
      </div> */}

      <p className="slogan">Sow, Grow, Insure, Repeat</p>
    </div>
  );
}

export default Home;
