'use strict'

const assert = require('assert');

const ArrayList = require(__dirname + '/../main/ArrayList.js');
const HashSet = require(__dirname + '/../main/HashSet.js');
const IllegalArgumentException = require(__dirname + '/../main/IllegalArgumentException.js');
const Map = require(__dirname + '/../main/Map.js');
const UnsupportedOperationException = require(__dirname + '/../main/UnsupportedOperationException.js');
const Util = require(__dirname + '/../main/Util.js');

const CollectionTest = require(__dirname + '/CollectionTest.js');

class MapTest extends CollectionTest {

  constructor(mapClass, options={}) {
    super(mapClass, options);
  }

  class_method_names = this.class_method_names.concat([
    'containsKey',
    'containsValue',
    'get',
    'keys',
    'put',
    'putAll',
    'remove',
    'removeAll',
    'values'
  ]);

  newInstance(entries=[]) {
    let map = new this.collection_class(this.options);
    for (let entry of entries)
      map.put(entry.key, entry.value);
    return map;
  }

  test_constructor(test) {
    it('() -> instance', function() {
      let set = test.newInstance();
      assert(set instanceof test.collection_class);
    });
  }

  test_clear(test) {
    it('{1->2} -> {}', function() {
      let map = test.newInstance();
      map.clear();
      assert(map.isEmpty());
    });
  }

