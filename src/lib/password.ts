import bcrypt from "bcryptjs";
import { isEmpty } from "lodash";
import { AppError } from "../common/common.interface";

async function compare(plain: string, hash: string) {
  return await bcrypt.compare(plain, hash);
}

function isStrong(password: string): boolean {
  const minLength = 6;
  const minUppercase = 1;
  const minLowercase = 1;
  const minNumbers = 1;
  const minSpecialChars = 1;
  const specialChars = "[!@#$%^&*(),.?:{}|<>]";
  const specialCharsRegex = /[!@#$%^&*(),.?:{}|<>]/;

  const errors: Record<string, string> = {};

  if (password.length < minLength) {
    errors["length"] = `Must be at least ${minLength} characters long`;
  }

  if (!password.match(/[A-Z]/g)) {
    errors[
      "uppercase"
    ] = `Must contain at least ${minUppercase} uppercase letter`;
  }

  if (!password.match(/[a-z]/g)) {
    errors[
      "lowercase"
    ] = `Must contain at least ${minLowercase} lowercase letter`;
  }

  if (!password.match(/[0-9]/g)) {
    errors["numbers"] = `Must contain at least ${minNumbers} digit`;
  }

  if (!password.match(specialCharsRegex)) {
    errors[
      "characters"
    ] = `Must contain at least ${minSpecialChars} one of (${specialChars})`;
  }

  if (!isEmpty(errors))
    throw new AppError(`Weak Password:${Object.values(errors)[0]}`, {
      status: 400,
    });
  return true;
}

async function hash(plain: string, salt = 12) {
  return await bcrypt.hash(plain, salt);
}

function generate(length = 8): string {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*(),.?:{}|<>";

  let password = "";

  // Ensure at least one character from each required set
  password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  password += numberChars[Math.floor(Math.random() * numberChars.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the rest of the password length with random characters
  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
  while (password.length < length) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to ensure randomness
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return isStrong(password) ? password : generate(length);
}

const passwordLib = {
  isStrong,
  compare,
  hash,
  generate,
};

export default passwordLib;
