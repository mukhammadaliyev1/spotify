async function getToken() {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(
            'a444201d05e740a98b8a2813ad984da1' +
              ':' +
              'd3b39c0ae97744099428cd9ddeb3930c'
          )}`,
        },
        body: 'grant_type=client_credentials',
      });
  
      const auth = await response.json();
      console.log(17, auth);
      localStorage.setItem('token', `${auth.token_type} ${auth.access_token}`);
    } catch (error) {
      console.log(error);
    }
  }
  
  export { getToken };
  