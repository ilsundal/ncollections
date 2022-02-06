'use strict'

const assert = require('assert');

const HashSet = require(__dirname + '/../main/HashSet.js');
const IndexSet = require(__dirname + '/../main/IndexSet.js');
const Util = require(__dirname + '/../main/Util.js');

const SetTest = require(__dirname + '/SetTest.js');

class IndexSetTest extends SetTest {

  class_method_names = this.class_method_names.concat([
    'addIndex',
    'examine',
    'findAll',
    'findOne',
    'indexes'
  ]);

  constructor(options={}) {
    super(IndexSet, options);
  }
  
  test_addIndex(test) {
    it('{}[] + ["name"] -> ["name"] & [["name"]]', function() {
      let index_set = test.newInstance();
      assert(Util.equals(index_set.addIndex(['name']), ['name']));
      assert(Util.equals(index_set.indexes, [['name']]));
    });
    it('{}[] + ["name","name","age"] -> ["age","name"] & [["age","name"]]', function() {
      let index_set = test.newInstance();
      assert(Util.equals(index_set.addIndex(['name', 'name', 'age']), ['age', 'name']));
      assert(Util.equals(index_set.indexes, [['age', 'name']]));
    });
    it('{}[["name]] + ["name"] -> undefined & [["name"]]', function() {
      let index_set = test.newInstance();
      index_set.addIndex(['name']);
      assert(index_set.addIndex(['name']) === undefined);
      assert(Util.equals(index_set.indexes, [['name']]));
    });
    it('{}[["name]] + ["age"] -> ["age"] & [["name"],["age"]]', function() {
      let index_set = test.newInstance();
      index_set.addIndex(['name']);
      assert(Util.equals(index_set.addIndex(['age']), ['age']));
      assert(Util.equals(index_set.indexes, [['age'],['name']]));
    });
    it('{p1,p2}[] + ["name"} -> ["name"] & [["name"]]', function() {
      let index_set = test.newInstance();
      index_set.add(new Person('name1', 11));
      index_set.add(new Person('name2', 12));
      assert(Util.equals(index_set.addIndex(['name']), ['name']));
      assert(Util.equals(index_set.indexes, [['name']]));
    });
  }

  test_examine(test) {
    let index_set;
    let p1 = new Person('name1', 11);
    let p2 = new Person('name1', 12);
    let p3 = new Person('name3', 14);
    let p4 = new Person('name4', 14);
    let p5 = new Person('name5', 15);
    beforeEach('init {p1,...,p5}...', function() {
      index_set = test.newInstance();
      index_set.addAll([p1,p2,p3,p4,p5]);
    });
    it('...[] where {name:"name1"} -> {null,5,2}', function() {
      let examine_result = index_set.examine({ name: 'name1' });
      assert(Util.equals(examine_result, { chosen_index: null, scan_count: 5, match_count: 2 }));
    });
    it('...[["name"]] where {name:"name1"} -> {["name"],0,2}', function() {
      index_set.addIndex(['name']);
      let examine_result = index_set.examine({ name: 'name1' });
      assert(Util.equals(examine_result, { chosen_index: ['name'], scan_count: 0, match_count: 2 }));
    });
    it('...[["name"],["age"]] where {name:"name5"} -> {["name"],0,1 }', function() {
      index_set.addIndex(['name']);
      let examine_result = index_set.examine({ name: 'name5' });
      assert(Util.equals(examine_result, { chosen_index: ['name'], scan_count: 0, match_count: 1 }));
    });
    it('...[["name"],["age"]] where {name:"name5",age:14} -> {["name"],1,0}', function() {
      index_set.addIndex(['name']);
      index_set.addIndex(['age']);
      let examine_result = index_set.examine({ name: 'name5', age: 14 });
      assert(Util.equals(examine_result, { chosen_index: ['name'], scan_count: 1, match_count: 0 }));
    });
    it('...[["name","age"]] where {name:"name5"} -> {null,5,1}', function() {
      index_set.addIndex(['name', 'age']);
      let examine_result = index_set.examine({ name: 'name5' });
      assert(Util.equals(examine_result, { chosen_index: null, scan_count: 5, match_count: 1 }));
    });
    it('...[["name"],["age"],["name","age"]] where {name:"name5",age:14} -> {["age","name"],0,0}', function() {
      index_set.addIndex(['name']);
      index_set.addIndex(['age']);
      index_set.addIndex(['name', 'age']);
      let examine_result = index_set.examine({ name: 'name5', age: 14 });
      assert(Util.equals(examine_result, { chosen_index: ['age', 'name'], scan_count: 0, match_count: 0 })); // should only use ['name', 'age']
    });
  }

