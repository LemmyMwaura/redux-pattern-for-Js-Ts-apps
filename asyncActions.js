const { createStore, applyMiddleware } = require("redux")
const thunkMiddleware = require("redux-thunk").default
const axios = require("axios")

const initialState = {
  loading: false,
  users: [],
  error: "",
}

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED"
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED"
const FETCH_USER_FAILED = "FETCH_USER_FAILED"

const fetchUsersRequest = () => {
  return {
    type: FETCH_USER_REQUESTED,
  }
}
const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: {
      users,
    },
  }
}
const fetchUsersFailed = (error) => {
  return {
    type: FETCH_USER_FAILED,
    payload: {
      error,
    },
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return { ...state, loading:true }
    case FETCH_USER_SUCCEEDED:
      return { loading: false, users: action.payload.users }
    case FETCH_USER_FAILED:
      return { loading: false, users: [], error: action.payload.error }
    default:
      return state
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest())
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // response data is the users
        const users = response.data.map((user) => user.id)
        dispatch(fetchUsersSuccess(users))
      })
      .catch((error) => {
        // error.message is the error message
        dispatch(fetchUsersFailed(error.message))
      })
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {
  console.log(store.getState())
})
store.dispatch(fetchUsers())
