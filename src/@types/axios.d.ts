type DataResponse = {
  statusCode: number;
  message: string;
};

type Response = {
  status: number;
  statusText: string;
};

type APIError = {
  response: Response & { data: DataResponse };
};

export { APIError };
