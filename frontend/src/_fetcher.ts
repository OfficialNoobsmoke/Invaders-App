type ClientType = {
  call: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
};

export const fetcher: ClientType = {
  call: (input, init) => {
    return fetch(input, init);
  },
};