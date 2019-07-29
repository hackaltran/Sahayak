import React from 'react';
import { Tabs, Tab } from 'carbon-components-react';
import { default as Accordion, AccordionItem } from 'carbon-components-react/lib/components/Accordion';
import {boolean} from '@storybook/addon-knobs';

const props = {
  tabs: {
    selected: 0,
    triggerHref: '#',
    role: 'Text',
  },
  tab: {
    href: '#',
    role: 'Questions',
    tabIndex: 0,
  },
};

class QuestionsPage extends React.Component {

  constructor(props) { 
    super(props); 
    this.state = { jsonRes: null, questionStart : 0,  questionLength : 0 };
    this.loadNextQues = this.loadNextQues.bind(this); 
    this.loadPrevQues = this.loadPrevQues.bind(this); 
    this.getQuesFunc = this.getQuesFunc.bind(this); 
    this.checkConfidenceLevel = this.checkConfidenceLevel.bind(this);

    console.log(localStorage.getItem('DocId'));
    const DocId = localStorage.getItem('DocId');
    this.getQuesFunc(DocId)
  } 

  getQuesFunc(DocId) {
    // fetch('http://169.38.109.246:8000/services/questions/' + DocId).then(response => response.json()).then(data =>
    fetch('http://169.38.109.246:8000/services/questions/'+DocId).then(response => response.json()).then(data =>
      this.setState({
        jsonRes: JSON.parse(data).Questions,
        questionStart: 0,
        questionLength: JSON.parse(data).Questions.length-2
      })
      // localStorage.setItem('DocId',data.DocId)
    ).then(() => {
      // localStorage.setItem('DocId', this.state.DocId)
      // console.log(this.state.jsonRes,'json response');
    })
  }

  checkConfidenceLevel() {

  }

  loadPrevQues = () => {
    this.setState(state => ({
      questionStart: state.questionStart-1
    }));
  }

  loadNextQues = () => {
    this.setState(state => ({
      questionStart: state.questionStart+1
    }));
  }
  
  render () {
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
              <Tab {...props.tab} label="Quenstion">
                <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                  <div className="bx--row landing-page__tab-content">
                    <div className="bx--col-md-4 bx--col-lg-7">
                      {
                        (this.state.jsonRes!=null) ?
                        <Accordion>
                        <AccordionItem title={this.state.jsonRes[this.state.questionStart].Question}
                          open={boolean('Open the section (open)', false)}
                          {...props}
                          >
                          <p>
                          {this.state.jsonRes[this.state.questionStart].Answer}
                          </p>
                        </AccordionItem>
                      </Accordion>
                      : ''
                      }
                      {this.state.questionStart > 0 ? <button title="prev" onClick={this.loadPrevQues}>Prev</button> : ''}
                      {this.state.questionStart <= this.state.questionLength ? <button title="next" onClick={this.loadNextQues}>Next</button> : ''}
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
  }
}

export default QuestionsPage;