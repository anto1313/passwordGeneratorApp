export function savePassword(password, url) {
  localStorage.setItem(
    "lastGeneratedPassword",
    JSON.stringify({
      password,
      url,
    })
  );
}

export function getLastPassword() {
  const storePassword = localStorage.getItem("lastGeneratedPassword");
  return storePassword ? JSON.parse(storePassword) : null;
}
