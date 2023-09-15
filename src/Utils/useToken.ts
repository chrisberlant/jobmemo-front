const useToken = () => {
  if (
    document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('jobmemo_token='))
  ) {
    console.log('Cookie existant');
    return true;
  }
  console.log('Cookie inexistant');
  return false;
};

export default useToken;
