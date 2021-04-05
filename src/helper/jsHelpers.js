import jsSHA from 'jssha';

const getHash = (userInput) => {
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(userInput); // Generate hashed string based on SHA object.

  return shaObj.getHash('HEX');
};

export { getHash };
