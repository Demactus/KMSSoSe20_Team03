/**********************************************************************************************************************
 * SECTION TASK
 * FUNCTIONS GO HERE
 *********************************************************************************************************************/

class Task {
     id : number;
     name: string;
     date : Date;
     description : string;
     category: Category;

    constructor(id: number, name: string, description: string, category?: Category) {
        this.id= id;
        this.name = name;
        this.date = new Date();
        this.description = description;
        this.category = category;
    }
}

//import { Task } from "./modell/task";

let taskList : Task[] = [];
let categoryList : Category[] = [];

function calcCurrentTaskId() {
    let id: number;
    if (taskList.length <= 0) {
        id = 0;
    }else {
        id = taskList.length;
    }
   return id++
}
function calcCurrentCatId() {
    let id: number;
    if (categoryList.length <= 0) {
        id = 0;
    }else {
        id = categoryList.length;
    }
   return id++
}

function createTask( name: string, description: string) {
    taskList.push(new Task(calcCurrentTaskId(), name, description))
}
console.log("leere liste: " + taskList);

createTask("test","ich bin ein test");
createTask("test1","ich bin ein test1");
createTask("test2","ich bin ein test2");
createTask("test3","ich bin ein test3");

/**
 * Print all Tasks
 */
for ( let item of taskList){
    console.log("keine leere liste: " + item.id + ", " + item.name + ", " + item.description);
}




/**********************************************************************************************************************
 * SECTION CATEGORY
 * FUNCTIONS GO HERE
 *********************************************************************************************************************/

class Category {
    id : number;
    name: string;
    color: string;

    constructor(id: number, name: string, color?: string){
        this.id = id;
        this.name = name;
        this.color = color;
    }
}

function createCategory(name: string, color: string){
    categoryList.push(new Category(calcCurrentCatId(), name, color))
}

console.log("leere liste: " + categoryList);

createCategory("testA","ich bin ein test");
createCategory("testB","ich bin ein test1");
createCategory("testC","ich bin ein test2");
createCategory("testD","ich bin ein test3");

/**
 * Print all Categories
 */
for ( let item of categoryList){
    console.log("keine leere liste: " + item.id + ", " + item.name + ", " + item.color);
}


/**********************************************************************************************************************
 * JQUERY MAIN EVENT LISTENER
 *********************************************************************************************************************/
$(function(){
    console.log("JQuery working...")
    // jQuery methods go here....
  
  });