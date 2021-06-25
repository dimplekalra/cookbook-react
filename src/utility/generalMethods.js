import Noty from "noty";
import Data from "../import-data/data";
import auth from "../config/auth";

export const userKey = auth.userKey;

export const IsLoggedIn = () => {
  return ReadLocalStorage(userKey) != undefined;
};

export const SetLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const RemoveFromLocalStorage = (key) => [localStorage.removeItem(key)];

export const ReadLocalStorage = (key) => {
  let result = localStorage.getItem(key);
  if (result == undefined || result == null) {
    return undefined;
  } else {
    return result;
  }
};

export const NotificationHandler = (notyType, message) => {
  const notification = new Noty({
    type: notyType,
    // layout: "topCenter",
    text: `<h2 style = "text-align:center" >${message}</h2>`,
    timeout: 2000,
  });
  notification.show();
};

export const getAllData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(Data));
  });
};

export const ValueFromUserData = (key) => {
  let userData = ReadLocalStorage(userKey);

  if (userData) {
    userData = JSON.parse(userData);
    return userData[key];
  }

  return "";
};

export const LoginUser = (cred) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!cred) {
        return reject({
          data: null,
          message: "Invalid User",
        });
      }

      const token = Math.random() * 10000;

      cred = {
        ...cred,
        token,
      };

      SetLocalStorage(userKey, JSON.stringify(cred));

      return resolve({
        data: cred,
        message: "Successful",
      });
    });
  }, 1000);
};

export const getCred = () => {
  let user = ReadLocalStorage(userKey);
  user = JSON.parse(user);
  return { email: user.email, token: user.token };
};

export const SignOut = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(RemoveFromLocalStorage(userKey));
    }, 1000);
  });
};
