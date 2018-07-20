// TODO: Add tests that you find necessary.
const { getDepth, checkedDuplicate } = require("../src");

// mock object
const rootObj = {name: "root", children: []};
const aObj = {name: "a", children: []};
const bObj = {name: "b", children: []};
const cObj = {name: "c", children: []};

describe("getDepth function test", () => {
  it('root into children length 0 return 0', () => {
    const root = {...rootObj};
    expect(getDepth(root)).toEqual(0);
  });
  it('root into children a return 1', () => {
    const root = {...rootObj, children: [{...aObj}]};
    expect(getDepth(root)).toEqual(1);
  });
  it('root into children a, b return depth equal 1', () => {
    const root = {...rootObj, children: [{...aObj}, {...bObj}]};
    expect(getDepth(root)).toEqual(1);
  });
  it('root into a and a into b return depth equal 2', () => {
    const root = {...rootObj, children: [{...aObj, children: [{...bObj}]}]};
    expect(getDepth(root)).toEqual(2);
  });
  it('root into a and a into b and b into c return depth equal 3', () => {
    const root = {...rootObj, children: [{...aObj, children: [{...bObj, children: [{...cObj}]}]}]};
    expect(getDepth(root)).toEqual(3);
  });
});

describe("checkedDuplicate function test", () => {
  it('root into a, a return true', () => {
    const root = {...rootObj, children: [aObj, aObj]};
    expect(checkedDuplicate(root)).toBeTruthy();
  });
  it('root into a and a into b return false', () => {
    const root = {...rootObj, children: [{...aObj, children: [{...bObj}]}]};
    expect(checkedDuplicate(root)).toBeFalsy();
  });
  it('root into a, b, a return false', () => {
    const root = {...rootObj, children: [aObj, bObj, aObj]};
    expect(checkedDuplicate(root)).toBeFalsy();
  });
  it('root into a and a into b, b return true', () => {
    const root = {...rootObj, children: [{...aObj, children: [bObj, bObj]}]};
    expect(checkedDuplicate(root)).toBeTruthy();
  });
  it('root into a and a into a return true', () => {
    const root = {...rootObj, children: [{...aObj, children: [aObj]}]};
    expect(checkedDuplicate(root)).toBeTruthy();
  });
});