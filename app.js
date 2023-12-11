const TEMPLATES = await (await fetch("app.xml")).text();
// In this example, we show how components can be defined and created.
import { Component, useState, mount, onWillStart } from "@odoo/owl";

// Todo Component
class Todo extends Component {
  static template = "Todo";
  toggleTask = (task) => {
    // this.state.tasks[task_index].isCompleted =
    //   !this.state.tasks[task_index].isCompleted;
    task.isCompleted = !task.isCompleted;
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((x) => x.json())
      .then((y) => this.loadData());
  };
  deleteTask = (taskId) => {
    // this.state.tasks = this.state.tasks.filter(
    //   (task) => task.id != taskId
    // );
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      
    })
      .then((x) => x.json())
      .then((y) => this.loadData());
  };
  addTask = () => {
    // this.state.tasks.push({ ...this.state.task });
    // this.state.task.name = "New Task";
    fetch(`http://localhost:3000/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.task),
    })
      .then((x) => x.json())
      .then((y) => this.loadData());

    this.state.task.name = "";
  };
  loadData = () => {
    fetch("http://localhost:3000/tasks/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((x) => x.json())
      .then((y) => (this.state.tasks = y));
  };
  setup() {
    this.state = useState({
      task: {
        name: "",
        isCompleted: false,
      },
      tasks: [],
    });

    onWillStart(() => {
      this.loadData();
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
