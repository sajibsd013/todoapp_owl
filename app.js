const TEMPLATES = await (await fetch("app.xml")).text();
// In this example, we show how components can be defined and created.
import { Component, useState, mount } from "@odoo/owl";

// Todo Component
class Todo extends Component {
  static template = "Todo";
  toggleTask = (task_index) => {
    this.state.tasks[task_index].isCompleted =
      !this.state.tasks[task_index].isCompleted;
  };
  deleteTask = (task_index) => {
    this.state.tasks = this.state.tasks.filter(
      (task, index) => index != task_index
    );
  };
  addTask = () => {
    this.state.tasks.push({...this.state.task})
    this.state.task.name = "New Task"
  };
  setup() {
    this.state = useState({
      task: {
        name: "New Task",
        isCompleted: false,
      },
      tasks: [
        {
          name: "Task 1",
          isCompleted: true,
        },
        {
          name: "Task 2",
          isCompleted: false,
        },
        {
          name: "Task 3",
          isCompleted: false,
        }
      ],
    });
  }
}

// Main root component
class Root extends Component {
  static components = { Todo };
  static template = "Root";

  setup() {
    this.state = useState({});
  }
}

mount(Root, document.body, { templates: TEMPLATES, dev: true });
