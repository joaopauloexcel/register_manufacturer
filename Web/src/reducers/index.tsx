  
import { combineReducers } from 'redux';
import reducer from '../redux';
import Manufacturer from '../templates/manufacturer/reducer';

export default combineReducers({
  global: reducer,
  manufacturer: Manufacturer,
});