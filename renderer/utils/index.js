// A wrapper to SetTimeout inside useEffect() functions on Render
export async function asyncDelay(callbackFn, ms = 3000) {
  const timeout = async () => {
    return setTimeout(() => {
      callbackFn();
    }, ms);
  };
  return timeout();
}

// INTERNAL FN TO FORMAT CURRENT DATE TO A SANITIZED FORMAT
export function generateFormattedDate(date) {
  let today = null;
  if (date == null) {
    today = new Date();
  } else {
    today = new Date(date);
  }

  const YYYY = today.getFullYear();
  const MM = String(today.getMonth() + 1).padStart(2, "0");
  const DD = String(today.getDate()).padStart(2, "0");
  const hh = String(today.getHours()).padStart(2, "0");
  const mm = String(today.getMinutes()).padStart(2, "0");
  const ss = String(today.getSeconds()).padStart(2, "0");
  const formattedDate = `${YYYY}-${MM}-${DD}--${hh}:${mm}:${ss}`;

  return formattedDate;
}

// Sanitize version information
export function sanitizeVersion(version){
  

}
