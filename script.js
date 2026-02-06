const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const counters = document.querySelector("#counters");
const error = document.querySelector("#form-error");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = [];
let currentFilter = "all";

function render() {
  // TODO: filtrer tasks selon currentFilter
  // TODO: mettre à jour le compteur
  // TODO: générer le HTML de la liste (li)
}

function addTask(label) {
  // TODO: push une task avec id, label, done:false
}

function toggleTask(id) {
  // TODO: inverser done
}

function deleteTask(id) {
  // TODO: supprimer par id
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  error.textContent = "";

  const value = input.value.trim();
  if (!value) {
    error.textContent = "Merci d’écrire une tâche avant d’ajouter.";
    return;
  }

  addTask(value);
  input.value = "";
  input.focus();
  render();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();