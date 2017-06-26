import { combineReducers } from 'redux';
import { ADD_MESSAGES } from './../actions';

const messages = (
  state = [
    {
      id: '1',
      type: 'bot',
      msg: 'Hello',
    },
    {
      id: '11',
      type: 'bot',
      msg: 'Sup',
    },
    {
      id: '2',
      msg: 'hi',
      type: 'user',
    },
    {
      id: 'c',
      type: 'choice',
      choices: [{ id: 'one', val: 'one' }, { id: 'two', val: 'two' }],
      cb(choice) {
        console.log('The use chose', choice);
      },
    },
  ],
  action
) => {
  switch (action.type) {
    case ADD_MESSAGES:
      return [...state, ...action.messages];
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  messages,
});

export default rootReducer;
