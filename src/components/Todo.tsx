import { useState, useEffect } from "react";

/**
 * * A component that renders a to-do list.
 */
const Todo = () => {

	/**
   * The state variable that stores the to-do list data.
   */
	const [todo, setTodo] = useState<{ text: string; completed: boolean }[]>(
		() => JSON.parse(localStorage.getItem("todoList") || "[]")
	);
	const [todoText, setTodoText] = useState<string>("");
	const [editText, setEditText] = useState<string>("");
	const [editIndex, setEditIndex] = useState<number>(-1);

	/**
   * An effect hook that saves the to-do list data to local storage whenever the to-do list data or the edited to-do item index changes.
   */
	useEffect(() => {
		localStorage.setItem("todoList", JSON.stringify(todo));
	}, [todo, editIndex]);

  /**
   * A function that handles the change event for the new to-do item input field. It updates the todoText state variable with the new value.
   *
   * @param event The change event object.
   */
	function handleTodoTextChange(event: React.ChangeEvent<HTMLInputElement>) {
		setTodoText(event.target.value);
	}

  /**
   * A function that handles the change event for the edited to-do item input field. It updates the editText state variable with the new value.
   *
   * @param event The change event object.
   */
	function handleEditTextChange(event: React.ChangeEvent<HTMLInputElement>) {
		setEditText(event.target.value);
	}

  /**
   * A function that adds a new to-do item to the to-do list.
   *
   * @param event The form submit event object.
   */
	function addTodo(event: React.FormEvent) {
		event.preventDefault();
		if (todoText) {
			const newTodo = [...todo];
			newTodo.push({ text: todoText, completed: false });
			setTodo(newTodo);
			setTodoText("");
		}
	}

  /**
   * A function that edits the to-do item at the given index.
   *
   * @param todoIndex The index of the to-do item to edit.
   */
	function editTodo(todoIndex: number) {
		setEditIndex(todoIndex);
		setEditText(todo[todoIndex].text);
	}
	
  /**
   * A function that saves the edited to-do item.
   *
   * @param todoIndex The index of the to-do item to save.
   */
	function saveEdit(todoIndex: number) {
		const updatedTodo = [...todo];
		updatedTodo[todoIndex].text = editText;
		setTodo(updatedTodo);
		setEditIndex(-1);
	}

  /**
   * A function that cancels the editing of the to-do item.
   */
	function cancelEdit() {
		setEditIndex(-1);
	}

  /**
   * A function that toggles the completion status of the to-do item at the given index.
   *
   * @param todoIndex The index of the to-do item to toggle.
   */
	function toggleCompletion(todoIndex: number) {
		const updatedTodo = [...todo];
		updatedTodo[todoIndex].completed = !updatedTodo[todoIndex].completed;
		setTodo(updatedTodo);
	}

  /**
   * A function that deletes the to-do item at the given index.
   *
   * @param todoIndex The index of the to-do item to delete.
   */
	function deleteTodo(todoIndex: number) {
		const updatedTodo = [...todo];
		updatedTodo.splice(todoIndex, 1); //! Remove 1 element at index `todoIndex`
		setTodo(updatedTodo);
	}

	return (
		<div>
			<h1>To Do List</h1>
			
			<form>
				<div className="input-container">
					<label htmlFor="todo-input">New Todo</label>
					<input
						type="text"
						id="todo-input"
						onChange={handleTodoTextChange}
						value={todoText}
					/>
				</div>
				<button className="add-todo-button" onClick={addTodo}>Add</button>
			</form>

			<ul className="todo-list">
				{todo.map((item, index) => (
					<li key={index} className="lists">
						<input
							type="checkbox"
							checked={item.completed}
							onChange={() => toggleCompletion(index)}
						/>
						{editIndex === index ? (
							<input
								className="edit-input"
								type="text"
								value={editText}
								onChange={handleEditTextChange}
							/>
						) : (
							<label className={item.completed ? "completed" : ""}>{item.text}</label>
						)}
						{editIndex === index ? (
							<>
								<button className="save-todo-button" onClick={() => saveEdit(index)}>Save</button>
								<button className="edit-todo-button" onClick={cancelEdit}>Cancel</button>
							</>
						) : (
							<>
								<button onClick={() => editTodo(index)}>Edit</button>
								{item.completed ? (
									<button className="remove-todo-button" onClick={() => deleteTodo(index)}>Delete</button>
								) : (
									<button className="remove-todo-button disabled">Delete</button>
								)}
							</>
						)}
					</li>
				))}
			</ul>

		</div>
	);
};

export default Todo;
