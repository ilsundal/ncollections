'use strict'

const Collections = require(__dirname + '/../index.js');

class Person {
  name;
  age;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  equals(obj) {
    if (this == obj)
      return true;
    if (!(obj instanceof Person))
      return false;
    return this.name == obj.name && this.age == obj.age;
  }
  hashCode() {
    let hash = 17;
    hash = hash * 23 + this.#hashCodeFromString(this.name);
    hash = hash * 23 + this.age;
    hash |= 0; // Convert to 32bit integer
    return hash;
  }
  #hashCodeFromString(str) { // should be in a utility module for re-use purposes
    let hash = 0, i, chr;
    if (!str) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
    }
    hash |= 0; // Convert to 32bit integer
    return hash;
  }
}

let person1 = new Person('Morten', 48);
let person2 = new Person('Morten', 48);
let person3 = new Person('Alexander', 15);
let person4 = new Person('Alexander', 30);

console.log(person1.equals(person2)); // outputs true
console.log(person1.equals(person3)); // outputs false

console.log(person1.hashCode()); // outputs 1601127516
console.log(person4.hashCode()); // outputs -1159287671

// sort by name then age
let compare_fn = function(person1, person2) {
  let compare = person1.name.localeCompare(person2.name);
  if (compare != 0) return compare;
  return person1.age - person2.age;
}

let persons = Collections.newArrayList().addAll([ person1, person2, person3, person4 ]).sort(compare_fn);
console.log(persons.toString()); // outputs [{"name":"Alexander","age":15},{"name":"Alexander","age":30},{"name":"Morten","age":48},{"name":"Morten","age":48}]
