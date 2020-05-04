class Task {
     id : number;
     name: string;
     date : Date;
    description : string;

    constructor(id: number, name: string, description: string) {
        this.id= id;
        this.name = name;
        this.date = new Date();
        this.description = description;
    }
}

//import { Task } from "./modell/task";

let taskList : Task[] = [];

function createAufgabe(id: number, name: string, description: string) {
    taskList.push(new Task(id,name,description))
}
console.log("leere liste: " + taskList);

createAufgabe(1,"test","ich bin ein test");
console.log("keine leere liste: " + taskList[0].id + ", " + taskList[0].name + ", " +taskList[0].description);
