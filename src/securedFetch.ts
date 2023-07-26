export const baseUrl = 'http://localhost:3000';

async function securedFetch(route: string, method?: string, body?: FormData) {
  const tokenAuthorization = `Bearer ${localStorage
    .getItem('token')
    ?.replace(/^"(.*)"$/, '$1')}`;
  const response = await fetch(baseUrl + route, {
    method,
    headers: {
      authorization: tokenAuthorization,
    },
    body,
  });

  const data = await response.json();

  const returnedData = { status: response.status, data };

  return returnedData;
}

export default securedFetch;
