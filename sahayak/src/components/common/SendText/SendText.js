import React from 'react';
import axios from 'axios';

class SendText extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'Text goes here?'};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      // this.props.history.push('/repos');
      
      alert('You said: ' + this.state.value);
      const headers = {
        'Content-type': 'application/json'
      }
      const obj = {
        ContentData: this.state.value,
        Subject: "Content"
      }
      axios.post('http://169.38.109.246:9000/services/content', { obj }, { headers: headers })
      .then(function (response) {
        alert('Sahayk reponse: ' + response);
        if (response.statusCode === 200 && response.docId !== '') {
            if (localStorage.getItem('docId')) {
              localStorage.removeItem('docId');
              localStorage.setItem('docId', response.docId);
            } else {
              localStorage.setItem('docId', response.docId);
            }
            this.props.history.push('/repo')
        }
      })
      .catch(function (error) {
        alert('Error ' + error);
      });
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <textarea value={this.state.value} onChange={this.handleChange}></textarea>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default SendText;