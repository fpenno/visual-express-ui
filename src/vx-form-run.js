import React, { Component } from 'react';
import * as Survey from 'survey-react';
import './vx-form-run.css';

class VxFormRun extends Component {
  // -------------------------
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  // -------------------------
  fullComponent = props => {
    // docs: https://surveyjs.io/Documentation/Library/?id=surveymodel#data
    // render object:
    return <Survey.Survey json={this.props.json} data={this.props.answers} onComplete={this.props.onComplete} />;
  };

  // -------------------------
  render() {
    // display form:
    return this.fullComponent(this.props);
  }
}

export default VxFormRun;
