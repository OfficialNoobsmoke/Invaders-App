const notImplemented = () => {
  throw Error("Not implemented");
};

type ClientType = {
  call: typeof fetch;
};

export const fetcher: ClientType = {
  call: notImplemented,
};
