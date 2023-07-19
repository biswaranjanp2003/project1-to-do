const todo = document.getElementById("todo");
const todo_button = document.getElementById("add");
const id = JSON.parse(localStorage.getItem("id"));
const todosdiv = document.getElementById("todos");
const signout = document.getElementById("signout");
const token = JSON.parse(localStorage.getItem("token"));

signout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  window.location.href = "../signin/signin.html";
});

if (token !== null) {
  todo_button.addEventListener("click", () => {
    const todoObj = {
      userId: id,
      title: todo.value,
    };
    fetch(`http://localhost:9100/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoObj),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  });

  fetch(`http://localhost:9100/todos`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const newTodo = data.filter((item) => item.userId === id);
      console.log(newTodo);
      {
        newTodo.map((el) => {
          const div = document.createElement("div");
          const title = document.createElement("h4");
          title.innerText = `Todo Title : ${el.title}`;
          const updatebutton = document.createElement("button");
          updatebutton.innerText = "Update";
          updatebutton.addEventListener("click", () => {
            const newTitle = prompt("");
            fetch(`http://localhost:9100/todos/${el.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title: newTitle }),
            }).then((res) => {
              alert("Updated");
            });
          });
          const deletebutton = document.createElement("button");
          deletebutton.innerText = "Delete";
          deletebutton.addEventListener("click", () => {
            fetch(`http://localhost:9100/todos/${el.id}`, {
              method: "DELETE",
            }).then((res) => {
              alert("Deleted");
            });
          });
          div.append(title, updatebutton, deletebutton);
          todosdiv.append(div);
        });
      }
    });
} else {
  window.location.href = "./signin/signin.html";
}
