import { createTask } from '../client';
import { helloTest } from '../client';
import { expect } from 'chai';
import 'mocha';
import 'jquery';


describe('First test', () => {
    it('should return true', () => {
        const result = helloTest();
        expect(result).to.equal(true);
    });
});


