import { 
  MANUFACTURER_RESULTS, 
  EMAIL_SENT, 
  MANUFACTURER_CHARACTERS, 
  LOADING_MANUFACTURER, 
  LOADING_CHARACTERS, 
  MANUFACTURER_RESULT} from './types';

const INITIAL_STATE = {
  manufacturer: null,
  manufacturerById: null,
  loadingEmail:{message:"",status:false},
  loadingManufacturer:false,
  loadingCharacters:false,
};

export default (state:any = {...INITIAL_STATE}, action:any) => {
  switch (action.type) {
    case MANUFACTURER_RESULTS:
      return {
        ...state,
        manufacturer: action.payload
      };

    case MANUFACTURER_RESULT:
      return {
        ...state,
        manufacturerById: action.payload
      };

    case MANUFACTURER_CHARACTERS:
      return {
        ...state,
        characters: action.payload
      };

    case EMAIL_SENT:
      return {
        ...state,
        loadingEmail: action.payload,
      };

    case LOADING_MANUFACTURER:
      return {
        ...state,
        loadingManufacturer: action.payload,
      };

    case LOADING_CHARACTERS: 
      return {
        ...state,
        loadingCharacters: action.payload,
      };
      
    default:
      return state;
  }
};