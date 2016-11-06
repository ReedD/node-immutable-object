'use strict';

const _ = require('lodash');

const ImmutableObject = (function () {
	const privateData    = new WeakMap();
	const cloneCustomizer = function (value) {
		if (_.isObject(value)) {
			const cloneable = ['String', 'Boolean', 'Object', 'Number', 'Array', 'Date', 'RegExp'];
			if (!_.includes(cloneable, value.constructor.name)) {
				// Custom class or not safely cloneable. Don't clone; return value.
				return value;
			}
		}
		// Let lodash handle clone
		return undefined;
	};
	class ImmutableObject {
		constructor (object) {
			const data = _.cloneDeepWith(object, cloneCustomizer);
			const keys = _.keys(data);
			_.each(keys, key => {
				Object.defineProperty(this, key, {
					get: function () {
						if (_.isObject(data[key])) {
							return new ImmutableObject(data[key]);
						}
						return data[key];
					}
				});
			});
			privateData.set(this, {data: data});
			Object.seal(this);
		}
		get (path, defaultValue) {
			const data = privateData.get(this).data;
			return _.get(data, path, defaultValue);
		}
		has (path) {
			const data = privateData.get(this).data;
			return _.has(data, path);
		}
		inspect () {
			return this.toObject();
		}
		toObject () {
			const data = privateData.get(this).data;
			return _.cloneDeepWith(data, cloneCustomizer);
		}
		toJson () {
			return JSON.stringify(this.toObject());
		}
	}
	return ImmutableObject;
})();

module.exports = ImmutableObject;
