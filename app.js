$(document).ready(function() {
    
    loadTasks();

    $("#add-btn").click(function() {
        let value = $("#task-input").val();
        if (value) {
            addTask(value);
            $("#task-input").val("");
        }
    });

    $(document).on("click", ".delete-btn", function() {
        $(this).closest("li").remove();
        saveTasks();
    });

    $(document).on("click", ".text", function() {
        $(this).toggleClass("line-through");
        saveTasks();
    });

    function addTask(value) {
        let newTask = `
            <li class="task-list">
                <div class="each-wrap">
                    <p class="text">${value}</p>
                    <button class="delete-btn">
                        <img src="img/icons8-delete-30.png" alt="Delete">
                    </button>
                </div>
            </li>`;
        $(".task-menu").append(newTask);
        saveTasks();
    }

    function saveTasks() {
        let tasks = [];
        $(".task-list").each(function() {
            let task = {
                text: $(this).find(".text").text(),
                completed: $(this).find(".text").hasClass("line-through")
            };
            tasks.push(task);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            tasks.forEach(function(task) {
                let completedClass = task.completed ? "line-through" : "";
                let newTask = `
                    <li class="task-list">
                        <div class="each-wrap">
                            <p class="text ${completedClass}">${task.text}</p>
                            <button class="delete-btn">
                                <img src="img/icons8-delete-30.png" alt="Delete">
                            </button>
                        </div>
                    </li>`;
                $(".task-menu").append(newTask);
            });
        }
    }
});
