const baseUrl = 'http://localhost:3000';

async function securedFetch(
  route: string,
  method?: string,
  body?: Record<string, string | number>
) {
  let failed = false;
  try {
    const response = await fetch(baseUrl + route, {
      method,
      headers: {
        // Tell the API that the data sent will be JSON
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include the jwt cookie
      ...(method && method !== 'GET' && { body: JSON.stringify(body) }), // A body is provided only if the user provided a method parameter, and if it is not equal to GET
    });

    const data = await response.json();

    // If request failed
    if (!response.ok) {
      failed = true;
      // If the API replies with invalid token or non existent token
      if (JSON.stringify(data).toLowerCase().includes('token')) {
        if (response.status === 403) {
          // If token is invalid, use the backend route to remove the cookie
          await securedFetch('/logout');
        }
        // Remove the localStorage and redirect to login page
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return { data, failed };
  } catch (error) {
    // If there is server error
    failed = true;
    return { failed };
  }
}

export default securedFetch;
