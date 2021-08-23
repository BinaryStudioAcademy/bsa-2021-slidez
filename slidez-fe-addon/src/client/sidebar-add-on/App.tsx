import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';

const App = () => {
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            <iframe
                style={{
                    flexGrow: 1,
                    border: 'none',
                    margin: 0,
                    padding: 0,
                    minHeight: '600px',
                }}
                src='http://localhost:3000/#/editor'
            ></iframe>
        </div>
    );
};

export default App;
