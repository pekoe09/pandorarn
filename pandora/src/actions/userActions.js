import {
  attemptLogin,
  attemptLogout,
  attemptRegister
} from '../services'
import {
  getCollections,
  getGradings
} from './index'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS'
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE'

export const loginSuccess = currentUser => ({
  type: LOGIN_SUCCESS,
  payload: { currentUser }
})

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error }
})

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS
})

export const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  payload: { error }
})

export const registrationSuccess = newUser => ({
  type: REGISTRATION_SUCCESS,
  payload: { newUser }
})

export const registrationFailure = error => ({
  type: REGISTRATION_FAILURE,
  payload: { error }
})

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      // const currentUser = {
      //   firstNames: 'Terttu',
      //   lastName: 'Testaaja',
      //   email: 'terttu@testi.com',
      //   level: 'admin'
      // }
      const currentUser = await attemptLogin(credentials)
      dispatch(loginSuccess(currentUser))
      dispatch(getCollections())
      dispatch(getGradings())
    } catch (exception) {
      console.log(exception)
      dispatch(loginFailure(exception))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      await attemptLogout()
      dispatch(logoutSuccess())
    } catch (exception) {
      console.log(exception)
      dispatch(logoutFailure(exception))
    }
  }
}

export const register = (userinfo) => {
  return async (dispatch) => {
    try {
      const newUser = await attemptRegister(userinfo)
      dispatch(registrationSuccess(newUser))
    } catch (exception) {
      console.log(exception)
      dispatch(registrationFailure(exception))
    }
  }
}