import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import VxForm from './vx-form';

ReactDOM.render(<VxForm />, document.getElementById('root'));
registerServiceWorker();
