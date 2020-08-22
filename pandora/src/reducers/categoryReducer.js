import {
  CATEGORY_CREATE_BEGIN,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAILURE,
  CATEGORY_READ_BEGIN,
  CATEGORY_READ_SUCCESS,
  CATEGORY_READ_FAILURE,
  CATEGORY_UPDATE_BEGIN,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAILURE,
  CATEGORY_DELETE_BEGIN,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAILURE
} from '../actions'

const initialState = {
  byId: {},
  allIds: [],
  currentCategory: null,
  gettingCategorys: false,
  creatingCategory: false,
  updatingCategory: false,
  deletingCategory: false,
  categoryError: null
}

const categoryReducer = (store = initialState, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingCategory: true,
        categoryError: null
      }
    case CATEGORY_CREATE_SUCCESS:
      console.log('hit create success', action.payload.category)
      const newCategory = action.payload.category
      return {
        ...store,
        byId: {
          ...store.byId,
          [newCategory._id]: newCategory
        },
        allIds: store.allIds.concat(newCategory._id),
        creatingCategory: false,
        categoryError: null
      }
    case CATEGORY_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingCategory: false,
        categoryError: action.payload.error
      }
    case CATEGORY_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingCategories: true,
        categoryError: false
      }
    case CATEGORY_READ_SUCCESS:
      console.log('hit read success', action.payload.categories)
      const categories = action.payload.categories
      return {
        ...store,
        byId: categories.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: categories.map(c => c._id),
        gettingCategories: false,
        categoryError: false
      }
    case CATEGORY_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingCategories: false,
        categoryError: action.payload.error
      }
    case CATEGORY_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingCategory: true,
        categoryError: null
      }
    case CATEGORY_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.category, store.items)
      const category = action.payload.category
      return {
        ...store,
        byId: { ...store.byId, [category._id]: category },
        updatingCategory: false,
        categoryError: null
      }
    case CATEGORY_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingCategory: false,
        categoryError: action.payload.error
      }
    case CATEGORY_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingCategory: true,
        categoryError: null
      }
    case CATEGORY_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.categoryId)
      const categoryId = action.payload.categoryId
      const { [categoryId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== categoryId),
        deletingCategory: false,
        categoryError: null
      }
    case CATEGORY_DELETE_FAILURE:
      console.log('hit delete failure')
      return {
        ...store,
        deletingCategory: false,
        categoryError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default categoryReducer