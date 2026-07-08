export function idUpdates() {
  let id = 0;

  return function () {
    id++;
    // Generates a random integer between 100 and 999
    const randomNum = Math.floor(100 + Math.random() * 900); 
    
    return `Student${id}${randomNum}`;
  };
}