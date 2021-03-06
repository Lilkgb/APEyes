import constants from './../constants';
const {firebaseState, types} = constants

const firebaseReducer = (state = firebaseState, action) => {
  let newState;
  switch (action.type) {
    case types.RECIEVE_MESSAGE:
      newState = Object.assign({}, state);
      newState[action.message.id] = action.message;
      return newState;
    default:
      return state;
  }
}

export default firebaseReducer
