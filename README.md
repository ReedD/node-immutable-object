[![NPM](https://nodei.co/npm/imobject.png?downloads=true)](https://nodei.co/npm/imobject/)

node-immutable-object
=================

imobject allows you to create deep immutable JavaScript objects. Once the properties are set
additional properties can't be added and the initial properties cannot be modified.


##Installation
To use [imobject](https://www.npmjs.org/package/imobject), cd into your
project directory and install imobject with `npm` or `yarn`.

**npm**
```
$ cd /to/project/directory
$ npm install imobject --save
```

**yarn**
```
$ cd /to/project/directory
$ yarn add imobject
```

##Usage
To create an imobject, simply require the npm package and cast your standard JavaScript
objects into imobjects.

```
const IMObject = require('imobject');

var immutable = new IMObject({
	foo: 'bar',
	nested: {
		foo: 'baz'
	}
});

// To access properties simply use the dot operator
console.log(immutable.foo);
// -> bar

console.log(immutable.nested.foo);
// -> baz

// If you attempt to modify a property an exception will be thrown
immutable.nested.foo = 'newvalue'
// -> ERROR!

// If you attempt to add a new property an exception will be thrown
immutable.newprop = 'newvalue'
// -> ERROR!
```

###Instance Methods

#### get
`get` works just like the dot operator with the added benefit of providing a default value if the
path requested is not set.

```
const IMObject = require('imobject');

var immutable = new IMObject({
	foo: 'bar',
	nested: {
		foo: 'baz'
	}
});

console.log(immutable.get('foo'));
// -> bar

console.log(immutable.get('nested.foo',  'defaultvalue'));
// -> baz

console.log(immutable.get('nested.notset', 'defaultvalue'));
// -> defaultvalue

```

#### has
`has` returns a boolean value indicating whether or not a given path is set.

```
const IMObject = require('imobject');

var immutable = new IMObject({
	foo: 'bar',
	nested: {
		foo: 'baz'
	}
});

console.log(immutable.has('foo'));
// -> true

console.log(immutable.has('nested.foo'));
// -> true

console.log(immutable.hast('nested.notset'));
// -> false

```
