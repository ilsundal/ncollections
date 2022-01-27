'use strict'

const assert = require('assert');

const ArrayList = require(__dirname + '/../main/ArrayList.js');
const Collection = require(__dirname + '/../main/Collection.js');
const Util = require(__dirname + '/../main/Util.js');

// the tests below do not check for result order (in e.g. lists) or no-duplicates (in e.g. sets)
function run(collectionClass, options={}) {

  assert(Util.isSubClassOf(collectionClass, Collection));

  let skip = options.skip || []; // default: skip none

  describe('#constructor', function() {
    it('()', function() {
      let collection = new collectionClass();
    });
  });

  describe('#add', function() {

    it('{} + 1 -> true & {1}', function() {
      let collection = new collectionClass();
      assert(collection.add(1));
      assert(collection.size() == 1);
      assert(collection.contains(1));
    });

    it('{1} + 2 -> true & {1,2}', function() {
      let collection = new collectionClass();
      collection.add(1);
      assert(collection.add(2));
      let expected = [1, 2];
      assert(collection.size() == expected.length);
      assert(collection.containsAll(expected));
    });
  });

  describe('#addAll', function() {

    it('{} + {} -> false & {}', function() {
      let collection = new collectionClass();
      assert(!collection.addAll([]));
      assert(collection.size() == 0);
    });

    it('{} + {1,2} -> true & {1,2}', function() {
      let collection = new collectionClass();
      assert(collection.addAll([1, 2]));
      let expected = [1, 2];
      assert(collection.size() == expected.length);
      assert(collection.containsAll(expected));
    });
  });

  describe('#clear', function() {

    it('{1} -> {}', function() {
      let collection = new collectionClass();
      collection.add(1);
      collection.clear();
      assert(collection.size() == 0);
    });
  });

  describe('#clone', function() {

    it('{1,2,3} -> {1,2,3}', function() {
      let collection = new collectionClass();
      collection.addAll([1, 2, 3]);
      let clone = collection.clone();
      assert(collection.equals(clone));
    });
  });

  describe('#contains', function() {

    it('{1} contains 1 -> true', function() {
      let collection = new collectionClass();
      collection.add(1);
      assert(collection.contains(1));
    });

    it('{2} contains 1 -> false', function() {
      let collection = new collectionClass();
      collection.add(1);
      assert(!collection.contains(2));
    });
  });

  describe('#containsAll', function() {

    it('{1,2} contains {2,1} -> true', function() {
      let collection = new collectionClass();
      collection.addAll([1, 2]);
      assert(collection.containsAll([2, 1]));
    });

    it('{1,2} contains {1,3} -> false', function() {
      let collection = new collectionClass();
      collection.addAll([1, 2]);
      assert(!collection.containsAll([1, 3]));
    });
  });

  describe('#equals', function() {

    it('{1,2} equals {1,2} -> true', function() {
      let collection1 = new collectionClass();
      collection1.addAll([1, 2]);
      let collection2 = new collectionClass();
      collection2.addAll([1, 2]);
      assert(collection1.equals(collection2));
    });

    it('{1,2} equals {1,3} -> false', function() {
      let collection1 = new collectionClass();
      collection1.addAll([1, 2]);
      let collection2 = new collectionClass();
      collection2.addAll([1, 3]);
      assert(!collection1.equals(collection2));
    });
  });

  describe('#hashCode', function() {

    it('hashCode({1,2}) == hashCode({1,2})', function() {
      let collection1 = new collectionClass();
      collection1.addAll([1, 2]);
      let collection2 = new collectionClass();
      collection2.addAll([1, 2]);
      assert(collection1.hashCode() == collection2.hashCode());
    });

    it('hashCode({1,2) != hashCode({1,3})', function() {
      let collection1 = new collectionClass();
      collection1.addAll([1, 2]);
      let collection2 = new collectionClass();
      collection2.addAll([1, 3]);
      assert(collection1.hashCode() != collection2.hashCode());
    });
  });

  describe('#empty', function() {

    it('{} -> true', function() {
      let collection = new collectionClass();
      assert(collection.isEmpty());
    });

    it('{1} -> false', function() {
      let collection = new collectionClass();
      collection.add(1);
      assert(!collection.isEmpty());
    });
  });

  describe('#next', function() {

    it('{1,2}', function() {
      let collection = new collectionClass();
      collection.addAll([1, 2]);
      let num_elements = 0;
      for (let element of collection)
        num_elements++;
      assert(num_elements == collection.size());
    });
  });

  if (!skip.includes('remove')) {

    describe('#remove', function() {

      it('{1} - 1 -> true & {}', function() {
        let collection = new collectionClass();
        collection.add(1);
        assert(collection.remove(1));
        assert(collection.size() == 0);
      });

      it('{1} - 1 -> false & {1}', function() {
        let collection = new collectionClass();
        collection.add(1);
        assert(!collection.remove(2));
        assert(collection.size() == 1);
        assert(collection.contains(1));
      });
    });

    describe('#removeAll', function() {

      it('{1,2} - {1,3} -> true & {2}', function() {
        let collection = new collectionClass();
        collection.addAll([1, 2]);
        assert(collection.removeAll([1, 3]));
        assert(collection.size() == 1);
        assert(collection.contains(2));
      });

      it('{1,2} - {3,4} -> false & {1,2}', function() {
        let collection = new collectionClass();
        collection.addAll([1, 2]);
        assert(!collection.removeAll([3, 4]));
        assert(collection.size() == 2);
        assert(collection.contains(1));
        assert(collection.contains(2));
      });
    });
  }

  describe('#size', function() {

    it('{} -> 0', function() {
      let collection = new collectionClass();
      assert(collection.size() == 0);
    });

    it('{1..10} -> 10', function() {
      let collection = new collectionClass();
      for (let i = 0; i != 10; i++)
        collection.add(i);
      assert(collection.size() == 10);
    });
  });

  describe('#toArray', function() {

    it('{} -> []', function() {
      let collection = new collectionClass();
      assert(collection.toArray().length == 0);
    });

    it('{1,2} -> [1,2]', function() {
      let collection = new collectionClass();
      collection.addAll([1, 2]);
      assert(Util.equals(collection.toArray(), [1, 2]));
    });
  });
}

module.exports = {
  run: run
};
