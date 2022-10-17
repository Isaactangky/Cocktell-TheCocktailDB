import { TIMEOUT, API_LINK } from "./config";

import axios from "axios";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, params = {}) {
  try {
    // axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php', {

    const res = await axios.get(url, params);
    // const res = await fetch(url);
    const { data } = res;
    // if (res.status !== 200 || !data)
    if (res.status !== 200)
      throw new Error("Cannot find receipt, please try again");
    return data;
  } catch (err) {
    throw err;
  }
};

export const AJAXBatch = async function (counts, url, params = {}) {
  try {
    const iterations = Array.from(Array(counts).keys());
    // axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php', {
    const response = await Promise.allSettled(
      iterations.map(async (_) => await axios.get(url, params))
    );
    const dataArray = response
      .filter((res) => res.status === "fulfilled")
      .map((res) => res.value.data);
    return dataArray;
  } catch (err) {
    throw err;
  }
};
// AJAX().then(() => {});
