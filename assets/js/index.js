$(document).ready(() => {
	console.log('Running 🏃‍');
	
	getTasks();
	let edit = false;

	//ADD TASK AND UPDATE TASK
	$("#form-task").submit((e) => {
		e.preventDefault();
		let taskName = $('#task-name').val();
		let taskDescription = $('#task-description').val();
		let taskId = $('#task-id').val();

		let task = {
			taskName,
			taskDescription
		}
		let editTask = {
			taskName,
			taskDescription,
			taskId : taskId

		}

		let url = edit === false ? "server/add-task.php" : "server/update-task.php"; //Si edit es false, se agrega una tarea, sino se actualiza una tarea

		let data = edit === false ? task : editTask; //Si edit es false, se toma los valores sin id, sino se toma los valores con id
		
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: (response) => {
				getTasks();
				const message = JSON.parse(response);
				console.log(message.message);
				edit = false;
				$('#form-task').trigger('reset');
			}
		});

	});

	//GET TASKS
	function getTasks(){
		$.ajax({
			type: "GET",
			url: "server/get-tasks.php",
			success: (response) => {
				const tasks = JSON.parse(response);
				let template = '';
					tasks.forEach((task, id) => {
						template += `<tr >
							<td id="${task.task_id}" class="id-task" >${id + 1}</td>
							<td><a href="#" class="item-task">${task.task_name}</a></td>
							<td>${task.task_description}</td>
							<td>
								<button class="delete-task btn btn-danger">Eliminar</button>
							</td>
							<td>
								<button class="edit-task btn btn-warning" data-toggle="modal" data-target="#form-modal">Editar</button>
							</td>
							</tr>`;
					});
				
				
				$('#tasks').html(template);
			}
		});
	}

	//GET TASK BY NAME
	/* $('#search-task').keyup((e) => {
		e.preventDefault();
		let taskName = $('#search-task').val();
		let task = getTask(taskName);
		template = '';
		task.forEach((task, id) => {
			template += `<tr >
				<td id="${task.task_id}" class="id-task" >${id + 1}</td>
				<td><a href="#" class="item-task">${task.task_name}</a></td>
				<td>${task.task_description}</td>
				<td>
					<button class="delete-task btn btn-danger">Eliminar</button>
				</td>
				<td>
					<button class="edit-task btn btn-warning">Editar</button>
				</td>
				</tr>`;
				console.log(task);
		});
		$('#tasks').html(template);
		console.log(task);
	}); */

	function getTask(task){
		$.ajax({
			type: "POST",
			url: "server/get-one-task.php",
			data: { task },
			success: (response) => {
				const taskName = JSON.parse(response);
				console.log(taskName);
			}
		});
	}

	//DELETE TASK
	$(document).on('click', '.delete-task', (e) => {
		e.preventDefault();
		let id = $(e.target).closest('tr').find('.id-task')[0].id;
		let confirmDeleteTask = confirm('¿Estas seguro de eliminar esta tarea?');
		if(confirmDeleteTask){
			$.ajax({
				type: "POST",
				url: "server/delete-task.php",
				data: { id },
				success: (response) => {
					getTasks();
					const message = JSON.parse(response);
					console.log(message.message);
				}	
			});
		}
	});
	

	//EDIT TASK
	$(document).on('click', '.edit-task', (e) => {
		e.preventDefault();
		let id = $(e.target).closest('tr').find('.id-task')[0].id;
		$.ajax({
			type: "POST",
			url: "server/select-task.php",
			data: { taskId : id },
			success: (response) => {
				const taskSelected = JSON.parse(response);
				$('#task-name').val(taskSelected.task_name);
				$('#task-description').val(taskSelected.task_description);
				$('#task-id').val(taskSelected.task_id);
				edit = true;
			}
		});
	});

	//RESET EDIT
	$(document).on('click', '.close', (e) => {
		e.preventDefault();
		edit = false;
	})

});