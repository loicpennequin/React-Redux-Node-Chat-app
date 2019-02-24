import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer.js';
import registerReducer from './registerReducer.js';
import userReducer from './userReducer.js';
import profileReducer from './profileReducer.js';
import requestReducer from './requestReducer.js';
import contactReducer from './contactReducer.js';
import messageReducer from './messageReducer.js';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    register: registerReducer,
    user: userReducer,
    profile: profileReducer,
    request: requestReducer,
    contact: contactReducer,
    message: messageReducer
});

export default rootReducer;
