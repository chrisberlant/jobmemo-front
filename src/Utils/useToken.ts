import { UserToken } from '../@types/jobmemo';

export const useToken = () => {
  const localStorageToken = localStorage.getItem('token');
  const userToken = localStorageToken
    ? (JSON.parse(localStorageToken) as UserToken)
    : null;
  return userToken;
};

export const tokenAuthorization = `Bearer ${localStorage
  .getItem('token')
  ?.replace(/^"(.*)"$/, '$1')}`; // Get the token from localStorage and remove the "" around using regex
