import React from 'react';

const AboutPage = () => {
    
  return (
    <div className="bx--grid bx--grid--full-width about-page">
      <div className="bx--row landing-page__banner">
        <div className="bx--col-lg-2"></div>
        <div className="bx--col-lg-8 center">
          <h1 className="about-page__heading">
            About
          </h1>
        </div>
        <div className="bx--col-lg-2"></div>
      </div>
      <div className="bx--row about-page__r2">
        <div className="bx--col bx--no-gutter">
          <h1 className="about-page__heading">
            About section text goes here
          </h1>
        </div>
      </div>   
    </div>
  );
};

export default AboutPage;