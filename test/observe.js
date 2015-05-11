var assert = require('assert');
var Observable = require('rx').Observable;
var co = require('..');

describe('co(* -> yield <Observable>', function(){
    describe('with one observable yield', function(){
        it('should work', function(){
            return co(function *(){
                var a = yield Observable.just(1);
                assert.equal(1, a);
            });
        })
    })

    describe('with several observable yields', function(){
        it('should work', function(){
            return co(function *(){
                var a = yield Observable.just(1);
                var b = yield Observable.just(2);
                var c = yield Observable.just(3);

                assert.deepEqual([1, 2, 3], [a, b, c]);
            });
        })
    })

    describe('with timeout observable yield', function(){
        this.timeout(3000);

        it('should work', function(){
            return co(function *(){
                var a = yield Observable.just(1).delay(2000);

                assert.deepEqual(1, a);
            });
        })
    })

    describe('with merge observable with promise yield', function(){
        this.timeout(3000);

        it('should work', function(){
            return co(function *(){
                var a = yield Observable.fromArray([1,2,3,4]).merge(Observable.fromPromise(Promise.resolve(5))).toArray();

                assert.deepEqual([1,2,3,4,5], a);
            });
        })
    })
})
