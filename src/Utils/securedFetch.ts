export const baseUrl = 'http://localhost:3000';

// This allows to fetch the API while providing the JWT in the headers
async function securedFetch(route: string, method?: string, body?: FormData) {
  const tokenAuthorization = `Bearer ${localStorage
    .getItem('token')
    ?.replace(/^"(.*)"$/, '$1')}`;

  const response = await fetch(baseUrl + route, {
    method,
    headers: {
      authorization: tokenAuthorization,
    },
    ...(method && method !== 'GET' && { body }), // We provide a body only if the user provided a method parameter, and if it is not equal to GET
  });

  const data = await response.json();

  const returnedData = { status: response.status, data };

  return returnedData;
}

export default securedFetch;
