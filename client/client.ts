/*********************************************************************************************************************
 * 
 *********************************************************************************************************************/
let taskList : Task[] = [];
let categoryList : Category[] = [];
enum priorityEnum {low, middle, high}

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
     priority : priorityEnum;

    constructor(id: number, name: string, description: string, category?: Category) {
        this.id= id;
        this.name = name;
        this.date = new Date();
        this.description = description;
        this.category = category;
        this.priority = 1;      //middle priority
    }
}

function calcCurrentTaskId() {
    let id: number;
    if (taskList.length <= 0) {
        id = 0;
    }else {
        id = taskList.length;
    }
   return id++
}

function createTask( name: string, description: string) {
    if(name == "" && description == ""){
        console.log("Tasks without Name or Description are not allowed.");
    }else{
    taskList.push(new Task(calcCurrentTaskId(), name, description));
    renderList();
    }
}

/**
 * TODO: We should be able to change the priority of a specific task (by ID or something)
 * @param prio
 */
function setPriority(prio : number){
    if(prio > 2 || prio < 0){
        console.log("There's no such priority");
    }else{
        this.priority = prio;
    }
}

/**
 * Print all Tasks
 */

function printTask(){
    for ( let item of taskList){
        console.log("task# " + item.id + ", " + item.name + ", " + item.description);
    }
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

function calcCurrentCatId() {
    let id: number;
    if (categoryList.length <= 0) {
        id = 0;
    }else {
        id = categoryList.length;
    }
    return id++
}

function createCategory(name: string, color?: string){
    if(name == ""){
        console.log("Category without Name are not allowed.");
    }else{
        categoryList.push(new Category(calcCurrentCatId(), name, color));
    }
    
}

function printCategory(){
    for ( let item of categoryList){
        console.log("Category#" + item.id + ", " + item.name + ", " + item.color);
    }
}

function renderList(){
    let itemList: JQuery = $("#item-list");

    itemList.empty();

    for (let item of taskList){
        itemList.append(renderTask(item));
    }

}

function renderTask(task: Task): JQuery{
    let div: JQuery = $("<div class='col-6'>");
    let card: JQuery = $("<div class=\"card task\">");
    let body: JQuery = $("<div class=\"card-body\">");

    body.append($("<h5 class=\"card-title\">" + task.name + "</h5>"));
    body.append(($("<p class=\"card-text\">" + task.description + "</p>")));
    body.append($("<button id =\"editTaskBtn\" class=\"btn btn-primary\">Edit</button>"));

    card.append(body);
    div.append(card);

    return div;
}

/**********************************************************************************************************************
 * JQUERY MAIN EVENT LISTENER
 *********************************************************************************************************************/
$(function(){
    console.log("JQuery working...");
    //ADD TASK    
    $("#addTaskBtn").on("click", () => {
        let taskName: string = $("#task").val().toString().trim();
        let taskDescription: string = $("#description").val().toString().trim();
        console.log(taskName);
        createTask(taskName, taskDescription);
        printTask();
        event.preventDefault();
    });
    //ADD CATEGORY
    $("#addCategoryBtn").on("click", () => {
        let categoryName: string = $("#category").val().toString().trim();
      
        createCategory(categoryName, "none");
        printCategory();
        event.preventDefault();
    });
  });
