var CryptoJS = require("crypto-js");
export function save(key, value) {
  return new Promise((resolve, reject) => {
    try {
      var data = {
        value,
      };
      let data2 = CryptoJS.AES.encrypt(JSON.stringify(data), "ISOFHCARE");
      localStorage.setItem(key, data2.toString());
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}
export function read(key, defaultValue) {
  if (localStorage.hasOwnProperty(key)) {
    let itemGet = localStorage.getItem(key);
    var item = CryptoJS.AES.decrypt(itemGet, "ISOFHCARE").toString(
      CryptoJS.enc.Utf8
    );
    if (item)
      try {
        var data = JSON.parse(item);
        if (data && data.value) {
          return data.value;
        }
      } catch (error) {}
  }
  return defaultValue;
}
