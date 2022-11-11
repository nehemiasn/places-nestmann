const filter = (list: any[], search: string) => {
  if (search) {
    const result: any[] = list.filter((item) => {
      let itemLower = JSON.stringify(item);
      itemLower = itemLower.toLowerCase();
      const searchSplit: any[] = search.toLowerCase().split(" ");
      let validate = 0;
      searchSplit.forEach((search) => {
        if (itemLower.indexOf(search) !== -1) {
          validate += 1;
        }
      });
      return validate === searchSplit.length;
    });
    return result;
  } else {
    return list;
  }
};

const parseObj = (obj: any) => {
  const result: any = {};
  Object.keys(obj).forEach((key: any) => {
    const nan: any = Number(obj[key]);
    if (!(nan.toString() === "NaN")) {
      result[key] = Number(obj[key]);
    } else if (obj[key] === "false") {
      result[key] = false;
    } else if (obj[key] === "true") {
      result[key] = true;
    } else {
      result[key] = obj[key];
    }
  });
  return result;
};

const getParamsURL = () => {
  const params: any = {};
  const search = window.location.search.replaceAll("?", "");
  const split1 = search.split("&");

  for (const param of split1) {
    const split2 = param.split("=");
    params[split2[0]] = split2[1];
  }
  return parseObj(params);
};

const validateEmail = (email: string) => {
  if (!email) {
    return false;
  }
  const e = email.replaceAll(" ", "");
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return e ? re.test(e) : false;
};

const validatePhone = (phone: string) => {
  if (!phone) {
    return false;
  }
  const e = phone.replaceAll(" ", "");
  const re = /^[0-9]{10}$/;
  return e ? re.test(e) : false;
};

const validatePassword = (password: string) => {
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

const validatePasswordWithSpecialCharacters = (password: string) => {
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

const removeMaskPhone = (phone: string) => {
  const e = phone.replaceAll("-", "");
  return e.slice(0, 10);
};

const URLFileToBlob = async (fileURL: string): Promise<Blob | undefined> => {
  const res = await fetch(fileURL);
  if (res.ok) {
    const blob = await res.blob();
    return blob;
  }
  return undefined;
};

const URLFileToFile = async (
  fileURL: string,
  filename: string
): Promise<File | undefined> => {
  const blob = await URLFileToBlob(fileURL);
  if (blob) {
    return new File([blob], filename, {
      type: blob.type,
    });
  }
  return undefined;
};

const blobToFile = (blob: Blob, filename: string): File => {
  return new File([blob], filename, {
    type: blob.type,
  });
};

const isUpToIPhone8 = (model: string) => {
  return !![
    "iPhone3,1",
    "iPhone3,2",
    "iPhone3,3",
    "iPhone4,1",
    "iPhone5,1",
    "iPhone5,2",
    "iPhone5,3",
    "iPhone5,4",
    "iPhone6,1",
    "iPhone6,2",
    "iPhone7,2",
    "iPhone7,1",
    "iPhone8,1",
    "iPhone8,2",
    "iPhone9,1",
    "iPhone9,3",
    "iPhone9,2",
    "iPhone9,4",
    "iPhone10,1",
    "iPhone10,4",
    "iPhone10,2",
    "iPhone10,5",
  ].find((m) => m === model);
};

const srcToHTMLImageElement = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.setAttribute("crossorigin", "anonymous");
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};
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

const base64ToObjectURL = (src: string, type?: string): Promise<string> => {
  return base64ToBlob(src, type).then((blob) => URL.createObjectURL(blob));
};

export const base64ToFile = (src: string, filename: string): Promise<File> => {
  return base64ToBlob(src, filename).then((blob) => {
    return new File([blob], filename, {
      type: blob.type,
    });
  });
};

/**
 * Comprime una imagen a la calidad y resolución especifica
 * @param src
 * @param px
 * @returns Promise<HTMLCanvasElement>
 */
const compressFile = async (
  src: string,
  px?: number
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    srcToHTMLImageElement(src)
      .then((img) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        try {
          if (px) {
            if (img.height > img.width) {
              canvas.width = px < img.width ? px : img.width;
              canvas.height = (canvas.width * img.height) / img.width;
            } else {
              canvas.height = px < img.height ? px : img.height;
              canvas.width = (canvas.height * img.width) / img.height;
            }
          } else {
            canvas.height = img.height;
            canvas.width = img.width;
          }

          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
          return resolve(canvas);
        } catch (err: any) {
          return reject(err);
        }
      })
      .catch((err: any) => {
        return reject(err);
      });
  });
};

const renameFile = (file: File, name: string) => {
  const blob = file.slice(0, file.size, file.type);
  const newFile = new File([blob], name, {
    type: file.type,
  });
  return newFile;
};

const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.addEventListener("abort", () => {
      reject(undefined);
    });
    reader.addEventListener("error", () => {
      reject(undefined);
    });
    reader.readAsDataURL(file);
  });
};

const formatAmount = (
  amount: number,
  locales?: string | string[] | undefined,
  options?: Intl.NumberFormatOptions | undefined
) => {
  try {
    return new Intl.NumberFormat(locales || "es-AR", {
      minimumFractionDigits: 2,
      ...options,
    }).format(amount);
  } catch (error: any) {
    return amount;
  }
};
