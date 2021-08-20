import { combineReducers } from 'redux'
import pollReducer from '../components/poll/redux/reducer'

export default combineReducers({
    poll: pollReducer,
})
