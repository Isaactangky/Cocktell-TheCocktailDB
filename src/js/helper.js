import { TIMEOUT } from "./config";

import axios from "axios";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      const error = new Error(
        `Request took too long! Timeout after ${s} second`
      );
      error.status = 408;
      reject(error);
    }, s * 1000);
  });
};

export const AJAX = async function (url, params = {}) {
  try {
    const res = await Promise.race([axios.get(url, params), timeout(TIMEOUT)]);
    const { data } = res;
    // if (res.status !== 200 || !data)
    if (res.status !== 200)
      throw new Error("Cannot find receipt, please try again");
    return data;
  } catch (err) {
    throw err;
  }
};

export const AJAXBatch = async function (url, paramsArr = [], paramsType) {
  try {
    const promises = paramsArr.map((p) =>
      axios.get(url, {
        params: paramsType ? { [paramsType]: p } : {},
      })
    );

    const response = await Promise.race([
      timeout(TIMEOUT),
      Promise.allSettled(promises),
    ]);
    // get fulfiled response and non empty data
    const dataArray = response
      .filter((res) => res.status === "fulfilled" && res.value.data !== "")
      .map((res) => res.value.data);
    return dataArray;
  } catch (err) {
    throw err;
  }
};
