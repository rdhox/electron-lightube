export async function request(
  endPoint: string,
  method: string = 'GET',
  body: any = false,
  baseUrl: string,
) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  };

  if (body) {
    if (method === 'GET') {
      const query = body;
      endPoint = `${endPoint}?${query}`;
      body = false;
    } else {
      body = JSON.stringify(body);
    }
  }

  return fetch(baseUrl + endPoint, {
    method,
    body: body || undefined,
    headers,
  }).then(response => {
    if (response.status === 200) {
      return response
        .json()
        .then(json => {
          return json !== undefined ? json : {};
        })
        .catch(e => ({}));
    }
    return response.status;
  })
  .catch(e => console.error(e));
}
