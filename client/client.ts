/*********************************************************************************************************************
 *
 *********************************************************************************************************************/
let taskList: Task[] = [];
let categoryList: Category[] = [];
enum priorityEnum {low, middle, high}
let itemList: JQuery = $("#item-list");
let tempId: number;

/**********************************************************************************************************************
 * SECTION TASK
 * FUNCTIONS GO HERE
 *********************************************************************************************************************/

class Task {
    id: number;
    name: string;
    date: Date;
    description: string;
    category: Category;
    priority: priorityEnum;
    status: boolean;

    constructor(id: number, name: string, description: string, category?: Category) {
        this.id = id;
        this.name = name;
        this.date = new Date();
        this.description = description;
        this.category = category;
        this.priority = 1;      //middle priority
        this.status = false;
    }
}

function calcCurrentTaskId() {
    let id: number;
    if (taskList.length <= 0) {
        id = 0;
    } else {
        id = taskList.length;
    }
    return id++
}

function createTask(name: string, description: string) {
    let categorySelect: JQuery = $("#categorySelect");
    if (name == "" && description == "") {
        console.log("Tasks without Name or Description are not allowed.");
    } else {
        if (+categorySelect.val() != -1) {
            taskList.push(new Task(calcCurrentTaskId(), name, description, categoryList[+categorySelect.val()]));
            console.log(taskList[taskList.length-1]);
        } else {
            taskList.push(new Task(calcCurrentTaskId(), name, description));
            console.log(taskList[taskList.length-1]);
        }
        renderList();
    }
}

/**
 * TODO: We should be able to change the priority of a specific task (by ID or something)
 * @param prio
 */
function setPriority(prio: number) {
    if (prio > 2 || prio < 0) {
        console.log("There's no such priority");
    } else {
        this.priority = prio;
    }
}

/**
 * Print all Tasks
 */

function printTask() {
    for (let item of taskList) {
        console.log("task# " + item.id + ", " + item.name + ", " + item.description);
    }
}

/**
 * Function for deleting a task from the view list
 * @param id
 */
function deleteTask(id: Number) {
    let rmTask: Task;
    taskList.forEach(function (task) {
        if (task.id === id) rmTask = task;
    })
    const index = taskList.indexOf(rmTask, 0);
    if (index > -1) {
        taskList.splice(index, 1);
    }
    let element = document.getElementById(id.toLocaleString());
    element.parentNode.removeChild(element);
    return false;

}

/**
 * Function to set a task done and change view
 * of the displayed task card
 * @param id
 */
function setTaskDone(id: Number) {
    taskList.forEach(function (task) {
        if (task.id === id) task.status = true;
    })
    let element = document.getElementById(id.toLocaleString());
    let card = element.children;
    card[0].setAttribute("class", "card task bg-success");

    return false;
}

/*
* Function to prepare the modal window with the current task
* */

function modalcontent(id: number) {

    $('#edittask').val(taskList[id].name);
    $('#editdescription').val(taskList[id].description)

    tempId = id;
}


function renderList() {
    let itemList: JQuery = $("#item-list");

    itemList.empty();

    for (let item of taskList) {
        itemList.append(renderTask(item, item.id));
    }

}

function renderTask(task: Task, id: Number): JQuery {
    let div: JQuery = $("<div class='col-6' id=\"" + id + "\">");
    let card: JQuery = $("<div class=\"card task\">");
    let body: JQuery = $("<div id=" + task.id + " class=\"card-body\">");

    body.append($("<h5 class=\"card-title\">" + task.name + "</h5>"));
    body.append(($("<p class=\"card-text\">" + task.description + "</p>")));
    // edit button
    body.append($("<button id =\"editTaskBtn\" class=\"btn btn-primary\" onclick='modalcontent(" + id + ")' data-toggle=\"modal\" data-target=\"#edit\" > Edit</button>"));
    // check icon
    body.append($("<button type=\'button\' class='btn btn-secondary' onclick='setTaskDone(" + id + ")'> <i class=\"fa fa-check\"></i> </button>"));
    // close button
    body.append($("<button type=\'button\' class=\'close\' aria-label=\"close\" onclick='deleteTask(" + id.toLocaleString() + ")'> <span aria-hidden=\'true\'>&times;</span> </button>"));

    card.append(body);
    div.append(card);

    return div;
}

/**********************************************************************************************************************
 * SECTION CATEGORY
 * FUNCTIONS GO HERE
 *********************************************************************************************************************/

