/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/

const fastXmlParser = require('fast-xml-parser');

const getDepth = obj => {
  let depth = 1;
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
      depth += getDepth(obj[key]);
    }
  }
  return depth;
};

const checkedRules = obj => {
  let result = false;
  for (let key in obj) {
    if (!obj.hasOwnProperty(key) || typeof obj[key] !== 'object') continue;
    if (Array.isArray(obj[key])) {
      result = true;
    } else if (Object.keys(obj[key]).indexOf(key) !== -1) {
      result = true;
    } else {
      checkedRules(obj[key]);
    }
  }
  return result;
};

const isValidXML = xmlString => {
  if (xmlString.length === 0) {
    return false;
  } else if (fastXmlParser.validate(xmlString) !== true) {
    return false;
  }
  // parsing result
  // <a></a><b></b> 의 경우 {a: '', b: ''}
  // <a></a><a></a> 의 경우 {a: ['', '']}
  const parseObj = fastXmlParser.parse(xmlString);
  if (getDepth(parseObj) > 2) {
    return false;
  } else if (checkedRules(parseObj)) {
    return false;
  }
  return true;
};

module.exports = {
  getDepth,
  checkedRules,
  isValidXML
};
