import axios from "axios";

const baseUrl = "http://localhost:8080";

const postData = (payload) => {
  const url = `${baseUrl}/calc`;
  return axios
    .post(url, payload)
    .then(() => {
      console.log("Success");
    })
    .catch((err) => console.log(err));
};

const combinedWith = (a, b) => {
  return a * b;
};

const either = (a, b) => {
  const combinedResult = combinedWith(a, b);
  if (combinedResult === 0) {
    throw Error("Can not divide by zero!");
  }
  return a + b - combinedResult;
};

export { postData, combinedWith, either };
