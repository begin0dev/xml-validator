// TODO: Add tests that you find necessary.

const { getDepth, checkedRules } = require("../src");

describe("checked depth function test", () => {
  it("should be return data equal 1", () => {
    expect(getDepth({a: ''})).toEqual(1);
  });
  it("should be return data equal 1 where multi keys", () => {
    expect(getDepth({a: '', b: ''})).toEqual(1);
  });
  it("should be return data equal 2", () => {
    expect(getDepth({a: {b: ''}})).toEqual(2);
  });
});

describe("checkedRules function test", () => {
  it("depth 1, key 1, should be return data equal false", () => {
    expect(checkedRules({a: ''})).toBeFalsy();
  });
  it("depth 1, key 1, value is array, should be return data equal true", () => {
    expect(checkedRules({a: []})).toBeTruthy();
  });
  it("depth 2, duplicate is not, should be return data equal false", () => {
    expect(checkedRules({a: {b: ''}})).toBeFalsy();
  });
  it("depth 2, duplicate, should be return data equal false", () => {
    expect(checkedRules({a: {a: ''}})).toBeTruthy();
  });
});
