import {
    calcCurrentTaskId,
    createTask,
    deleteTask,
    dummyTest,
    getTaskList,
    priorityEnum,
    setTaskDone, Task,
    taskList
} from '../client';
import 'mocha';
import 'jquery';
import {expect} from 'chai';

let priority: priorityEnum.low;

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

describe('Create task test', () => {
    let testList = taskList;

    it('should return true if task was successfully created', () => {
        createTask('testCreate', 'testTask', priority);
        expect(getTaskList().length).to.not.equal(testList);
    });
});


describe('Delete a task test', () => {
    let testList = taskList;

    it('should delete a task from the task list', function () {
        deleteTask(1);
        expect(testList).to.not.have.lengthOf(0);
    });
})

describe('Set task done test', () => {
    createTask('testSetDone', 'testTask', priority);

    it('should set the task with the given ID as done', function () {
        let isTaskDone: Task = setTaskDone(0);
        expect(isTaskDone.status).to.be.true;
    });
});
