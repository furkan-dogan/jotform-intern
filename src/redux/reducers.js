const initialState = {
  appKey: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APP_KEY':
      return {
        ...state,
        appKey: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
