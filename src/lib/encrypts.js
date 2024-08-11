import CryptoJS from "crypto-js";

// const key = process.env.CYPRTED_PRIVATE_KEY;
const key = "U2FsdGVkX19h9WlgB2bk8q3xj6Oba96zgRvlplM2LYg=";


export const encryptID = (id) => {
  const encrypted = CryptoJS.AES.encrypt(id,key,{
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const encryptedBase64 = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  const encryptedSafe = encryptedBase64
      .replace(/\//g, "_")
      .replace(/\+/g, "-");

  return encryptedSafe;
};


export const decryptID = (encryptedID) => {
  const encryptedBase64 = encryptedID.replace(/_/g, "/").replace(/-/g, "+");
    console.log("encrypted Id ", encryptedBase64);
  const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  
  return decrypted.toString(CryptoJS.enc.Utf8);
};
