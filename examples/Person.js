class Person {
  first_name;
  last_name;
  age;
  constructor(first_name, last_name, age) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.age = age;
  }
  equals(other_person) {
    if (this == other_person)
      return true;
    if (!(this instanceof Person))
      return false;
    return this.first_name == other_person.first_name && this.last_name == other_person.last_name;
  }
  hashCode() {
    let hash = 17;
    hash = hash * 23 + this.hashCode0(this.first_name);
    hash = hash * 23 + this.hashCode0(this.last_name);
    hash = hash * 23 + this.age;
    hash |= 0; // Convert to 32bit integer
    return hash;
  }
  hashCode0(str) {
    var hash = 0, i, chr;
    if (!str) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
    }
    hash |= 0; // Convert to 32bit integer
    return hash;
  }
}

let person1 = new Person('Morten', 'Helles', 48);
let person2 = new Person('Morten', 'Helles', 48);
let person3 = new Person('Alexander', 'Helles', 15);
let person4 = new Person('Alexander', 'Helles', 30);

console.log(person1.equals(person2)); // outputs true
console.log(person1.equals(person3)); // outputs false

console.log(person1.hashCode()); // outputs 558261857
console.log(person4.hashCode()); // outputs 1493222392

// sort by last name then first name then age
let compare_fn = function(person1, person2) {
  let compare = person1.last_name.localeCompare(person2.last_name);
  if (compare != 0) return compare;
  compare = person1.first_name.localeCompare(person2.first_name);
  if (compare != 0) return compare;
  return person1.age - person2.age;
}

let persons = [ person1, person2, person3, person4 ].sort(compare_fn);
console.log(persons); // order: person3, person4, person1, person2
