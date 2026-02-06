const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const counters = document.querySelector("#counters");
const error = document.querySelector("#form-error");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = [];
let currentFilter = "all"; // all | todo | done

function render() {
  // Filtrer les tâches selon le filtre actif
  let filteredTasks = tasks;

  if (currentFilter === "todo") {
    filteredTasks = tasks.filter(task => !task.done);
  }

  if (currentFilter === "done") {
    filteredTasks = tasks.filter(task => task.done);
  }

  // Vider la liste avant de la remplir
  list.innerHTML = "";

  // Créer un élément <li> pour chaque tâche filtrée
  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
    });

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.label;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    // Assembler les éléments dans le <li>
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Ajouter le <li> à la liste
    list.appendChild(li);
  });

  // Étape 4 : Mettre à jour les compteurs
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const todo = total - done;

  counters.textContent = `Total : ${total} • À faire : ${todo} • Faites : ${done}`;
}

function addTask(label) {
  tasks.push({
    id: Date.now(),
    label,
    done: false
  });
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  
  if (task) {
    task.done = !task.done; 
    render(); // Rafraîchir l'affichage
  }
}

function deleteTask(id) {
  // Garder toutes les tâches SAUF celle avec cet id
  tasks = tasks.filter(t => t.id !== id);
  render(); // Rafraîchir l'affichage
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Empêcher le rechargement de la page
  error.textContent = ""; // Effacer l'erreur précédente

  const value = input.value.trim(); // Récupérer la valeur sans espaces
  // Vérifier si le champ est vide
  if (!value) {
    error.textContent = "Merci d'écrire une tâche avant d'ajouter.";
    return;
  }

  addTask(value); // Ajouter la tâche
  input.value = ""; // Vider le champ
  input.focus(); // Remettre le focus sur le champ
  render(); // Rafraîchir l'affichage
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter; // Changer le filtre actif
    render(); // Rafraîchir l'affichage avec le nouveau filtre
  });
});

render(); // Afficher la liste au chargement (vide au début)