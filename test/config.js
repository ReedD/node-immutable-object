'use strict';

const chai      = require('chai');
const sinon     = require('sinon');

// Config
chai.use(require('sinon-chai'));

chai.config.includeStack = true;
global.should            = chai.should();
global.expect            = chai.expect;
global.sinon             = sinon;
global.AssertionError    = chai.AssertionError;
global.Assertion         = chai.Assertion;
global.assert            = chai.assert;
