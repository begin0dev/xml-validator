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

exports.isValidXML = xmlString => {
  if (xmlString.length === 0) {
    return false;
  }
  let arr = xmlString.match(/<(.+?)>/gi);
  let result = false;

  arr.forEach(xml => {
    if (!/^<\S>|^<\/\S>|^<\S\/>|^<\S \/>/.test(xml)) result = true
  });
  if (result) return false;

  const newArr = arr.reduce((acc, cur) => {
    const str = cur.replace(/[<|\/|>]/gi, '');
    return [...acc, str]
  }, []);
  if (newArr.filter((item, pos) => newArr.indexOf(item) === pos).length > 2) return false;
  return true;
};
