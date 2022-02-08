'use strict'

const assert = require('assert');

const TreeMap = require(__dirname + '/../main/TreeMap.js');

const SortedMapTest = require(__dirname + '/SortedMapTest.js');

class TreeMapTest extends SortedMapTest {

  constructor(options={}) {
    super(TreeMap, options);
  }
/*
  class_method_names = this.class_method_names.concat([
    'debug'
  ]);

  test_debug(test) {
    it('{}', function() {
      let set = test.newInstance();
      assert(set.debug() === 'null');
    });
    it('{1}', function() {
      let set = test.newInstance([1]);
      assert(set.debug() === '{e:1,s:1,pe:null,l:null,m:null}');
    });
    it('{1,2}', function() {
      let set = test.newInstance([1,2]);
      assert(set.debug() === '{e:1,s:2,pe:null,l:null,m:{e:2,s:1,pe:1,l:null,m:null}}');
    });
    it('{3,4,1,5,2}', function() {
      let set = test.newInstance([3,4,1,5,2]);
      assert(set.debug() === '{e:3,s:5,pe:null,l:{e:1,s:2,pe:3,l:null,m:{e:2,s:1,pe:1,l:null,m:null}},m:{e:4,s:2,pe:3,l:null,m:{e:5,s:1,pe:4,l:null,m:null}}}');
    });
    it('{1,2,3,4} - [1,2]', function() {
      let set = test.newInstance([1,2,3,4]);
      set.removeAll([1,2]);
      assert(set.debug() === '{e:3,s:2,pe:null,l:null,m:{e:4,s:1,pe:3,l:null,m:null}}');
    });
    it('{4,3,2,1} - [1,2]', function() {
      let set = test.newInstance([4,3,2,1]);
      set.removeAll([1,2]);
      assert(set.debug() === '{e:4,s:2,pe:null,l:{e:3,s:1,pe:4,l:null,m:null},m:null}');
    });
  }
*/
}

module.exports = TreeMapTest;
