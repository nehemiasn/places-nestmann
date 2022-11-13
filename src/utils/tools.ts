import { ReactNativeFile } from "apollo-upload-client";
import { IS_WEB } from "../constants";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const btoa = (input: string = "") => {
  let str = input;
  let output = "";

  for (
    let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || ((map = "="), i % 1);
    output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
  ) {
    charCode = str.charCodeAt((i += 3 / 4));

    if (charCode > 0xff) {
      throw new Error(
        "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
      );
    }

    block = (block << 8) | charCode;
  }

  return output;
};

const atob = (input: string = "") => {
  let str = input.replace(/=+$/, "");
  let output = "";

  if (str.length % 4 == 1) {
    throw new Error(
      "'atob' failed: The string to be decoded is not correctly encoded."
    );
  }
  for (
    let bc = 0, bs = 0, buffer, i = 0;
    (buffer = str.charAt(i++));
    ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
      ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
      : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
};

const base64ToBlob = (src: string, filename?: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    try {
      // decode base64 string, remove space for IE compatibility
      const binary = atob(src.replace(/\s/g, ""));
      const len = binary.length;
      const buffer = new ArrayBuffer(len);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
      }

      // create the blob object with content-type "application/pdf"
      const blob = new Blob([view], { type: "image/jpeg" });
      resolve(blob);
    } catch (err) {
      reject(err);
    }
  });
};

export const base64ToFile = (src: string, filename: string): Promise<File> => {
  return base64ToBlob(src, filename).then((blob) => {
    return new File([blob], filename, {
      type: blob.type,
    });
  });
};

export const uriToFile = async (uri: string, name?: string) => {
  const fileName = name || new Date().getTime();
  const file = new ReactNativeFile({
    uri,
    name: `${fileName}.jpeg`,
    type: "image/jpeg",
  });
  return file;
};

export const validateEmail = (email: string) => {
  if (!email) {
    return false;
  }
  const e = email.replaceAll(" ", "");
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return e ? re.test(e) : false;
};

export const validatePhone = (phone: string) => {
  if (!phone) {
    return false;
  }
  const e = phone.replaceAll(" ", "");
  const re = /^[0-9]{10}$/;
  return e ? re.test(e) : false;
};

export const validatePassword = (password: string) => {
  if (!password) {
    return false;
  }
  const e = password;

  /**
   *  
      /^
        (?=.*\d)          // should contain at least one digit
        (?=.*[a-z])       // should contain at least one lower case
        (?=.*[A-Z])       // should contain at least one upper case
        [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
      $/
   */
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/;
  return e ? re.test(e) : false;
};

export const validatePasswordWithSpecialCharacters = (password: string) => {
  if (!password) {
    return false;
  }
  const e = password;

  // algunos caracteres especiales @ -(escapado) _ $ # % ¡ !
  const re =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@\-_$#%¡!])[0-9a-zA-Z@\-_$#%¡!]{8,16}$/;

  // todos los caracteres especiales
  // const re =
  //   /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*\W){1})\S{8,16}$/;
  return e ? re.test(e) : false;
};

export const removeMaskPhone = (phone: string) => {
  const e = phone.replaceAll("-", "");
  return e.slice(0, 10);
};
