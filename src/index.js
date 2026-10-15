import "./styles.css";

import { ProjectModel } from "./model.js";
import { ProjectView } from "./view.js";
import { ProjectController } from "./controller.js";

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

ProjectController(ProjectModel(), ProjectView());
