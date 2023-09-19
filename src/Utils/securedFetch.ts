export const baseUrl = 'http://localhost:3000';

// This allows to fetch the API while providing the JWT in the headers
async function securedFetch(route: string, method?: string, body?: FormData) {
  const response = await fetch(baseUrl + route, {
    method,
    credentials: 'include', // Include the jwt cookie
    ...(method && method !== 'GET' && { body }), // We provide a body only if the user provided a method parameter, and if it is not equal to GET
  });

  const data = await response.json();

  // If the API replies with invalid token or non existent token
  if (JSON.stringify(data).toLowerCase().includes('token')) {
    localStorage.clear();
    await securedFetch('/logout');
    window.location.href = '/login';
  }

  // If request failed
  // if (response.status > 299 || response.status < 200) {
  // }

  const returnedData = { status: response.status, data };

  return returnedData;
}

export default securedFetch;
