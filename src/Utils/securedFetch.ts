const baseUrl = 'http://localhost:3000';

// This allows to fetch the API while providing the JWT
async function securedFetch(route: string, method?: string, body?: FormData) {
  let failed = false;
  try {
    const response = await fetch(baseUrl + route, {
      method,
      credentials: 'include', // Include the jwt cookie
      ...(method && method !== 'GET' && { body }), // We provide a body only if the user provided a method parameter, and if it is not equal to GET
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
