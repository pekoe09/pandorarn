const initialState = {
  items: [],
  currentUser: {
    firstNames: 'Terttu',
    lastName: 'Testaaja',
    email: 'terttu@testi.com',
    level: 'admin'
  },
  error: null
}

const userReducer = (store = initialState, action) => {
  switch (action.type) {
    default:
      return store
  }
}

export default userReducer