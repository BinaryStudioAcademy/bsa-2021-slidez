import React, { FC, useState } from 'react';

import server from '../../utils/server';

const { serverFunctions } = server;

const About: FC = () => {
    const [text, setText] = useState<string>('');

    const onClick = (): void => {
        serverFunctions.insertText(text);
        setText('');
    };

    return (
        <div className='container mx-2'>
            <h2>Hello World!</h2>
            <div className='input-group mt-3'>
                <input
                    className='form-control'
                    type='text'
                    id='insert'
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder='Enter a text...'
                />
            </div>
            <button
                className='btn btn-outline-secondary mt-2'
                type='button'
                onClick={() => onClick()}
            >
                add text
            </button>
        </div>
    );
};

export default About;
