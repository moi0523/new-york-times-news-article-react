const getData = (endpoint: string) => {
  return fetch(endpoint)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .catch((err) => {
      throw new Error(`There was the following problem: ${err} while fetching ${endpoint}`);
    });
};

export { getData };
