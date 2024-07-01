import { getTokenData } from "@/app/actions/authActions";

const baseUrl = "http://localhost:6001/";

async function GET(url: string) {
  const requestOptions = {
    method: "GET",
    headers: await getHeaders(),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function POST(url: string, body: object) {
  const requestOptions = {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function PUT(url: string, body: object) {
  const requestOptions = {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function DELETE(url: string) {
  const requestOptions = {
    method: "DELETE",
    headers: await getHeaders(),
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function getHeaders() {
  const token = await getTokenData();
  const headers: { "Content-Type": string; Authorization?: string } = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = "Bearer " + token.access_token;
  }
  return headers;
}

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message: response.statusText,
    };
    return { error };
  }
}

export const fetchWrapper = {
  GET,
  POST,
  PUT,
  DELETE,
};
