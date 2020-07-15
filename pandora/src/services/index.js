import {
  getConfig,
  getTokenHeader
} from './serviceUtils'
import {
  addEntity,
  getAll,
  getByPage,
  getCount,
  getOne,
  removeEntity,
  updateEntity
} from './entityServices'
import {
  attemptLogin,
  attemptLogout,
  attemptRegister
} from './userServices'

export {
  addEntity,
  getAll,
  getByPage,
  getConfig,
  getCount,
  getOne,
  getTokenHeader,
  removeEntity,
  updateEntity,
  attemptLogin,
  attemptLogout,
  attemptRegister
}