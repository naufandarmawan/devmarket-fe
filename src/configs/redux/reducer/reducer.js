import { combineReducers } from "redux";
// import assetsReducer from './assetsReducer'
// import authReducer from './authReducer'
// import experienceReducer from './experienceReducer'
// import hireReducer from './hireReducer'
// import portfolioReducer from './portfolioReducer'
// import recruitersReducer from './recruitersReducer'
import workersReducer from './workersReducer'
import skillReducer from "./skillReducer";

const rootReducer = combineReducers({
    // assets: assetsReducer,
    // auth: authReducer,
    // experience: experienceReducer,
    // hire: hireReducer,
    // recruiters: recruitersReducer,
    // portfolio: portfolioReducer,
    skill: skillReducer,
    workers: workersReducer,
});

export default rootReducer