  test_clone(test) {
    it('{1->2,3->4} -> {1->2,3->4}', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      let clone = map.clone();
      assert(map.equals(clone));
    });
  }

  test_containsKey(test) {
    it('{1->2} contains undefined -> IllegalArgumentException', function() {
      let map = test.newInstance();
      let methodCall = () => map.containsKey(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{1->2} contains null -> false', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(map.containsKey(null) === false);
    });
    it('{null->2} contains null -> false', function() {
      let map = test.newInstance();
      map.put(null,2);
      assert(map.containsKey(null) === true);
    });
    it('{1->2} contains 1 -> true', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(map.containsKey(1) === true);
    });
    it('{1->2} contains 2 -> false', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(map.containsKey(2) === false);
    });
  }

  test_containsValue(test) {
    it('{1->2} contains undefined -> IllegalArgumentException', function() {
      let map = test.newInstance();
      let methodCall = () => map.containsValue(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{1->2} contains null -> false', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(map.containsValue(null) === false);
    });
    it('{1->null} contains null -> false', function() {
      let map = test.newInstance();
      map.put(1,null);
      assert(map.containsValue(null) === true);
    });
    it('{1->2} contains 2 -> true', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(map.containsValue(2));
    });
    it('{1->2} contains 1 -> false', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(map.containsValue(1) === false);
    });
  }

  test_equals(test) {
    it('{1->2,3->4} === {3->4,1->2}', function() {
      let map1 = test.newInstance();
      map1.put(1,2);
      map1.put(3,4);
      let map2 = test.newInstance();
      map2.put(3,4);
      map2.put(1,2);
      assert(map1.equals(map2));
      assert(map2.equals(map1));
    });
    it('{1->2,3->4} === {1->2,3->5}', function() {
      let map1 = test.newInstance();
      map1.put(1,2);
      map1.put(3,4);
      let map2 = test.newInstance();
      map2.put(1,2);
      map2.put(3,5);
      assert(map1.equals(map2) === false);
      assert(map2.equals(map1) === false);
    });
  }

  test_get(test) {
    it('{1->2} get undefined -> IllegalArgumentException', function() {
      let map = test.newInstance();
      let methodCall = () => map.get(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{1->2,3->4} get 1 -> 2', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      assert(map.get(1) === 2);
    });
    it('{1->2,3->4} get 5 -> undefined', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      assert(map.get(5) === undefined);
    });
  }

  test_hashCode(test) {
    it('hash code of {1->2,3->4} === hash code of {1->2,3->4}', function() {
      let map1 = test.newInstance();
      map1.put(1,2);
      map1.put(3,4);
      let map2 = test.newInstance();
      map2.put(1,2);
      map2.put(3,4);
      assert(map1.hashCode() === map2.hashCode());
    });
    it('hash code of {1->2,3->4} !== hash code of {1->2,3->5}', function() {
      let map1 = test.newInstance();
      map1.put(1,2);
      map1.put(3,4);
      let map2 = test.newInstance();
      map2.put(1,2);
      map2.put(3,5);
      assert(map1.hashCode() !== map2.hashCode());
    });
  }

  test_isEmpty(test) {
    it('{} -> true', function() {
      let map = test.newInstance();
      assert(map.isEmpty() === true);
    });
    it('{1->2} -> false', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(map.isEmpty() === false);
    });
  }

  test_keys(test) {
    it('{1->2,3->4} -> {1,3}', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      assert(Util.equals(new Array(...map.keys()).sort(), [1,3]));
    });
  }

  test_next(test) {
    it('{1->2,3->4} -> (1->2) -> (3->4)', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      let entries = new ArrayList();
      entries.addAll(map);
      assert(entries.size() === 2);
      assert(entries.contains({key:1,value:2}));
      assert(entries.contains({key:3,value:4}));
    });
  }

  test_put(test) {
    it('{} + (undefined->2) -> IllegalArgumentException', function() {
      let map = test.newInstance();
      let methodCall = () => map.put(undefined, 2);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{} + (1->undefined) -> IllegalArgumentException', function() {
      let map = test.newInstance();
      let methodCall = () => map.put(1, undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{} + (1->2) -> undefined & {1->2}', function() {
      let map = test.newInstance();
      assert(map.put(1,2) === undefined);
      assert(map.size() === 1);
      assert(map.get(1) === 2);
    });
    it('{} + (null->2) -> undefined & {null->2}', function() {
      let map = test.newInstance();
      assert(map.put(null,2) === undefined);
      assert(map.size() === 1);
      assert(map.get(null) === 2);
    });
    it('{} + (1->null) -> undefined & {1->null}', function() {
      let map = test.newInstance();
      assert(map.put(1,null) === undefined);
      assert(map.size() === 1);
      assert(map.get(1) === null);
    });
    it('{1.>2} + (1->3) -> 2 & {1->3}', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(map.put(1,3) === 2);
      assert(map.size() === 1);
      assert(map.get(1) === 3);
    });
  }

  test_putAll(test) {
    it('{} + undefined -> IllegalArgumentException', function() {
      let map = test.newInstance();
      let methodCall = () => map.putAll(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{} + [undefined] -> IllegalArgumentException', function() {
      let map = test.newInstance();
      let methodCall = () => map.putAll([undefined]);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{1->2} + [{1->3},{2->3}] -> & {1->3,2->3}', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.putAll([{key:1,value:3},{key:2,value:3}]);
      assert(map.size() === 2);
      assert(map.get(1) === 3);
      assert(map.get(2) === 3);
    });
  }

  test_remove(test) {
    it('{1->2} - undefined -> IllegalArgumentException', function() {
      let map = test.newInstance();
      map.put(1,2);
      let methodCall = () => map.remove(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{null->2} - null -> 2 & {}', function() {
      let map = test.newInstance();
      map.put(null,2);
      assert(map.remove(null) === 2);
      assert(map.size() === 0);
    });
    it('{1->2} - 2 -> undefined & {1->2}', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(map.remove(2) === undefined);
      assert(map.size() === 1);
      assert(map.get(1) === 2);
    });
    it('{1->2,2->3} - 1 -> 2 & {2->3}', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(2,3);
      assert(map.remove(1) === 2);
      assert(map.size() === 1);
      assert(map.get(2) === 3);
    });
  }

  test_removeAll(test) {
    it('{1->2} - undefined -> IllegalArgumentException', function() {
      let map = test.newInstance();
      map.put(1,2);
      let methodCall = () => map.removeAll(undefined);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{1->2} - [undefined] -> IllegalArgumentException', function() {
      let map = test.newInstance();
      map.put(1,2);
      let methodCall = () => map.removeAll([undefined]);
      assert.throws(methodCall, IllegalArgumentException);
    });
    it('{1->2,2->3,3->4} - [1,3] -> {1->2,3->4} & {2->3}', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(2,3);
      map.put(3,4);
      let removed = map.removeAll([1,3]);
      assert(removed.size() === 2);
      assert(removed.contains({key:1,value:2}));
      assert(removed.contains({key:3,value:4}));
      assert(map.size() === 1);
      assert(map.get(2) === 3);
    });
  }

  test_size(test) {
    it('{} -> 0', function() {
      let map = test.newInstance();
      assert(map.size() === 0);
    });
    it('{1->2,2->3} -> 2', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(2,3);
      assert(map.size() === 2);
    });
  }

  test_toArray(test) {
    it('{} -> []', function() {
      let map = test.newInstance();
      assert(Util.equals(map.toArray(), []));
    });
    it('{1->2} -> [{1->2}]', function() {
      let map = test.newInstance();
      map.put(1,2);
      assert(Util.equals(map.toArray(), [{key:1,value:2}]));
    });
    it('{1->2,3->4} -> an array containing (1->2) and (3->4)', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(3,4);
      let array = map.toArray();
      assert(array.length === 2);
      let list = new ArrayList();
      list.addAll(map.toArray());
      assert(list.contains({key:1,value:2}));
      assert(list.contains({key:3,value:4}));
    });
  }

  test_toString(test) {
    it('[] -> "{}"', function() {
      let map = test.newInstance();
      assert(map.toString() === '{}');
    });
    it('{1->2,2->"3",3->{a:1}} -> "{1->2,2->\"3\",3->{\"a\":2}}"', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(2,"3");
      map.put(3,{a:2});
      assert(map.toString() === '{1->2,2->"3",3->{"a":2}}');
    });
  }

  test_values(test) {
    it('{} -> []', function() {
      let map = test.newInstance();
      assert(new Array(...map.values()).length === 0);
    });
    it('{1->2,2->2,3->3} -> {2,2,3} when sorted', function() {
      let map = test.newInstance();
      map.put(1,2);
      map.put(2,2);
      map.put(3,3);
      assert(Util.equals(new Array(...map.values()).sort(), [2,2,3]));
    });
  }
}

module.exports = MapTest;
