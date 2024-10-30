import { savePassword, getLastPassword } from "./storage.js";
import { generatorPassword } from "./passwordGenerator.js";

const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const urlEl = document.getElementById("url");
const strengthIndicator = document.getElementById("strength-indicator");

generateBtn.addEventListener("click", () => {
  const length = parseInt(lengthEl.value);
  const url = urlEl.value;
  const password = generatorPassword(length);
  passwordEl.value = password;
  savePassword(password, url);
  updateStrengthIndicator(password); // Check the password strength
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard
    .writeText(passwordEl.value)
    .then(() => {
      alert("Password copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text", err);
    });
});

window.addEventListener("load", () => {
  const lastPassword = getLastPassword();
  if (lastPassword) {
    passwordEl.value = lastPassword.password;
    urlEl.value = lastPassword.url || "";
    updateStrengthIndicator(lastPassword.password); // Update strength indicator for last password
  }
});

function updateStrengthIndicator(password) {
  let strength = "weak";
  if (
    password.length >= 12 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password)
  ) {
    strength = "strong";
  } else if (password.length >= 8) {
    strength = "medium";
  }

  strengthIndicator.className = strength;
  strengthIndicator.style.backgroundColor = getStrengthColor(strength);
}

function getStrengthColor(strength) {
  switch (strength) {
    case "strong":
      return "green";
    case "medium":
      return "yellow";
    case "weak":
    default:
      return "red";
  }
}
