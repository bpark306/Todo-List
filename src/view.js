import plusIcon from "./icons/plus.svg";


export function ProjectView() {
    
    const projectsUL = document.querySelector(".projects");

    const addProjectButton = document.getElementById("add-project");

    let projectNameChangeHandler = () => {};

    const onProjectNameChange = handler => {
        projectNameChangeHandler = handler;
    };

    let taskChangeHandler = () => {};

    const onTaskChange = handler => {
        taskChangeHandler = handler;
    }

    let addTaskToProject = () => {};

    const onAddTask = handler => {
        addTaskToProject = handler;
    }

    const onAddProject = (handler) => {
        addProjectButton.addEventListener("click", handler);
    }

    let deleteProjectHandler = () => {};

    const onDeleteProject = handler => {
        deleteProjectHandler = handler;
    }

    let deleteTaskHandler = () => {};

    const onDeleteTask = handler => {
        deleteTaskHandler = handler;
    }


    const render = (projects) => {
        
        projectsUL.replaceChildren();

        document.body.appendChild(addProjectButton);

        projects.forEach(project => {

            // Project Item
            const projectItem = document.createElement("li");
            projectItem.classList.add("project-item");

            const projectContainer = document.createElement("div");
            projectContainer.classList.add("project-header");


            const projectNameInput = document.createElement("input");
            projectNameInput.classList.add("project-name");
            projectNameInput.placeholder = project.getName() !== null ? project.getName() : "Add Project Name";
            projectNameInput.type = "text";

            projectNameInput.addEventListener("input", (e) => {
                projectNameChangeHandler(project, e.target.value);
            });

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("edit");

            deleteButton.addEventListener("click", (e) => {
                deleteProjectHandler(project);
            });


            projectContainer.appendChild(projectNameInput);
            projectContainer.appendChild(deleteButton);


            const todoList = document.createElement("ul");
            todoList.classList.add("todo-list")
            
            project.getTodo().forEach(todo => {
                const todoItem = document.createElement("li");
                todoItem.classList.add("todo-item");


                const checkBox = document.createElement("input");
                checkBox.classList.add("checkbox")
                checkBox.type = "checkbox";


                const taskForm = document.createElement("form");

                const taskNameInput = document.createElement("input");
                taskNameInput.classList.add("task-name");
                taskNameInput.placeholder = todo.getTitle();
                taskNameInput.name = "task-name"
                taskNameInput.type = "text";

                const taskDateInput = document.createElement("input");
                taskDateInput.type = "date";
                taskDateInput.name = "task-date"
                taskDateInput.value = todo.getDueDate();

                taskForm.addEventListener("submit", (e) => {
                    e.preventDefault();

                    const formData = new FormData(e.currentTarget);

                    taskChangeHandler(todo, formData);
                });

                const deleteTaskButton = document.createElement("button");
                deleteTaskButton.classList.add("edit");

                deleteTaskButton.addEventListener("click", (e) => {
                    deleteTaskHandler(project, todo.getUuid());
                });

                taskForm.appendChild(taskNameInput);
                taskForm.appendChild(taskDateInput);
        
                const todoDesc = document.createElement("h3");
                todoDesc.textContent = todo.getDesc();

                todoItem.appendChild(checkBox);
                todoItem.appendChild(taskForm);
                todoItem.appendChild(todoDesc);
                todoItem.appendChild(deleteTaskButton);

                todoList.appendChild(todoItem);
            });

            const addTaskItem = document.createElement("li");
            addTaskItem.classList.add("todo-item");

            const addTaskImage = document.createElement("img");
            addTaskImage.classList.add("add");
            addTaskImage.src = plusIcon;

            const addTaskForm = document.createElement("form");

            const divider = document.createElement("hr");

            const addTaskName = document.createElement("input");
            addTaskName.type = "text";
            addTaskName.name = "add-task-name"
            addTaskName.placeholder = "Add text";


            const addTaskDate = document.createElement("input");
            addTaskDate.type = "date";
            addTaskDate.name = "add-task-date"
            addTaskDate.value = new Date();


            addTaskForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                
                addTaskToProject(project, formData);
            })

            addTaskForm.appendChild(addTaskName);
            addTaskForm.appendChild(addTaskDate);

            addTaskItem.appendChild(addTaskImage);
            addTaskItem.appendChild(addTaskForm);
            todoList.appendChild(divider);
            todoList.appendChild(addTaskItem);

            projectItem.appendChild(projectContainer);
            projectItem.appendChild(todoList);

            projectsUL.appendChild(projectItem);            

        });
    };

    

    return { render , onAddProject, onProjectNameChange, onAddTask, onTaskChange, onDeleteProject, onDeleteTask};
}