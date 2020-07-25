import {
  COLLECTION_CHANGED,
  COLLECTION_CREATE_BEGIN,
  COLLECTION_CREATE_SUCCESS,
  COLLECTION_CREATE_FAILURE,
  COLLECTION_READ_BEGIN,
  COLLECTION_READ_SUCCESS,
  COLLECTION_READ_FAILURE,
  COLLECTION_UPDATE_BEGIN,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_UPDATE_FAILURE,
  COLLECTION_DELETE_BEGIN,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_DELETE_FAILURE
} from '../actions'
import { get } from 'mongoose'

const initialState = {
  // items: [
  //   {
  //     name: 'Medals', id: '1',
  //     categories: [
  //       {
  //         name: 'France',
  //         id: 1,
  //         categories: [
  //           { name: "Legion d'Honneur", id: '1' },
  //           {
  //             name: 'Campaign Medals',
  //             id: 2,
  //             categories: [
  //               { name: 'Pre-WWI', id: '3' },
  //               { name: 'WWI', id: '4' }
  //             ]
  //           },
  //           { name: 'Croix de Guerre', id: '3' }
  //         ]
  //       },
  //       { name: 'Sweden', id: '2' },
  //       { name: 'Albania', id: '3' }
  //     ]
  //   },
  //   { name: 'Bank notes', id: '2' },
  //   { name: 'Badges', id: '3' }
  // ],
  items: [],
  currentCollection: null,
  gettingCollections: false,
  creatingCollection: false,
  updatingCollection: false,
  deletingCollection: false,
  collectionError: null
}

const collectionReducer = (store = initialState, action) => {
  switch (action.type) {
    case COLLECTION_CHANGED:
      console.log('collection changed', action.payload.collectionId, store.items)
      return {
        ...store,
        currentCollection: store.items.find(c => c._id.toString() === action.payload.collectionId)
      }
    case COLLECTION_CREATE_BEGIN:
      return {
        ...store,
        creatingCollection: true,
        collectionError: null
      }
    case COLLECTION_CREATE_SUCCESS:
      console.log('adding collection', action.payload.collection)
      return {
        ...store,
        items: store.items.concat(action.payload.collection),
        creatingCollection: false,
        collectionError: null
      }
    case COLLECTION_CREATE_FAILURE:
      return {
        ...store,
        creatingCollection: false,
        collectionError: action.payload.error
      }
    case COLLECTION_READ_BEGIN:
      return {
        ...store,
        gettingCollections: true,
        collectionError: false
      }
    case COLLECTION_READ_SUCCESS:
      return {
        ...store,
        items: action.payload.collections,
        gettingCollections: false,
        collectionError: false
      }
    case COLLECTION_READ_FAILURE:
      return {
        ...store,
        gettingCollections: false,
        collectionError: action.payload.error
      }
    case COLLECTION_UPDATE_BEGIN:
      return {
        ...store,
        updatingCollection: true,
        collectionError: null
      }
    case COLLECTION_UPDATE_SUCCESS:
      return {
        ...store,
        items: store.items.map(c => c._id === action.payload.collection._id
          ? action.payload.collection : c),
        updatingCollection: false,
        collectionError: null
      }
    case COLLECTION_UPDATE_FAILURE:
      return {
        ...store,
        updatingCollection: false,
        collectionError: action.payload.error
      }
    case COLLECTION_DELETE_BEGIN:
      return {
        ...store,
        deletingCollection: true,
        collectionError: null
      }
    case COLLECTION_DELETE_SUCCESS:
      return {
        ...store,
        items: store.items.filter(c => c._id !== action.payload.collectionId),
        deletingCollection: false,
        collectionError: null
      }
    case COLLECTION_DELETE_FAILURE:
      return {
        ...store,
        deletingCollection: false,
        collectionError: action.payload.error
      }
    default:
      return store
  }
}

export default collectionReducer