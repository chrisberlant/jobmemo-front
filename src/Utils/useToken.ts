import { UserToken } from '../@types/jobmemo';

const useToken = () => {
  const localStorageToken = localStorage.getItem('token');
  const userToken = localStorageToken
    ? (JSON.parse(localStorageToken) as UserToken)
    : null;
  return userToken;
};

export default useToken;
