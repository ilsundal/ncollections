'use strict'

const Collections = require(__dirname + '/../index.js');

class Person {
  name;
  age;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

let index_set = new Collections.newIndexSet();
index_set.addIndex(['name']); // adds an index on the (person) "name" property
index_set.addAll([
  new Person('Morten', 48),
  new Person('Morten', 45),
  new Person('Maximillian', 17)
]);

let all_named_morten = index_set.findAll({ name: 'Morten' }); // uses the added "name" index to quickly find both "Morten"s
console.log(all_named_morten.toString()); // outputs {{"name":"Morten","age":48},{"name":"Morten","age":45}}
console.log(index_set.examine({ name: 'Morten' })); // outputs { chosen_index: [ 'name' ], scan_count: 0, match_count: 2 }

let all_aged_48 = index_set.findAll({ age: 17 }); // no "age" index so scans all elements for a match
console.log(all_aged_48.toString()); // outputs {{"name":"Maximillian","age":17}}
console.log(index_set.examine({ age: 17 })); // { chosen_index: null, scan_count: 3, match_count: 1 }

let one_named_morten = index_set.findOne({ name: 'Morten', age: 48 }); // uses the added "name" index to find both "Morten"s then scans those for a single match
console.log(one_named_morten); // outputs Person { name: 'Morten', age: 48 }
console.log(index_set.examine({ name: 'Morten', age: 48 })); // outputs { chosen_index: [ 'name' ], scan_count: 2, match_count: 1 }

