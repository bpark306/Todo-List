import plusIcon from "./plus.svg";

export function ProjectView() {

    const render = projects => {

        projects.forEach(element => {
            
            const projectItem = document.createElement("li");
            projectItem.classList.add("project-item");

            const projectContainer = document.createElement("div");
            projectContainer.classList.add("project-header");

            const h1 = document.createElement("h1");
            h1.textContent = element.getName();

            const button = document.createElement("button");
            button.classList.add("edit");

            projectContainer.appendChild(h1);
            projectContainer.appendChild(button);

            const todoList = document.createElement("ul");
            todoList.classList.add("todo-list")
            
            element.getTodo().forEach(todo => {
                const todoItem = document.createElement("li");
                todoItem.classList.add("todo-item");

                const checkBox = document.createElement("input");
                checkBox.type = "checkbox";

                const todoTitle = document.createElement("h2");
                todoTitle.textContent = todo.getTitle();

                const todoDesc = document.createElement("h3");
                todoDesc.textContent = todo.getDesc();

                todoItem.appendChild(checkBox);
                todoItem.appendChild(todoTitle);
                todoItem.appendChild(todoDesc);

                todoList.appendChild(todoItem);
            });

            const addTaskItem = document.createElement("li");
            addTaskItem.classList.add("todo-item");

            const addTaskImage = document.createElement("img");
            addTaskImage.classList.add("add");
            addTaskImage.src = plusIcon;


            const addTaskForm = document.createElement("form");

            const addTaskInput = document.createElement("input");
            addTaskInput.type = "text";
            addTaskInput.name = "add-task-input"
            addTaskInput.placeholder = "Add text";

            addTaskForm.appendChild(addTaskInput);

            addTaskItem.appendChild(addTaskImage);
            addTaskItem.appendChild(addTaskForm);

            todoList.appendChild(addTaskItem);

            projectItem.appendChild(projectContainer);
            projectItem.appendChild(todoList);

            document.querySelector("ul").appendChild(projectItem);
        });
    };


    return { render };
}