class Category {
    id: number;
    name: string;
    color: string;

    constructor(id: number, name: string, color?: string) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}

function calcCurrentCatId() {
    let id: number;
    if (categoryList.length <= 0) {
        id = 0;
    } else {
        id = categoryList.length;
    }
    return id++
}

function createCategory(name: string, color?: string) {
    if (name == "") {
        console.log("Category without Name are not allowed.");
    } else {
        categoryList.push(new Category(calcCurrentCatId(), name, color));
        renderCategoryDropdown();
    }

}

function printCategory() {
    for (let item of categoryList) {
        console.log("Category#" + item.id + ", " + item.name + ", " + item.color);
    }
}

function renderCatList() {
    let itemList: JQuery = $("#category-list");

    itemList.empty();

    for (let item of categoryList) {
        itemList.append(renderCategory(item, item.id));
    }

}

let selectedCategory: number = 0;

function editCategory(id: number) {

    for (let item of categoryList) {
        if (item.id == id) {
            selectedCategory = item.id;
            $("#categoryIdModal").text(item.id);
            $("#editModalCategoryInput").val(item.name);
        }
    }
}

function saveCategory(id: number) {
    for (let item of categoryList) {
        if (item.id == id) {
            item.name = $("#editModalCategoryInput").val().toString().trim();
            renderCatList();
        }
    }
}

function deleteCategory(id: number) {
    let rmCategory: Category;
    categoryList.forEach(function (category) {
        if (category.id === id) rmCategory = category;
    });
    const index = categoryList.indexOf(rmCategory, 0);
    if (index > -1) {
        categoryList.splice(index, 1);
    }
    renderCatList();
    return false;
}

function renderCategory(category: Category, id: Number): JQuery {
    let div: JQuery = $("<div class='col-6' id=\"" + id + "\">");
    let card: JQuery = $("<div class=\"card task\">");
    let body: JQuery = $("<div class=\"card-body\">");
    let footer: JQuery;

    if (task.category != undefined){
        footer = $("<div class=\"card-footer\">" + "Category: " + task.category.name + "  </div>");
    } else {
        footer = $("<div class=\"card-footer\">" + "No category" + "  </div>");

    }

    body.append($("<h5 class=\"card-title\">" + category.name + "</h5>"));
    body.append(($("<p class=\"card-text\">" + category.color + "</p>")));
    // edit button
    body.append($("<button id =\"editTaskBtn\" class=\"btn btn-primary\" onclick='editCategory(" + id + ")' data-toggle='modal' data-target='#editModalCategory'>Edit</button>"));
    // check icon
    body.append($("<button type=\'button\' class='btn btn-secondary' onclick='setTaskDone(" + id + ")'> <i class=\"fa fa-check\"></i> </button>"));
    // close button
    body.append($("<button type=\'button\' class=\'close\' aria-label=\"close\" onclick='deleteCategory(" + id.toLocaleString() + ")'> <span aria-hidden=\'true\'>&times;</span> </button>"));

    card.append(body);
    card.append(footer);
    div.append(card);

    return div;
}

function renderCategoryDropdown(){
    let categorySelect: JQuery = $("#categorySelect");
    categorySelect.empty();

    categorySelect.append('<option value="-1">' + "No category" + '</option>');

    for(let cat of categoryList){
        categorySelect.append('<option value="' + cat.id + '">' + cat.name + '</option>')
    }
}

/**********************************************************************************************************************
 * JQUERY MAIN EVENT LISTENER
 *********************************************************************************************************************/
$(function () {
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
        renderCatList();
        event.preventDefault();
    });

    $("#editModalCategory").on("shown.bs.modal", function () {
        $("#saveButtonCategory").on("click", function () {

            console.log(selectedCategory);
            saveCategory(selectedCategory); // parse to Number
        })

    });

    $('#editsavebtn').on("click", () => {

        taskList[tempId].description = $('#editdescription').val().toString();
        taskList[tempId].name = $('#edittask').val().toString();

        //   alert(taskList[tempId].description);

        renderList();
    });

    // SORT CARDS
    $('#sortBtn').on('click', function () {
        taskList.sort(((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
        renderList();
    });

});

$(function () {
    let categorySelect: JQuery = $("#categorySelect");

    if (categoryList.length == 0){
        categorySelect.append('<option value= "-1">' + "You have no categories saved" + '</option>')
    } else {
        for(let cat of categoryList){
            categorySelect.append('<option value="' + cat.id + '">' + cat.name + '</option>')
        }
    }
});
