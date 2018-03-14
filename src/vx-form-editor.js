import React, { Component } from 'react';
import * as sjsEditor from 'surveyjs-editor';
import * as sjsKo from 'survey-knockout';
import $ from 'jquery';
import * as sjsWidgets from 'surveyjs-widgets';

// extensions styles:
import 'surveyjs-editor/surveyeditor.css';
import 'jquery-ui/themes/base/all.css';
import 'jquery-bar-rating/dist/themes/css-stars.css';
import 'jquery-bar-rating/dist/themes/fontawesome-stars.css';
import 'nouislider/distribute/nouislider.css';
import 'select2/dist/css/select2.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.css';
import 'image-picker/image-picker/image-picker.css';

// extensions includes:
import 'jquery-ui/ui/widgets/datepicker.js';
import 'jquery-bar-rating';
import 'select2/dist/js/select2.js';
// failing with: jQuery is not defined:
// import 'image-picker/image-picker/image-picker.js';

// add-on widgets:
sjsWidgets.icheck(sjsKo, $);
sjsWidgets.select2(sjsKo, $);
sjsWidgets.imagepicker(sjsKo, $);
sjsWidgets.inputmask(sjsKo);
sjsWidgets.jquerybarrating(sjsKo, $);
sjsWidgets.jqueryuidatepicker(sjsKo, $);
sjsWidgets.nouislider(sjsKo);
sjsWidgets.select2tagbox(sjsKo, $);
sjsWidgets.signaturepad(sjsKo);
sjsWidgets.sortablejs(sjsKo);
sjsWidgets.ckeditor(sjsKo);
sjsWidgets.autocomplete(sjsKo, $);
sjsWidgets.bootstrapslider(sjsKo);

class VxFormEditor extends Component {
  // surveyjs object:
  editor = null;

  // -------------------------
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  // -------------------------
  componentDidMount() {
    // set editor options:
    let editorOptions = {
      showJSONEditorTab: true,
      showTestSurveyTab: true,
      showEmbededSurveyTab: true
    };
    // create editor:
    this.editor = new sjsEditor.SurveyEditor('formEditorContainer', editorOptions);
    // set what to do when saving form definitions:
    this.editor.saveSurveyFunc = this.formJsonSave;
    // load current definitions:
    this.editor.text = JSON.stringify(this.props.json);
  }

  // -------------------------
  formJsonSave = () => {
    this.props.onSave(this.editor.text);
  };

  // -------------------------
  render() {
    return <div id="formEditorContainer" />;
  }
}

export default VxFormEditor;
