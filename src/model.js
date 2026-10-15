export function ProjectModel() {

    const projects = [];
    let currProject = null;

    const addProject = (name) => {
        projects.push(new Project(name));
    }


    const getProjects = () => {
        return projects;
    }

    return {addProject, getProjects}
}


class Project{
    #uuid;
    
    constructor(name) {
        this.todoList = [];
        this.name = name; 
        this.#uuid = crypto.randomUUID();
    }
    getTodo() {
        return this.todoList;
    }

    getName() {
        return this.name;
    }

    addTodo(todo) {
        if (typeof(todo) !== "Todo" || todo === null) return;

        this.todoList.push(todo);
    }

    removeTodo(uuid) {
        for(let index = this.todoList.length - 1; index >= 0; --i) {
            if (todoList[index].getUuid() == uuid) {
                this.todoList.splice(index, 1);
                return;
            }
        }
    }  
}

class Todo {

    #uuid;
    #title;
    #desc;
    #dueDate;
    #priority;
    #note;

    constructor(title, desc, dueDate, priority, notes) {
        this.#uuid = crypto.randomUUID();
        this.#title = title;
        this.#desc = desc;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#note = notes;
    }

    get getTitle() {
        return this.#title;
    }
    get getDesc() {
        return this.#desc;
    }

    get getDueDate() {
        return this.#dueDate;
    }

    get getPriority() {
        return this.#priority;
    }

    get getNotes() {
        return this.#note;
    }
    get getUuid() {
        return this.#uuid;
    }
}