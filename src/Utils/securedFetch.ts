const baseUrl = 'http://localhost:3000';

async function securedFetch(
  route: string,
  method?: string,
  infos?: Record<string, string | File>
) {
  let failed = false;

  // Create the FormData to send
  const formData = new FormData();
  if (infos) {
    Object.keys(infos).forEach((key) => {
      formData.append(key, infos[key]);
    });
  }

  try {
    const options: RequestInit = {
      method,
      credentials: 'include', // Include the jwt cookie
    };
    if (method && method !== 'GET') {
      options.body = formData; // Add a body if method is provided and it is not equal to GET
    }

    const response = await fetch(baseUrl + route, options);
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
