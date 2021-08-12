import React from 'react';
import ReactDOM from 'react-dom';
import Poll from './components/Poll';
import { log } from 'slidez-shared';

log();

ReactDOM.render(<Poll />, document.getElementById('index'));
