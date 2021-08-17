import React from 'react'
import { Provider } from 'react-redux'
import Main from './containers/main/Main'
import { store } from './store'

const App = () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    )
}

export default App
