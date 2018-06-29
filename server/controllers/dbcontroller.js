db = require("../models");

module.exports = function (app) {

	//Get department by ID
	app.get("/api/department/:id", function (req, res) {
		db.Department.find({
			where: {
				id: req.params.id
			}
		}).then(function (dbDepartment) {
			res.json(dbDepartment);
		});
	});

	//Get user by ID, or by username if not a number
	app.get("/api/user/:id", function (req, res) {
		if (!isNaN(req.params.id)) {
			db.User.find({
				where: {
					id: req.params.id
				}
			}).then(function (dbUser) {
				res.json(dbUser);
			});
		} else {
			db.User.find({
				where: {
					username: req.params.id
				}
			}).then(function (dbUser) {
				res.json(dbUser);
			});
		}


	});

	//Get task by ID
	app.get("/api/task/:id", function (req, res) {
		db.Task.find({
			where: {
				id: req.params.id
			}
		}).then(function (dbTask) {
			res.json(dbTask);
		});
	});

	//Get tasks by department id
	app.get("/api/department/tasks/:id", function (req, res) {
		db.Task.findAll({
			where: {
				department_id: req.params.id
			}
		}).then(function (dbTask) {
			res.json(dbTask);
		});
	});

	//Get incomplete tasks by department id
	app.get("/api/department/:id/incompletetasks", function (req, res) {
		db.Task.findAll({
			where: {
				department_id: req.params.id,
				completed: false
			}
		}).then(function (dbTask) {
			res.json(dbTask);
		});
	});

	//get completed tasks by department id
	app.get("/api/department/:id/completedtasks", function (req, res) {
		db.Task.findAll({
			where: {
				department_id: req.params.id,
				completed: true
			}
		}).then(function (dbTask) {
			res.json(dbTask);
		});
	});

	//Get all projects with the owner id
	app.get("/api/project/owner/:id", function (req, res) {
		db.Owner.findAll({
			where: {
				owner: req.params.id
			}
		}).then(function (dbUser) {
			res.json(dbUser);
		});
	});

	//Get the project id
	app.get("/api/project/:id", function (req, res) {
		db.Project.findAll({
			where: {
				id: req.params.id
			}
		}).then(function (dbProject) {
			res.json(dbProject);
		});
	});

	//Post a new project
	app.post("/api/newproject", function (req, res) {
		var project = req.body;
		db.Project.create({
			project_name: project.name,
			description: project.description,
			owner_id: project.owner
		}).then(function(dbProject) {
			console.log("dbProject added to projects");
			res.status(200).send("project added to db");
		});

	});

	//Post a new user
	app.post("/api/newuser/", function(req, res) {
		var user = req.body;
		db.User.create({
			username: user.username,
			fullname: user.fullname,
			email: user.email,
			password: user.password
		}).then(function(dbUser) {
			console.log("user added to db");
			res.status(200).send("user added to db");
		});
	});

	//Post a new department
	app.post("/api/newdepartment", function(req, res) {
		var department = req.body;
		db.Department.create({
			departmentName: department.name,
			description: department.description,
			project_id: project.project_id
		}).then(function(dbDepartment) {
			console.log("department added to db");
			res.status(200).send("department added to db");
		});

	});

	//Post a new task
	app.post("api/newtask", function(req, res) {
		var task = req.body;
		db.Task.create({
			taskName: task.name,
			description: task.description,
			completed: false,
			department_id: task.department,
			assigned_user: null
		}).then(function(dbTask) {
			console.log("user added to db");
			res.status(200).send("user added to db");
		});
	});

}