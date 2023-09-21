import securedFetch from './securedFetch';

const logOut = async () => {
  localStorage.clear();
  await securedFetch('/logout');
  window.location.replace('/login');
};

export default logOut;
