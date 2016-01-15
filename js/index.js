function transformObject (obj){
	return Object.keys(obj).map(function (key) {
		return key + '="' + obj[key] + '"'
	}).join(',');
}

var db = new Database();

//db.createTable('Tasks', ['text TEXT', 'created_at DATETIME'], function () {
	//db.create('Tasks', ['test test', new Date()], db.onSuccess, db.onError);
//}, db.onError);


window.db = db;
