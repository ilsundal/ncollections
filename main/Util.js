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

// Implementation note: Works for the both arrays and objects because array keys are indexes (and thus order matters) and object keys are property names (and thus order does not matter).
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

function hashCode(obj, options={}) {
  let ignore_object_key_order = (typeof options.ignore_object_key_order == 'boolean') ? options.ignore_object_key_order : false;
  if (obj == null)
    return 0;
  if (typeof obj == 'object') {
    let keys = Object.keys(obj);
    let hash = 17;
    for (let key of keys) {
      if (ignore_object_key_order) {
        hash = hash + 23 + hashCode(obj[key], options);
      } else {
        hash = hash * 23 + hashCode(obj[key], options);
      }
    }
    hash |= 0; // Convert to 32bit integer
    return hash;
  }
  let str = toString(obj);
  let hash = 0;
  if (str.length == 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    let chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
  }
  hash |= 0; // Convert to 32bit integer
  return hash;
}

function isSubClassOf(subClass, parentClass) {
  return subClass.prototype instanceof parentClass || (subClass === parentClass);
}

// returns an iterator of the native map where keys are hash codes and values are array lists of elements
function mapIterator(map) {
  let key_iterator = map.keys();
  let current_key = null;
  let current_key_values = null;
  let current_key_values_index = null;
  return {
    next: function() {
      if ((current_key_values == null) || (current_key_values_index >= current_key_values.size())) {
        // move current_key to next (hash code) key
        let key_iterator_next = key_iterator.next();
        if (key_iterator_next.done) {
          return { done: true };
        }
        current_key = key_iterator_next.value;
        current_key_values = map.get(current_key);
        current_key_values_index = 0;
      }
      let value = current_key_values.getAt(current_key_values_index);
      current_key_values_index++;
      return { value: value, done: false };
    }
  }
}

function toString(obj) {
  if (obj == null)
    return null;
  if ((typeof obj == 'object') && (obj.toString == 'function'))
    return obj.toString();
  return JSON.stringify(obj);
}

module.exports = {
  compare: compare,
  equals: equals,
  hashCode: hashCode,
  isSubClassOf: isSubClassOf,
  mapIterator: mapIterator,
  toString: toString
};
