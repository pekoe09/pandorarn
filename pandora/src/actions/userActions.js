export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'


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

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const currentUser = {
        firstNames: 'Terttu',
        lastName: 'Testaaja',
        email: 'terttu@testi.com',
        level: 'admin'
      }
      dispatch(loginSuccess(currentUser))
    } catch (exception) {
      console.log(exception)
      dispatch(loginFailure(exception))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutSuccess())
    } catch (exception) {
      console.log(exception)
      dispatch(logoutFailure(exception))
    }
  }
}