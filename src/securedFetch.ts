export const baseUrl = 'http://localhost:3000';

async function securedFetch(route: string, method?: string, body?: FormData) {
  try {
    const response = await fetch(baseUrl + route, {
      method,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body,
    });

    if (response.status !== 200) {
      throw new Error(`La requête a échoué : ${response}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default securedFetch;
