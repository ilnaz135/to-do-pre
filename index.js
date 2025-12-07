// Объявляем переменные
let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

// Создаем функции

// Загрузка задач из локального хранилища
function loadTasks() {
	if (localStorage.getItem('tasks').length > 0) return JSON.parse(localStorage.getItem('tasks'))
	return items;
}

// Создание новых задач
function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");
	
	textElement.textContent = item;
	
	// Кнопка удаления
	deleteButton.addEventListener('click', function(e) {
		clone.remove()
		const items = getTasksFromDOM()
		saveTasks(items) 
	})

	// Кнопка копирования
	duplicateButton.addEventListener('click', function() {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName)
		listElement.prepend(newItem)
		const items = getTasksFromDOM()
		saveTasks(items)
	})

	// Кнопка редактирования
	editButton.addEventListener('click', function(e) {
		textElement.setAttribute('contenteditable', true)
		textElement.focus()
	})

	// Текстовый элемент теряет фокус
	textElement.addEventListener('blur', function(e) {
		textElement.setAttribute('contenteditable', false)
		const items = getTasksFromDOM()
		saveTasks(items)
	})

	return clone;
}

// Выводим задачи пользователю
function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text')
	const tasks = itemsNamesElements.map(task => task.textContent);
	return tasks;
}

// Сохраняем задачи в локальное хранилище
function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

items = loadTasks()

items.forEach(item => {
	listElement.append(createItem(item))
})

// Обработчик события для формы
formElement.addEventListener('submit', function(e) {
	e.preventDefault()
	const taskText = inputElement.value;
	listElement.prepend(createItem(taskText))
	items = getTasksFromDOM()
	saveTasks(items)
	inputElement.textContent = ''
})
