import {createTask, getTaskList, priorityEnum, taskList} from '../client';
import 'mocha';
import 'jquery';
import {expect} from 'chai';


describe('Create Task Test', () => {
    let testList = taskList;
    let priority: priorityEnum.low;

    it('should return true if task was successfully created', () => {
        createTask('test', 'testTask', priority);
        expect(getTaskList().length).to.not.equal(testList);
    });
});


