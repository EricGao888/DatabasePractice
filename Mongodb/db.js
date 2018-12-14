// clear db;
// var collectionList = db.getCollectionNames();
// for (var i=0; i<collectionList.length; i++){
// 	db[collectionList[i]].drop();
// }

// create collections;
db.createCollection("Universities");
db.createCollection("Department");
db.createCollection("Employee");
db.createCollection("Graduate");
db.createCollection("Project");
db.createCollection("EmpProject");

// insert documents;
db.Universities.insert(
	[	
		{
			_id: 1,
			univName: "Purdue"
		},
		{
			_id: 2,
			univName: "Maryland"
		},
		{
			_id: 3,
			univName: "UCSB"
		}
	]

);

db.Department.insert(
	[
		{
			_id: 1,
			deptName: "Development"
		},
		{
			_id: 2,
			deptName: "UX Design"
		},
		{
			_id: 3,
			deptName: "Technical Architects"
		}
	]	
);

db.Project.insert(
	[
		{
			_id: 1,
			projectName: "Mobile"
		},
		{
			_id: 2,
			projectName: "UTC"
		},
		{
			_id: 3,
			projectName: "QA"
		}	
	]
);

// insert collections with reference


db.Employee.insert(
	[
		{	
			_id: 1,
			name: "Alice", 
			Department_id: 1,
			zip: 47900,
			salary: 70000
		},
		{
			_id: 2,
			name: "Bob",
			Department_id: 1,
			zip: 47905,
			salary: 80000
		},
		{
			_id: 3,
			name: "Charles",
			Department_id: 2,
			zip: 47900, 
			salary: 65000 
		},
		{
			_id: 4,
			name: "David",
			Department_id: 3,
			zip: 47910,
			salary: 70000
		},
		{
			_id: 5,
			name: "Erin",
			Department_id: 3,
			zip: 47906,
			salary: 90000
		},
	]
);

db.Graduate.insert(
	[
		{
			Employee_id: 1,
			Universities_id: 1,
			year: 1995
		},
		{
			Employee_id: 2,
			Universities_id: 1,
			year: 2012
		},
		{
			Employee_id: 3,
			Universities_id: 3,
			year: 1999
		},
		{
			Employee_id: 4,
			Universities_id: 2,
			year: 2001
		},
		{
			Employee_id: 5,
			Universities_id: 3,
			year: 2014
		}
	]
);

db.EmpProject.insert(

	[
		{
			Employee_id: 1,
			Project_id: 1
		},
		{
			Employee_id: 2,
			Project_id: 1
		},
		{
			Employee_id: 3,
			Project_id: 1
		},
		{
			Employee_id: 3,
			Project_id: 2
		},
		{
			Employee_id: 2,
			Project_id: 3
		},
		{
			Employee_id: 5,
			Project_id: 3
		},
		{
			Employee_id: 4,
			Project_id: 3
		}
	]

);




// print collections
// collectionList = db.getCollectionNames();
// print(collectionList);

print("Universities: ")
cursor = db.Universities.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

print("Department: ")
cursor = db.Department.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

print("Employee: ")
cursor = db.Employee.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

print("Graduate: ")
cursor = db.Graduate.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

print("Project: ")
cursor = db.Project.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

print("EmpProject: ")
cursor = db.EmpProject.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

