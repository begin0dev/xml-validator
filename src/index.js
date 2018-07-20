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

const parse = require('xml-parser');
const fastXmlParser = require('fast-xml-parser');

const getDepth = obj => {
  if (obj.children.length === 0) return 0;
  let depth = 1;
  obj.children.forEach(child => {
    if (child.children.length > 0) depth += getDepth(child);
  });
  return depth;
};

const checkedDuplicate = obj => {
  const { name, children } = obj;
  let result = false;
  if (children.length === 0) return false;
  // children 의 name 과 비교 후 동일한 children 있는지 확인
  if (children.filter(child => child.name === name).length > 0) return true;
  // 동일 depth 에서 바로 앞에 위치한 name 과 비교 children 이 있는 경우 재귀로 다시 호출 확인
  children.forEach((child, i) => {
    if (i !== 0 && children[i - 1].name === child.name) result = true;
    if (child.children.length > 0) {
      result = result || checkedDuplicate(child)
    }
  });
  return result;
};

// parsing result
// {
//   declaration: undefined,
//   root: {
//     name: 'ㄱ',
//     attributes: {},
//     children: [
//       { name: 'a', attributes: {}, children: [], content: '' },
//       { name: 'b', attributes: {}, children: [], content: '' },
//       { name: 'a', attributes: {}, children: [], content: '' }
//     ],
//     content: ''
//   }
// }
const isValidXML = xmlString => {
  if (xmlString.length === 0) {
    return false;
  } else if (fastXmlParser.validate(xmlString) !== true) {
    return false;
  }
  // 임시 root tag 를 추가 한 뒤 파싱 - root object 에는 같은 depth 에도 처음 tag 하나만 root 로 나타남
  xmlString = `<root>${xmlString}</root>`;
  const { root } = parse(xmlString);

  if (getDepth(root) > 2) {
    return false;
  } else if (checkedDuplicate(root)) {
    return false;
  }
  return true;
};

module.exports = {
  getDepth,
  checkedDuplicate,
  isValidXML
};
