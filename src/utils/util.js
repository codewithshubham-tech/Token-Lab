// numMap for decoding

import charMap from "../data/data.js";
export const numMap = Object.entries(charMap).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {});

// encoding function

export function encodeString(str) {
  return str.split("").map(c => charMap[c] || -1);
};

// decoding function


export function decodeString(arr) {
  if (!Array.isArray(arr)) return "";
  return arr.map(num => numMap[num] ?? "?").join("");
}

// copytoClipboard function

export async function copyToClipboard(text) {
  if (!text) return { success: false, message: "Nothing to copy" };
  try {
    await navigator.clipboard.writeText(text);
    return { success: true, message: "Copied"  };
  } catch (err) {
    return { success: false, message: "Failed to copy" };
  }
}


export default { encodeString, decodeString, numMap, copyToClipboard }
