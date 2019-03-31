import { hot } from 'react-hot-loader'
import React, { Component } from 'react'

class Classes extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      results: undefined,
    }
  }
  
  componentDidMount() {
    if (typeof this.state.results === 'undefined') this.search();
  }
  
  render() {
    return (
      <div>
        <h1>Classes</h1>
        { this.state.results }
      </div>
    )
  }
  
  search = async() => {
    let res = await new Promise((resolve, reject) => {
      Meteor.call('search',
        { text: 'ENVS 21' },
        (err, response) => {
          if (err) return reject(err);
          resolve(response);
        });
      return resolve;
    });
    
    console.log(res);
    
    this.setState({
      results: res.map((course, i) => (
        <p key={ i }>{ course.subject_descr }</p>
      )),
    })
  }
  
}
export default hot(module)(Classes)