  test_findAll(test) {
    let index_set;
    let p1 = new Person('name1', 11);
    let p2 = new Person('name1', 12);
    let p3 = new Person('name3', 14);
    let p4 = new Person('name4', 14);
    let p5 = new Person('name5', 15);
    beforeEach('init {p1,...,p5}...', function() {
      index_set = test.newInstance();
      index_set.addAll([p1,p2,p3,p4,p5]);
    });
    it('...[] where {name:"name1"} -> {p1,p2}', function() {
      let find_result = index_set.findAll({ name: 'name1' });
      let find_result_set = new HashSet();
      find_result_set.addAll(find_result);
      assert(find_result_set.size() === 2);
      assert(find_result_set.containsAll([p1,p2]));
    });
    it('...[["name"]] where {name:"name1"} -> {p1,p2}', function() {
      index_set.addIndex(['name']);
      let find_result = index_set.findAll({ name: 'name1' });
      let find_result_set = new HashSet();
      find_result_set.addAll(find_result);
      assert(find_result_set.size() === 2);
      assert(find_result_set.containsAll([p1,p2]));
    });
    it('...[["name"]] where {name:"name4"} -> {p4}', function() {
      index_set.addIndex(['name']);
      let find_result = index_set.findAll({ name: 'name4' });
      let find_result_set = new HashSet();
      find_result_set.addAll(find_result);
      assert(find_result_set.size() === 1);
      assert(find_result_set.containsAll([p4]));
    });
    it('...[["name"]] where {name:"name2"} -> {}', function() {
      index_set.addIndex(['name']);
      let find_result = index_set.findAll({ name: 'name2' });
      let find_result_set = new HashSet();
      find_result_set.addAll(find_result);
      assert(find_result_set.size() === 0);
    });
    it('...[["name"],["age"]] where {name:"name5"} -> {p5}', function() {
      index_set.addIndex(['name']);
      index_set.addIndex(['age']);
      let find_result = index_set.findAll({ name: 'name5' });
      let find_result_set = new HashSet();
      find_result_set.addAll(find_result);
      assert(find_result_set.size() === 1);
      assert(find_result_set.containsAll([p5]));
    });
    it('...[["name"],["age"]] where {name:"name5",age:14} -> {}', function() {
      index_set.addIndex(['name']);
      index_set.addIndex(['age']);
      let find_result = index_set.findAll({ name: 'name5', age: 14 });
      let find_result_set = new HashSet();
      find_result_set.addAll(find_result);
      assert(find_result_set.size() === 0);
    });
    it('...[["name"],["age"]] where {name:"name5",age:15} -> {p5}', function() {
      index_set.addIndex(['name']);
      index_set.addIndex(['age']);
      let find_result = index_set.findAll({ name: 'name5', age: 15 });
      let find_result_set = new HashSet();
      find_result_set.addAll(find_result);
      assert(find_result_set.size() === 1);
      assert(find_result_set.containsAll([p5]));
    });
    it('...[["name"],["age"]] where {age:14} -> {p3,p4}', function() {
      index_set.addIndex(['name']);
      index_set.addIndex(['age']);
      let find_result = index_set.findAll({ age: 14 });
      let find_result_set = new HashSet();
      find_result_set.addAll(find_result);
      assert(find_result_set.size() === 2);
      assert(find_result_set.containsAll([p3, p4]));
    });
    it('...[["name","age"]] where {name:"name5"} -> {p5}', function() {
      index_set.addIndex(['name', 'age']);
      let find_result = index_set.findAll({ name: 'name5' });
      let find_result_set = new HashSet();
      find_result_set.addAll(find_result);
      assert(find_result_set.size() === 1);
      assert(find_result_set.containsAll([p5]));
    });
  }

  test_findOne(test) {
    let index_set;
    let p1 = new Person('name1', 11);
    let p2 = new Person('name1', 12);
    let p3 = new Person('name3', 14);
    let p4 = new Person('name4', 14);
    let p5 = new Person('name5', 15);
    beforeEach('init {p1,...,p5}...', function() {
      index_set = test.newInstance();
      index_set.addAll([p1,p2,p3,p4,p5]);
    });
    it('...[["name"],["age"]] where {name:"name3"} -> p3', function() {
      index_set.addIndex(['name']);
      index_set.addIndex(['age']);
      let find_result = index_set.findOne({ name: 'name3' });
      assert(find_result === p3);
    });
    it('...[["name"],["age"]] where {name:"name2"} -> undefined', function() {
      index_set.addIndex(['name']);
      index_set.addIndex(['age']);
      let find_result = index_set.findOne({ name: 'name2' });
      assert(find_result === undefined);
    });
  }

  test_indexes(test) {
    it('{}[] -> []', function() {
      let index_set = test.newInstance();
      assert(Util.equals(index_set.indexes, []));
    });
    it('{}[["name"],["age"],["name","age"]] -> [["age"],["age","name"],["name"]]', function() {
      let index_set = test.newInstance();
      index_set.addIndex(['name']);
      index_set.addIndex(['age']);
      index_set.addIndex(['name', 'age']);
      assert(Util.equals(index_set.indexes, [['age','name'],['age'],['name']]));
    });
  }
}

class Person {
  name
  age
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

module.exports = IndexSetTest;
