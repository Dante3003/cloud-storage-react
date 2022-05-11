function Axios(config) {
  this.baseUrl = config.baseUrl || "";
  this.headers = config.headers || {};
  this.requestInterceptor = null;
  this.responseInterceptor = null;
  this.errorInterceptor = null;
}

Axios.prototype.fetch = async function (url, options) {
  try {
    this.requestInterceptor && this.requestInterceptor({ url, ...options });
    const headers = {
      ...this.headers,
      ...options?.headers,
    };
    options?.body instanceof FormData && delete headers["Content-Type"];
    const body =
      headers?.["Content-Type"] === "application/json"
        ? JSON.stringify(options.body)
        : options.body;
    const result = await fetch(`${this.baseUrl}${url}`, {
      method: options?.method || "GET",
      headers: headers,
      body: body,
    });
    if (!result.ok) {
      this.errorInterceptor && this.errorInterceptor(result);
      return undefined;
    }
    this.responseInterceptor && this.responseInterceptor(result);
    return this.parseResponse(result);
  } catch (err) {
    console.error(err);
    this.errorInterceptor && this.errorInterceptor(err);
    return err;
  }
};

Axios.prototype.get = function (url, params = null, headers) {
  const queries =
    params &&
    Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
  return this.fetch(`${url}?${queries}`, { method: "GET", headers: headers });
};
Axios.prototype.post = function (url, body, headers) {
  return this.fetch(url, { method: "POST", body: body, headers });
};
Axios.prototype.put = function (url, body, headers) {
  return this.fetch(url, { method: "PUT", body, headers });
};
Axios.prototype.delete = function (url, body, headers) {
  return this.fetch(url, { method: "DELETE", body, headers });
};
Axios.prototype.setHeaders = function (headers) {
  this.headers = {
    ...this.headers,
    ...headers,
  };
};
Axios.prototype.parseResponse = async function (response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return response;
};

export default Axios;
