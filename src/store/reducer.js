const initialState = {
  auth: false,
  loggedInUser: {},
  fetchedData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN": {
      const myState = { ...state };
      myState.auth = true;
      myState.loggedInUser = action.data;
      return myState;
    }
    case "LOG_OUT": {
      const myState = { ...state };
      myState.auth = false;
      myState.loggedInUser = {};
      return myState;
    }

    case "SET_DATA": {
      const myState = { ...state };
      myState.fetchedData = action.fetchedData;
      return myState;
    }

    default:
      return state;
  }
};

export default reducer;
