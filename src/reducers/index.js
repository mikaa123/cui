import { combineReducers } from 'redux';
import { ADD_MESSAGES } from './../actions';

const messages = (
  state = [
    {
      id: '1',
      msg: 'Hello',
    },
    {
      id: '11',
      msg: 'Sup',
    },
    {
      id: '2',
      msg: 'hi',
      user: true,
    },
    // {
    //   id: 'c',
    //   choices: [{ id: 'one', val: 'one' }, { id: 'two', val: 'two' }],
    //   cb(choice) {
    //     console.log('The use chose', choice);
    //   },
    // },
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
