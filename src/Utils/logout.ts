import securedFetch from './securedFetch';

const logOut = async () => {
  localStorage.clear(); // Clear the localStorage
  await securedFetch('/logout'); // Fetch the logout route to remove the cookie
  window.location.replace('/login'); // Redirect user to login page
};

export default logOut;
