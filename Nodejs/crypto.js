// In Node.js, the crypto module is a built-in module used for 
// cryptography, which means it helps you do secure operations 
// with data like:

// Encrypting data 🔐
// Hashing passwords 🔑
// Generating random secure values 🎲
// Creating digital signatures ✍️


const crypto = require("crypto");

// 1. Hashing

const hash = crypto.createHash("sha256");

// hash.update("password");
// hash.update("123");
// Node treats it as:
// "password123"


hash.update("password123");

// hash.update()	Adds data to be hashed
// hash.digest()	Produces final hash output

console.log(hash.digest("hex")); // if dont give hex, then raw binary data like <Buffer ef 92 b7....

// In Node.js:
// The hash result is raw binary data (0s and 1s)
// But Node cannot print raw binary directly in a readable way
// So it displays it as a Buffer object in hexadecimal preview form


// 2. Random secure values
// Used for tokens, OTPs, session IDs.

console.log(crypto.randomBytes(16).toString("hex"));


// What is hashing?

// Hashing is a process that converts any input data (like a password,
//  text, file, etc.) into a fixed-length string of characters, called
//  a hash.

// Key properties of hashing
// One-way process
// You can create a hash from data
// But you cannot reverse it back to original data
// Same input → same output
// "password123" will always produce the same hash (with same algorithm)
// Even small change = completely different hash
// "password123" ≠ "Password123"
// Fixed length output
// SHA-256 always produces a 256-bit hash (64 hex characters)