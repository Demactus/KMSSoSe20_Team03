import { createTask } from '../client';
import { helloTest } from '../client';
import 'mocha';
import 'jquery';
import jsdom = require("jsdom");
import { expect } from 'chai';



describe('First test', () => {
    it('should return true', () => {
        const result = helloTest();
        expect(result).to.equal(true);
    });
});


