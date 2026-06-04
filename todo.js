const input = document.querySelector("#input");
const addBtn = document.querySelector("#addbtn");
const list = document.querySelector("#list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.complete;

        const text = document.createElement("span");
        text.textContent = task.task;

        if (task.complete) {
            text.classList.add("completed");
        }

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";

    
        checkbox.addEventListener("change", function () {
            tasks[index].complete = this.checked;
            saveTasks();
            renderTasks();
        });

        
        delBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(delBtn);

        list.appendChild(li);
    });
}

addBtn.addEventListener("click", function () {
    const value = input.value.trim();

    if (!value) {
        alert("Write something!");
        return;
    }

    tasks.push({
        task: value,
        complete: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
});

renderTasks();