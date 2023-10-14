const EXP_DAYS = 30;
const EXP_HOURS = 24;
const EXP_MINUTES = 60;
const EXP_SECONDS = 60;
const EXP_MILLISECONDS = 1000;

export const setCookie = (cname: string, cvalue: string) => {
  const d = new Date();
  d.setTime(d.getTime() + (EXP_DAYS * EXP_HOURS * EXP_MINUTES * EXP_SECONDS * EXP_MILLISECONDS));
  let expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export const getCookie = (cname: string) => {
  let name = `${cname}=`;
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const checkCookie = (cname: string) => {
  let user = getCookie(cname);
  if (user != "") {
    return user;
  } else {
   return null;
  }
}