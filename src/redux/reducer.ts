import { combineReducers } from 'redux';
import { githubSearchSlice } from '@/src/redux/slices/githubSearch';

const reducer = combineReducers({
  githubSearch: githubSearchSlice.reducer,
});

export default reducer;
