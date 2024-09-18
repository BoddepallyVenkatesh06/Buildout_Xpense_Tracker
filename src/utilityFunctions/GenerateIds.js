// Function to generate a unique ID
function generateUniqueID() {
  // Define the set of characters for the ID
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Initialize an empty string to store the ID
  let id = "";

  // Loop to generate a random ID with 6 characters
  for (let i = 0; i < 6; i++) {
    // Append a random character from the set to the ID
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Return the generated unique ID
  return id;
}

// Export the function to be used in other modules
export default generateUniqueID;
