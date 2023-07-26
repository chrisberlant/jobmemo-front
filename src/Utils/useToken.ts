import { UserToken } from '../@types/jobmemo';

export const useToken = () => {
  const localStorageToken = localStorage.getItem('token');
  const userToken = localStorageToken
    ? (JSON.parse(localStorageToken) as UserToken)
    : null;
  return userToken;
};

export default useToken;
