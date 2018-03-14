import React, { Component } from 'react';
import axios from 'axios';
import VxFormRun from './vx-form-run';
import VxFormEditor from './vx-form-editor';

class VxForm extends Component {
  // connection info:
  vxUrl = 'http://localhost:8080/crud';
  vxAppName = 'vxpress';

  // -------------------------
  // eslint-disable-next-line
  constructor() {
    super();
  }

  // -------------------------
  componentWillMount() {
    // toggel run/editor. run = default = true:
    this.setState({ toggleRunEditor: true });
  }

  // -------------------------
  componentDidMount() {
    // load data from server:
    this.getFormEditorJson();
    this.getFormRunJson();
  }

  // -------------------------
  toggleMode = () => {
    let toggle = this.state.toggleRunEditor ? false : true;
    // update status:
    this.setState({ toggleRunEditor: toggle });
  };

  // -------------------------
  render() {
    // display forms:
    return (
      <div>
        {/* RUN */}
        {this.state &&
          this.state.toggleRunEditor &&
          this.state.getFormEditorJson &&
          this.state.getFormRunJson && (
            <div>
              <VxFormRun json={this.state.getFormEditorJson} answers={this.state.getFormRunJson} onComplete={this.setFormRunJson} />
            </div>
          )}
        {/* EDITOR */}
        {this.state &&
          !this.state.toggleRunEditor &&
          this.state.getFormEditorJson && (
            <div>
              <VxFormEditor json={this.state.getFormEditorJson} onSave={this.setFormEditorJson} />
            </div>
          )}
        {/* Toggle RUN/EDITOR */}
        <div>
          <button className="btn btn-primary" onClick={this.toggleMode}>
            Toggle Run/Editor
          </button>
        </div>
      </div>
    );
  }

  // -------------------------
  getFormEditorJson = () => {
    // build request:
    let request = {
      action: 'read',
      target: 'configs-editor',
      appName: this.vxAppName,
      data: null
    };
    // get json:
    axios.post(this.vxUrl, request).then(result => {
      // initialize form data:
      let editorJson = {};
      // process results:
      if (result.data) {
        editorJson = result.data;
      } else {
        console.error('getFormEditorJson: data is empty');
      }
      // set props to render editor:
      this.setState({ getFormEditorJson: editorJson });
    });
  };

  // -------------------------
  setFormEditorJson = json => {
    // build request:
    let request = {
      action: 'update',
      target: 'configs-editor',
      appName: this.vxAppName,
      data: JSON.parse(json)
    };
    // save editor definitions:
    axios.post(this.vxUrl, request).then(result => {
      // process results:
      if (result.data) {
        console.log('setFormEditorJson:', result.data);
      } else {
        console.error('setFormEditorJson: not saved');
      }
    });
  };

  // -------------------------
  getFormRunJson = () => {
    // build request:
    let request = {
      action: 'read',
      target: 'configs',
      appName: this.vxAppName,
      data: null
    };
    // get json:
    axios.post(this.vxUrl, request).then(result => {
      // initialize form data:
      let runJson = {};
      // process results:
      if (result.data) {
        runJson = result.data;
      } else {
        console.error('getFormRunJson: data is empty');
      }
      // set props to render form:
      this.setState({ getFormRunJson: runJson });
    });
  };

  // -------------------------
  setFormRunJson = formObject => {
    let out = {
      data: formObject.data,
      editor: formObject.json
    };
    console.log('VX Definitions:', out.data);
    console.log('Editor Definitions:', out.editor);
    // build request:
    let request = {
      action: 'update',
      target: 'configs',
      appName: this.vxAppName,
      data: out.data
    };
    // save editor definitions:
    axios.post(this.vxUrl, request).then(result => {
      // process results:
      if (result.data) {
        console.log('setFormRunJson:', result.data);
      } else {
        console.error('setFormRunJson: not saved');
      }
    });
  };
}

export default VxForm;
