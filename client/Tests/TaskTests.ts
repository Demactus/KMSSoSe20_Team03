import {
    calcCurrentTaskId,
    createTask, dummyTest,
    getTaskList,
    priorityEnum,
    setTaskDone,
    taskList
} from '../client';
import 'mocha';
import 'jquery';
import {expect} from 'chai';
import set = Reflect.set;
import * as assert from "assert";


// dummy test for better understanding
describe('Dummy test', () => {

    it('should return true', () => {
        const result = dummyTest();
        expect(result).to.equal(true);
    });

});

describe('Get task list test', () => {
    it('should return the list of tasks', function () {
        let testList = getTaskList();
        expect(testList.length).to.equal(taskList.length);
    });
})

describe('Calculate current task id test', () => {
    let testList = taskList;
    it('should return correct current task id', function () {
        expect(calcCurrentTaskId()).to.equal(1);
    });
})

describe('Create Task Test', () => {
    let testList = taskList;
    let priority: priorityEnum.low;

    it('should return true if task was successfully created', () => {
        createTask('testCreate', 'testTask', priority);
        expect(getTaskList().length).to.not.equal(testList);
    });
});


describe('Set task done test', () => {
    let testList = taskList;
    let priority: priorityEnum.low;
    createTask('testSetDone', 'testTask', priority);

    it('should set the task with the given ID as done', function () {
        const isTaskDone = setTaskDone(1);
        expect(isTaskDone).to.be.true;
    });
});