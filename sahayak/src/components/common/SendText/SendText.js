import React from 'react';
import { Link } from 'react-router-dom';
import InlineLoading from 'carbon-components-react/lib/components/InlineLoading';

class SendText extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '', DocId: '', progress: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      this.setState({
        progress: true
      })
      const dataObj = {
        Subject: 'topic',
        ContentData: this.state.value
      }

      fetch('http://169.38.109.246:8000/services/content', {
        method: 'post',
        body: JSON.stringify(dataObj)
      }).then(response => response.json()).then(data =>
          this.setState({
            DocId: data.DocId,
            progress: false
          })
        ).then(() => {
          localStorage.setItem('DocId', this.state.DocId)
        }).catch((error) => {
          console.log(error);
        })
      event.preventDefault();
    }
  
    render() {
      return (
        
        <form onSubmit={this.handleSubmit}>
          <div className="bx--grid bx--grid--full-width">
            <div className="bx--row">
            <textarea style={{ height: '100px', width: '800PX' }} value={this.state.value} onChange={this.handleChange}></textarea>
            </div>
            <div className="bx--row" style={{ paddingTop: '5px' }}>
            <input  type="submit" value="Submit" style={{ marginRight: '10px' }} />
            {
              (this.state.progress) ? <InlineLoading
              style={{ marginLeft: '1rem' }}
              description="Generating Questions..."
            /> : ''
            }
            
                { this.state.DocId !=='' ? <Link to="/questions">
                        <button type="button">
                              Get questions
                        </button>
                    </Link> : '' }
            </div>
          </div>
        </form>
      );
    }
  }

  export default SendText;