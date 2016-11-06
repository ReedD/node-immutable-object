'use strict';
/* jshint expr: true */
/**
 * Module dependencies.
 */
var ImmutableObject = require('../index');

//The tests
describe('ImmutableObject <Unit Test>', function() {

	describe('Property Behavior <Unit Test>', function() {

		it('Should construct an ImmutableObject', function() {
			const immutable = new ImmutableObject({
				foo: 'bar'
			});
			expect(immutable).to.have.property('foo', 'bar');
			expect(immutable.foo).to.equal('bar');
			try {
				immutable.foo = 'newvalue';
				expect(true).to.be.false; // This line should not execute
			} catch (e) {
				expect(e).to.have.property('message', 'Cannot set property foo of #<ImmutableObject> which has only a getter');
			}
		});

		it('Should construct a nested ImmutableObject', function() {
			const immutable = new ImmutableObject({
				animal: 'cat',
				nested: {
					foo: 'bar',
					deep: {
						foo: 'baz'
					}
				}
			});
			expect(immutable).to.have.property('animal', 'cat');
			expect(immutable.animal).to.equal('cat');

			try {
				immutable.animal = 'dog';
				expect(true).to.be.false; // This line should not execute
			} catch (e) {
				expect(e).to.have.property('message', 'Cannot set property animal of #<ImmutableObject> which has only a getter');
			}

			expect(immutable).to.have.deep.property('nested.foo', 'bar');
			expect(immutable.nested.foo).to.equal('bar');

			try {
				immutable.nested.foo = 'newvalue';
				expect(true).to.be.false; // This line should not execute
			} catch (e) {
				expect(e).to.have.property('message', 'Cannot set property foo of #<ImmutableObject> which has only a getter');
			}

			expect(immutable).to.have.deep.property('nested.deep.foo', 'baz');
			expect(immutable.nested.deep.foo).to.equal('baz');

			try {
				immutable.nested.deep.foo = 'newvalue';
				expect(true).to.be.false; // This line should not execute
			} catch (e) {
				expect(e).to.have.property('message', 'Cannot set property foo of #<ImmutableObject> which has only a getter');
			}

		});

		it('Should not be able to add properties to ImmutableObject', function() {
			const immutable = new ImmutableObject();
			try {
				immutable.foo = 'bar';
				expect(true).to.be.false; // This line should not execute
			} catch (e) {
				expect(e).to.have.property('message', 'Can\'t add property foo, object is not extensible');
			}
		});

		it('Should not be able to add properties to nested ImmutableObject', function() {
			const immutable = new ImmutableObject({
				nested: {}
			});
			try {
				expect(immutable.nested).to.be.instanceof(Object);
				immutable.nested.foo = 'bar';
				expect(true).to.be.false; // This line should not execute
			} catch (e) {
				expect(e).to.have.property('message', 'Can\'t add property foo, object is not extensible');
			}
		});
	});

	describe('Method has', function() {
		it('Should return true if path set', function() {
			const immutable = new ImmutableObject({
				foo: 'bar'
			});
			expect(immutable).to.have.property('foo', 'bar');
			expect(immutable.has('foo')).to.be.true;

			const immutableNested = new ImmutableObject({
				nested: {
					foo: 'bar'
				}
			});
			expect(immutableNested).to.have.deep.property('nested.foo', 'bar');
			expect(immutableNested.has('nested.foo')).to.be.true;
		});
		it('Should return false if path is not set', function() {
			const immutable = new ImmutableObject();
			expect(immutable.has('foo')).to.be.false;
			expect(immutable.has('nested.foo')).to.be.false;
		});
	});

	describe('Method get', function() {
		it('Should return expected value', function() {
			const immutable = new ImmutableObject({
				foo: 'bar'
			});
			expect(immutable).to.have.property('foo', 'bar');
			expect(immutable.foo).to.equal(immutable.get('foo'));

			const immutableNested = new ImmutableObject({
				nested: {
					foo: 'bar'
				}
			});
			expect(immutableNested).to.have.deep.property('nested.foo', 'bar');
			expect(immutableNested.nested.foo).to.equal(immutableNested.get('nested.foo'));
		});
		it('Should return default value if one is not set', function() {
			const immutable = new ImmutableObject();
			expect(immutable).to.not.have.property('foo');
			expect(immutable.get('foo', 'bar')).to.equal('bar');

			expect(immutable).to.not.have.deep.property('nested.foo');
			expect(immutable.get('nested.foo', 'bar')).to.equal('bar');
		});
	});

	describe('Method inspect', function() {
		it('Should return clone of original object', function() {
			const object    = {foo: 'bar'};
			const immutable = new ImmutableObject(object);
			expect(object).to.deep.equal(immutable.inspect());
		});
	});

	describe('Method toObject', function() {
		it('Should return clone of original object', function() {
			const object    = {foo: 'bar'};
			const immutable = new ImmutableObject(object);
			expect(object).to.not.deep.equal(immutable);
			expect(object).to.deep.equal(immutable.toObject());
		});
	});

	describe('Method toJson', function() {
		it('Should return stringifyied JSON of original object', function() {
			const object    = {foo: 'bar'};
			const immutable = new ImmutableObject(object);
			expect(JSON.stringify(object)).to.equal(immutable.toJson());
		});
	});
});
/* jshint expr: false */
