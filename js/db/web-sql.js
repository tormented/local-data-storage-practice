function Database(){
	this.storage = openDatabase('todo', '1.0', 'my todo database', 2 * 1024 * 1024);
}

Database.prototype.createTable = function (name, fields, onSuccess, onError) {
	this.storage.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS '+ name +' ('+ fields.join(',') +')', [], onSuccess, onError)
	});
};

Database.prototype.create = function (table, values, onSuccess, onError) {
	this.storage.transaction(function (tx) {
		tx.executeSql('INSERT INTO '+ table +'(text, created_at) VALUES (?,?)', values, onSuccess, onError)
	});
};

Database.prototype.get = function (table, sField, sCriteria, onSuccess, onError) {
	this.storage.transaction(function (tx) {
		tx.executeSql('SELECT '+ sField.join(',') + ' FROM ' + table + 'WHERE', values, onSuccess, onError)
	});
};


Database.prototype.onSuccess = function (tx, data) {
	console.log(data)
};

Database.prototype.onError = function (tx, err) {
	console.log('error');
	console.log(err);
};