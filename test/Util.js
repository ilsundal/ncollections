'use strict'

const assert = require('assert');

const Util = require(__dirname + '/../main/Util.js');

describe('Util', function() {

  describe('#compare', function() {

    it('(1,1) == 0', function() {
      assert(Util.compare(1, 1) == 0);
    });

    it('(0,1) < 0', function() {
      assert(Util.compare(0, 1) < 0);
    });

    it('(2,1) > 0', function() {
      assert(Util.compare(2, 1) > 0);
    });

    it('("Hello","Hello") == 0', function() {
      assert(Util.compare('Hello', 'Hello') == 0);
    });

    it('("Hallo","Hello") -> -1', function() {
      assert(Util.compare('Hallo', 'Hello') < 0);
    });

    it('("Hillo","Hello") -> -1', function() {
      assert(Util.compare('Hillo', 'Hello') > 0);
    });

    it('({a:1},{a:1}) == 0 (stringified)', function() {
      assert(Util.compare({ a: 1 }, { a: 1 }) == 0);
    });

    it('({a:1},{b:1}) < 0 (stringified)', function() {
      assert(Util.compare({ a: 1 }, { b: 1 }) < 0);
    });
  });

  describe('#equals', function() {

    it('true == true', function() {
      assert(Util.equals(true, true));
    });

    it('false == false', function() {
      assert(Util.equals(false, false));
    });

    it('true != false', function() {
      assert(!Util.equals(true, false));
    });

    it('0 == -0', function() {
      assert(Util.equals(0, -0));
    });

    it('1 == 1', function() {
      assert(Util.equals(1, 1));
    });

    it('1 != 2', function() {
      assert(!Util.equals(1, 2));
    });

    it('"A" == "A"', function() {
      assert(Util.equals('A', 'A'));
    });

    it('"A" != "B"', function() {
      assert(!Util.equals('A', 'B'));
    });

    it('{a:1} == {a:1}', function() {
      assert(Util.equals({ a: 1 }, { a: 1 }));
    });

    it('{a:1} != {b:1}', function() {
      assert(!Util.equals({ a: 1 }, { b: 1 }));
    });

    it('{a:1} != {a:1,b:1}', function() {
      assert(!Util.equals({ a: 1 }, { a: 1, b: 1 }));
    });

    it('{a:1,b:1} == {b:1,a:1}', function() {
      assert(Util.equals({ a: 1, b: 1 }, { b: 1, a: 1 }));
    });

    it('[1,2] == [1,2]', function() {
      assert(Util.equals([1, 2], [1, 2]));
    });

    it('[1,2] != [2,1]', function() {
      assert(!Util.equals([1, 2], [2, 1]));
    });

    it('["A","B"] == ["A","B"]', function() {
      assert(Util.equals(['A', 'B'], ['A', 'B']));
    });

    it('["A","B"] != ["A","C"]', function() {
      assert(!Util.equals(['A', 'B'], ['A', 'C']));
    });

    it('[{a:1},"B",4,[true]] == [{a:1},"B",4,[true]]', function() {
      assert(Util.equals([{a:1},"B",4,[true]], [{a:1},"B",4,[true]]));
    });

    it('[{a:1},"B",4,[true]] != [{a:1},"B",4,[false]]', function() {
      assert(!Util.equals([{a:1},"B",4,[true]], [{a:1},"B",4,[false]]));
    });
  });

  describe('#hashCode', function() {

    it('null -> 0', function() {
      assert(Util.hashCode(null) == 0);
    });

    it('0 -> 48', function() {
      assert(Util.hashCode(0) == 48);
    });

    it('"0" -> 48', function() {
      assert(Util.hashCode('0') == 48);
    });

    it('1.5 -> 48', function() {
      assert(Util.hashCode(1.5) == 48568);
    });

    it('"A" repeated 10**6 times -> 604611584', function() {
      assert(Util.hashCode('A'.repeat(10**6)) == 604611584);
    });

    it('[{a:1},"B",4,[true]] -> 3569038', function() {
      assert(Util.hashCode([{a:1},"B",4,[true]]) == 13716316);
    });

    it('hash of [{a:1},"B",4,[true]] == hash of [{a:1},"B",4,[true]]', function() {
      assert(Util.hashCode([{a:1},"B",4,[true]]) == Util.hashCode([{a:1},"B",4,[true]]));
    });

    it('hash of [{a:1},"B",4,[true]] != hash of [{a:1},"B",4,[false]]', function() {
      assert(Util.hashCode([{a:1},"B",4,[true]]) != Util.hashCode([{a:1},"B",4,[false]]));
    });

//console.log(Util.hashCode('A'.repeat(10**6)));

  });
});
