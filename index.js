'use strict';

const _ = require('lodash');

const ImmutableObject = (function () {
	const privateData = new WeakMap();
	class ImmutableObject {
		constructor (object) {
			const data = _.cloneDeep(object);
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
			return _.cloneDeep(data);
		}
		toJson () {
			return JSON.stringify(this.toObject());
		}
	}
	return ImmutableObject;
})();

module.exports = ImmutableObject;
