import {
    calcCurrentCatId,
    createCategory, deleteCategory,
    Category,
    categoryList
} from '../client';
import 'mocha';
import 'jquery';
import {expect} from 'chai';

describe('Calculate current cat id test', () => {
    let testCategoryList = categoryList;
    it('should return correct current category id', function () {
        expect(calcCurrentCatId()).to.equal(1);
    });
})

describe('Create Category test', () => {
    let testCategoryList = categoryList;

    it('should return true if category was successfully created', () => {
        createCategory('testCreate', null);
        expect(categoryList.length).to.not.equal(testCategoryList);
    });
});

describe('Delete a category test', () => {
    let testCategoryList = categoryList;
        createCategory('testCreate', null);
    it('should delete a category from the category list', function () {
        deleteCategory(1);
        expect(testCategoryList).to.not.have.lengthOf(0);
    });
});






