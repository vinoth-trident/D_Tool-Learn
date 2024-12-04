import { useSelector } from 'react-redux';
import { IsStoreState } from '../store'; // Adjust the import path as necessary

// Custom hook to check if the user is logged in
export const useIsLoggedIn = (): boolean|null => {
  return useSelector((state: IsStoreState) => state.userSlice.isLoggedIn);
};
