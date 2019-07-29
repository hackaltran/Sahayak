import React from 'react';
import Accept from '../../components/common/Accept';
import SendText from '../../components/common/SendText';
// import Dictaphone from '../../components/common/Dictaphone';

import {
  Tabs,
  Tab,
} from 'carbon-components-react';

// var pdfUtil = require('pdf-to-text');
// var pdf_path = "./sample.pdf";

// pdfUtil.info(pdf_path, function(err, info) {
//   if (err) throw(err);
//   console.log(info);
// });

// var path = require('path')
// var filePath = path.join(__dirname, './sample.pdf')
// var extract = require('pdf-text-extract')
// extract(filePath, function (err, pages) {
//   if (err) {
//     console.dir(err)
//     return
//   }
//   console.dir(pages)
// })

const LandingPage = () => {
  
  const props = {
    tabs: {
      selected: 0,
      triggerHref: '#',
      role: 'navigation',
    },
    tab: {
      href: '#',
      role: 'presentation',
      tabIndex: 0,
    },
  };
  
  return (
    <div className="bx--grid bx--grid--full-width landing-page">
      <div className="bx--row landing-page__banner">
        <div className="bx--col-lg-2"></div>
        <div className="bx--col-lg-8 center">
          <h1 className="landing-page__heading">
            Create your personalize knowledge base <br />
            &amp; test your knowledge
          </h1>
        </div>
        <div className="bx--col-lg-2"></div>
      </div>
      <div className="bx--row landing-page__r2">
        <div className="bx--col bx--no-gutter">
          <Tabs {...props.tabs} aria-label="Tab navigation">
            <Tab {...props.tab} label="Upload File">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-md-4 bx--col-lg-7">
                    <Accept />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab {...props.tab} label="Record Audio">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">
                    {/* <Dictaphone /> */}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab {...props.tab} label="Write Text">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-lg-16">
                  <SendText />  
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div className="bx--row landing-page__r3">
        <h3 className="landing-page__label">How it works</h3>
      </div>
      <div className="bx--row landing-page__r3">
        <div className="bx--row">
          <div className="bx--col-md-3 bx--col-lg-3">Upload File or record audio or write text</div>
          <div className="bx--col-md-3 bx--col-lg-3">Speech/pdf to text traslation</div>
          <div className="bx--col-md-3 bx--col-lg-3">Create knowledge base</div>
          <div className="bx--col-md-3 bx--col-lg-3">Generate Questions to test your knowledge</div>
        </div>
      </div>
      
    </div>
  );
};

export default LandingPage;