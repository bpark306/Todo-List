export function ProjectController(model, view) {
    model.addProject("test0");
    model.addProject("test1");
    view.render(model.getProjects());

}