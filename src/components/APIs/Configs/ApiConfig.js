export async function callApi(url, method, body) {
  const response = await fetch(url, {
    method: method,
    body: body,
  });

  const data = await response.json();

  return data;
}
