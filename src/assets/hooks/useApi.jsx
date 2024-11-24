import axios from "axios";
//import crypto from "crypto";
import { useEffect, useState } from "react";

export const useApi = (url, options) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const endPoint = import.meta.env.VITE_API_ENDPOINT;
  const authKey = import.meta.env.VITE_API_AUTH_KEY;
  const secretKey = import.meta.env.VITE_API_SECRET_KEY;
  const userAgent = import.meta.env.VITE_API_USER_AGENT;

  var apiHeaderTime = Math.floor(Date.now() / 1000); //console.log(`apiHeaderTime=[${apiHeaderTime}]`);
  var sha1Algorithm = "sha1";
  var sha1Hash = crypto.hash(sha1Algorithm);
  var data4Hash = authKey + secretKey + apiHeaderTime;
  sha1Hash.update(data4Hash);
  var hash4Header = sha1Hash.digest("hex");
  console.log(`hash4Header=[${hash4Header}]`);
  console.log(
    endPoint,
    authKey,
    secretKey,
    userAgent,
    apiHeaderTime,
    hash4Header
  );

  const headers = {
    "User-Agent": userAgent,
    "X-Auth-Key": authKey,
    "X-Auth-Date": apiHeaderTime.toString(),
    Authorization: hash4Header,
  };

  if (options && options.headers) {
    options.headers = [...options.headers, ...headers];
  } else {
    options = {
      headers,
    };
  }
  console.log(options);
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios(endPoint + url, options);
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  /* useEffect(() => {
    fetchData();
  }, []); */

  return { data, isLoading, error, fetchData };
};
