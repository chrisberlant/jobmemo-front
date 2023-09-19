const useToken = () => {
  if (localStorage.getItem('firstName')) {
    console.log('Local existant');
    return true;
  }
  console.log('Local inexistant');
  return false;
};

export default useToken;
