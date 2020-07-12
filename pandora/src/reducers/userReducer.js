import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../actions'

const initialState = {
  items: [],
  currentUser: null,
  loggingIn: false,
  loggingOut: false,
  error: null
}

const userReducer = (store = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...store,
        currentUser: action.payload.currentUser,
        loggingIn: false,
        error: null
      }
    case LOGIN_FAILURE:
      return {
        ...store,
        currentUser: null,
        loggingIn: false,
        error: action.payload.error
      }
    case LOGOUT_SUCCESS:
      return {
        ...store,
        currentUser: null,
        loggingOut: false,
        error: null
      }
    case LOGOUT_FAILURE:
      return {
        ...store,
        loggingOut: false,
        error: action.payload.error
      }
    default:
      return store
  }
}

export default userReducer