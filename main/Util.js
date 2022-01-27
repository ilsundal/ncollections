'use strict'

/*
  Returns one of three values:
    A value less than 0 if obj1 is less than obj2
    0 if the two elements are equal (should be consistent with the equals method)
    A values greather than 1 if obj1 is greater than obj2
*/
function compare(obj1, obj2) {
  if ((obj1 == null) && (obj2 == null))
    return 0;
  if ((obj1 == null) || (obj2 == null))
    throw new Error('null value');
  if ((typeof obj1 == 'number') && (typeof obj2 == 'number'))
    return obj1 - obj2;
  if ((typeof obj1 == 'string') && (typeof obj2 == 'string'))
    return obj1.localeCompare(obj2);
  if (equals(obj1, obj2))
    return 0;
  return toString(obj1).localeCompare(toString(obj2));
}

function equals(obj1, obj2) {
  if (obj1 === obj2)
    return true;
  if ((typeof obj1 == 'object') && (typeof obj2 == 'object')) {
    let obj1_keys = Object.keys(obj1);
    let obj2_keys = Object.keys(obj2);
    if (obj1_keys.length != obj2_keys.length)
      return false;
    for (let key of obj1_keys) {
      if (!equals(obj1[key], obj2[key]))
        return false;
    }
    return true;
  }
  return false;
}

function hashCode(obj) {
  if (obj == null)
    return 0;
  if (typeof obj == 'object') {
    let keys = Object.keys(obj);
    let hash = 17;
    for (let key of keys) {
      hash = hash * 23 + hashCode(obj[key]);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
  let str = toString(obj);
  let hash = 0;
  if (str.length == 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    let chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function isSubClassOf(subClass, parentClass) {
  return subClass.prototype instanceof parentClass || (subClass === parentClass);
}

function toString(obj) {
  if (obj == null)
    return null;
  if (typeof obj == 'string')
    return obj;
  if ((typeof obj == 'object') && (obj.toString == 'function'))
    return obj.toString();
  return JSON.stringify(obj);
}

module.exports = {
  compare: compare,
  equals: equals,
  hashCode: hashCode,
  isSubClassOf: isSubClassOf,
  toString: toString
};
