// Query 1

cursor1 = db.Employee.find({},{name:1, Department_id: 1});
while ( cursor1.hasNext() ) {
	var res = JSON.parse(JSON.stringify(cursor1.next()));
	var id = res["_id"]
	var name = res["name"];
	var dept_id = res["Department_id"];
	cursor2 = db.Department.find({_id:dept_id},{deptName:1});
	res = JSON.parse(JSON.stringify(cursor2.next()));
	var department = res["deptName"];
	cursor2 = db.Graduate.find({Employee_id:id},{Universities_id:1, year: 1});
	res = JSON.parse(JSON.stringify(cursor2.next()));
	var year = res["year"];
	var univ_id = res["Universities_id"];
	cursor2 = db.Universities.find({_id:univ_id},{univName:1});
	res = JSON.parse(JSON.stringify(cursor2.next()));
	var university = res["univName"];
	print(name+", "+department+", "+university+", "+year.toString());
}

// Query 2
var id_list = [];
cursor1 = db.Employee.find({},{name:1});
while ( cursor1.hasNext() ) {
	var res = JSON.parse(JSON.stringify(cursor1.next()));
	id = res["_id"];
	cnt = db.EmpProject.find({Employee_id:id}).count();
	if(cnt == 1){
		id_list.push(id);
	}
}

for(var i=0;i<id_list.length;i++){
	id = id_list[i];
	cursor2 = db.Employee.find({_id: id},{name:1});
	res = JSON.parse(JSON.stringify(cursor2.next()));
	name = res["name"];
	cursor2 = db.Graduate.find({Employee_id: id},{year:1});
	res = JSON.parse(JSON.stringify(cursor2.next()));
	year = res["year"];
	print(name+", "+year);
}

// Query 3 
cursor1 = db.Employee.find( { $or: [ { zip: 47906 }, { price: 47907 } ] }, {name: 1} );
while ( cursor1.hasNext() ) {
	var res = JSON.parse(JSON.stringify(cursor1.next()));
	var name = res["name"];
	print(name);
}

// Query 4
cursor1 = db.Employee.aggregate(
   [
     { $group : { _id : "$Department_id", count: { $sum: 1 }} },
     { $sort: { count: -1 } }
   ]
);

while(cursor1.hasNext()){
	var res = JSON.parse(JSON.stringify(cursor1.next()));
	id = res["_id"];
	var count = res["count"];
	cursor2 = db.Department.find({_id: id});
	res = JSON.parse(JSON.stringify(cursor2.next()));
	department = res["deptName"];
	print(department+", "+count.toString());
}

// //Query 5 
cursor1 = db.Graduate.aggregate(
   [
     { 
     	$group: 
     	{
     		_id : "$Universities_id", 
     		count: { $sum: 1 } 
     	}
     },
     { $sort: { count: -1 } }
   ]
);

var res = JSON.parse(JSON.stringify(cursor1.next()));
var maxGraduate = res["count"];

cursor1 = db.Graduate.aggregate(
   [
     { 
     	$group: 
     	{
     		_id : "$Universities_id", 
     		count: { $sum: 1 } 
     	}
     },
     {$match:{count:{$gte: maxGraduate}}}
   ]
);

while(cursor1.hasNext()){
	var res = JSON.parse(JSON.stringify(cursor1.next()));
	id = res["_id"];
	cursor2 = db.Universities.find({_id: id});
	res = JSON.parse(JSON.stringify(cursor2.next()));
	university = res["univName"];
	print(university);
}

// // Query 6
cursor1 = db.Department.find({deptName: "Development"});
var res = JSON.parse(JSON.stringify(cursor1.next()));
dept_id = res["_id"];
cursor2 = db.Employee.find({Department_id: dept_id},{name: 1});
while(cursor2.hasNext()){
	var res = JSON.parse(JSON.stringify(cursor2.next()));
	print(res["name"]);
}

// // Query 7
var id_list=[];
cursor1 = db.Project.find({projectName: "Mobile"});
var res = JSON.parse(JSON.stringify(cursor1.next()));
project_id = res["_id"];
cursor1 = db.EmpProject.find({Project_id: project_id},{Employee_id: 1});
while(cursor1.hasNext()){
	res = JSON.parse(JSON.stringify(cursor1.next()));
	id_list.push(res["Employee_id"]);
}
for(var i=0; i<id_list.length; i++){
	db.Employee.update(
		{ _id: id_list[i]},
		{ $inc: { salary: 10000 } }
	);
}

cursor1 = db.Employee.find();
while(cursor1.hasNext()){
	printjson(cursor1.next());
}

// // Query 8
var id_list=[];
cursor1 = db.Universities.find({univName: "Purdue"});
var res = JSON.parse(JSON.stringify(cursor1.next()));
var univ_id = res["_id"];
cursor1 = db.Graduate.find({Universities_id: univ_id},{Employee_id:1});
while(cursor1.hasNext()){
	res = JSON.parse(JSON.stringify(cursor1.next()));
	id_list.push(res["Employee_id"]);
}
for(var i = 0; i<id_list.length; i++){
	db.EmpProject.deleteMany({Employee_id: id_list[i]});
}
cursor1 = db.EmpProject.find();
while(cursor1.hasNext()){
	printjson(cursor1.next());
}

// // Query 9
cursor1 = db.Project.find({projectName: "QA"});
var res = JSON.parse(JSON.stringify(cursor1.next()));
var proj_id = res["_id"];
db.Project.deleteMany({projectName: "QA"});
db.EmpProject.deleteMany({Project_id: proj_id});
cursor1 = db.Project.find();
while(cursor1.hasNext()){
	printjson(cursor1.next());
}
cursor1 = db.EmpProject.find();
while(cursor1.hasNext()){
	printjson(cursor1.next());
}

// Query 10
cursor1 = db.Employee.find({name: "Charles"});
var res = JSON.parse(JSON.stringify(cursor1.next()));
var id = res["_id"];
db.Employee.deleteMany({name: "Charles"});
db.EmpProject.deleteMany({Employee_id: id});
db.Graduate.deleteMany({Employee_id: id});
cursor1 = db.Employee.find();
while(cursor1.hasNext()){
	printjson(cursor1.next());
}
cursor1 = db.EmpProject.find();
while(cursor1.hasNext()){
	printjson(cursor1.next());
}
cursor1 = db.Graduate.find();
while(cursor1.hasNext()){
	printjson(cursor1.next());
}



