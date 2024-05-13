import crypto from "crypto";
function generateToken() {
  const randomBytes = crypto.randomBytes(128);

  const token = randomBytes.toString("hex");

  return token.slice(0, 16);
}

console.log(generateToken());
