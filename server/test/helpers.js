const supertest = require('supertest');
const chai = require('chai');
const app = require('../server');
chai.use(require('chai-json'));

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);
