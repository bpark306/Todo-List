export function ProjectModel() {

    let projects = [];
    
    const saveData = () => {
        const data = projects.map(project => ({
            name: project.getName(),
            todos: project.getTodo().map(task => ({
                title: task.getTitle(),
                dueDate: task.getDueDate(),
            })),
        }));
        localStorage.setItem("projects", JSON.stringify(data));
    }

    const loadData = () => {
        let data = localStorage.getItem("projects");

        if (data === null) {
            projects = [];
            return
            
        } 
        
        try {
            data = JSON.parse(data);

            if (!Array.isArray(data)) {
                throw new Error("Saved projects must be an array");
            }

            projects = data.map(item => {
                const project = new Project();
                project.setName(item.name);

                item.todos.forEach(task => {
                    project.addTodo(new Todo(task.title, task.dueDate));
                });
                return project;
            });
        } catch(err) {
            console.error("Could not load saved data", err);
            projects = []
        }
    }

    const addProject = (name) => {
        projects.push(new Project(name));
    }

    const renameProject = (project, name) => {
        if (project === null)  return;
        project.setName(name);
    }

    const newTask = (name, dueDate) => {
        return new Todo(name, dueDate);
    }

    const deleteProject = (project) => {
        if (project === null) return;

        projects.splice(projects.indexOf(project), 1);
    }

    const getProjects = () => {
        return projects;
    }

    const addTask = (project, formData) => {

        if (project === null || formData === null) return;
        const name = formData.get("add-task-name");
        const date = formData.get("add-task-date");

        project.addTodo(new Todo(name, date));
    }

    const editTask = (task, formData) => {
        if (task === null || formData === null) return;

        const name = formData.get("task-name");
        const date = formData.get("task-date");
        task.setTitle(name);
        task.setDueDate(date);
    }

    const deleteTask = (project, uuid) => {
        if (project === null) return;

        const index = project.getTodo().find((task) => uuid === task.getUuid());

        if (index === undefined) return;
 
        project.getTodo().splice(index, 1);
  
    }


    return {saveData, loadData, addProject, getProjects, renameProject, addTask, deleteProject, editTask, newTask, deleteTask}
}


class Project{
    #uuid;
    
    constructor() {
        this.todoList = [];
        this.name = null;
        this.#uuid = crypto.randomUUID();
    }

    setName(name) {
        this.name = name;
    }

    getUuid() {
        return this.#uuid;
    }
    getTodo() {
        return this.todoList;
    }

    getName() {
        return this.name;
    }

    addTodo(todo) {
        if (todo instanceof Todo) {
            this.todoList.push(todo);
        } else if(typeof(todo) === "string") {
            this.todoList.push(new Todo(todo));
        }
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

    constructor(title, dueDate) {
        this.#uuid = crypto.randomUUID();
        this.#title = title;
        this.#dueDate = dueDate;
    }

    setTitle(title) {
        this.#title = title;
    }

    getTitle() {
        return this.#title;
    }
    getDesc() {
        return this.#desc;
    }

    getDueDate() {
        return this.#dueDate;
    }

    setDueDate(date) {
        this.#dueDate = date;
    }

    getPriority() {
        return this.#priority;
    }

    getNotes() {
        return this.#note;
    }
    getUuid() {
        return this.#uuid;
    }
}