export function ProjectController(model, view) {
    model.loadData();
    view.render(model.getProjects());

    view.onAddProject(() => {
        model.addProject(null)
        model.saveData();
        view.render(model.getProjects());
    });

    view.onProjectNameChange((project, name) => {
        model.renameProject(project, name);
        model.saveData();
    })

    view.onAddTask((project, formData) => {

        model.addTask(project, formData);
        model.saveData();
        view.render(model.getProjects());
    })

    view.onDeleteTask((project, uuid) => {
        model.deleteTask(project, uuid);
        model.saveData();
        view.render(model.getProjects());
    })

    view.onTaskChange((task, formData) => {

        model.editTask(task, formData);
        model.saveData();
        view.render(model.getProjects());
    })

    view.onDeleteProject((project) => {
        model.deleteProject(project);
        model.saveData();
        view.render(model.getProjects());
    })

}