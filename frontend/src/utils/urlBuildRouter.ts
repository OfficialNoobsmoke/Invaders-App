export class RouteBuilder {
  private routeUrl: string;
  public static baseUrl: string = `${import.meta.env.REACT_APP_API_BASE_URL}`;

  constructor() {
    this.routeUrl = `${import.meta.env.REACT_APP_API_BASE_URL}`;
  }

  public addRoute = (route: string) => {
    this.routeUrl = `${this.routeUrl}${route}`;
    return this;
  };

  public addPaginationQueryParameters = (page: number, limit: number) => {
    this.routeUrl = `${this.routeUrl}?page=${page}&limit=${limit}`;
    return this;
  };

  public addQueryParameter = (key: string, value: string) => {
    this.routeUrl = `${this.routeUrl}?${key}=${value}`;
    return this;
  };

  public addParameter = (param: string) => {
    this.routeUrl = `${this.routeUrl}/${param}`;
    return this;
  };

  public addOptionalParameter = (param: string | undefined | null) => {
    if (!param) return this;
    this.routeUrl = `${this.routeUrl}/${param}`;
    return this;
  };

  public build = () => this.routeUrl;
}
