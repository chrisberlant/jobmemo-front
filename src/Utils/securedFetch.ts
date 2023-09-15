export const baseUrl = 'http://localhost:3000';

// async function logOutUser() {
//   localStorage.clear();
//   await fetch(`${baseUrl}/logout`);
//   console.log('Retrait du local storage');
//   window.location.href = `${baseUrl}/login`;
// }

// This allows to fetch the API while providing the JWT in the headers
async function securedFetch(route: string, method?: string, body?: FormData) {
  const response = await fetch(baseUrl + route, {
    method,
    credentials: 'include', // Include the jwt cookie
    ...(method && method !== 'GET' && { body }), // We provide a body only if the user provided a method parameter, and if it is not equal to GET
  });

  const data = await response.json();

  // if (response.status === 403) {
  //   logOutUser();
  // }

  // if (response.status > 299 || response.status < 200) {
  //   // If request failed
  // }

  const returnedData = { status: response.status, data };

  return returnedData;
}

export default securedFetch;
