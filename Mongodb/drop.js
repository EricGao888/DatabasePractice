collectionList = ["Universities","Department","Employee","Graduate","Project","EmpProject"];
for (var i=0; i<collectionList.length; i++){
	db[collectionList[i]].drop();
}