const initialState = {
    mySkill: [],
  };
  
  const skillReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_SKILLS':
        return {
          ...state,
          mySkill: action.payload,
        };
      case 'ADD_SKILL':
        return {
          ...state,
          mySkill: [...state.mySkill, action.payload],
        };
      case 'DELETE_SKILL':
        return {
          ...state,
          mySkill: state.mySkill.filter((item) => item.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default skillReducer;