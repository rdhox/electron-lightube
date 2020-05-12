import { toast } from 'react-toastify';

export interface ResponseToModel<T> {
  error: boolean,
  message: string,
  data?: T;
}


export async function request<T>(
  endPoint: string,
  method: string = 'GET',
  body: any = false,
  baseUrl: string,
  errorMessage?: string
): Promise<ResponseToModel<T>> {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  };

  if (body) {
    if (method === 'GET') {
      const query = body;
      endPoint = `${endPoint}/${query}`;
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
      return response.json();
    } else {
      throw response.statusText;
    }
  })
  .then(data => {
      return ({
          error: false,
          message: '',
          data
      });
    })
  .catch((error: string) => {
    if(errorMessage) {
      toast.error(errorMessage, {autoClose: 2000})
    } else {
      toast.error(error, {autoClose: 2000});
    }
    return ({
      error: true,
      message: error,
    });
  });
}
