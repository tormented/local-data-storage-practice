function Database(){
	this.storage = openDatabase('todo', '1.0', 'my todo database', 2 * 1024 * 1024);
}

Database.prototype.createTable = function (name, fields, onSuccess, onError) {
	console.log('CREATE TABLE IF NOT EXISTS '+ name +' ('+ fields.join(',') +')');
	this.storage.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS '+ name +' ('+ fields.join(',') +')', [], onSuccess, onError)
	});
};

Database.prototype.create = function (table, values, onSuccess, onError) {
	console.log('INSERT INTO '+ table +'(text, created_at) VALUES (?,?)', values);
	this.storage.transaction(function (tx) {
		tx.executeSql('INSERT INTO '+ table +'(text, created_at) VALUES (?,?)', values, onSuccess, onError)
	});
};

Database.prototype.get = function (table, field, condition, onSuccess, onError) {
	console.log('SELECT '+ field.join(',') + ' FROM ' + table + ' WHERE ' + transformObject(condition));
	this.storage.transaction(function (tx) {
		tx.executeSql('SELECT '+ field.join(',') + ' FROM ' + table + ' WHERE ' + transformObject(condition), [], onSuccess, onError)
	});
};

Database.prototype.update = function (table, updatedFields, condition, onSuccess, onError) {
	console.log('UPDATE '+  table + ' SET ' + transformObject(updatedFields) + ' WHERE ' + transformObject(condition));
	this.storage.transaction(function (tx) {
		tx.executeSql('UPDATE '+  table + ' SET ' + transformObject(updatedFields) + ' WHERE ' + transformObject(condition) , [], onSuccess, onError)
	});
};

Database.prototype.remove = function (table, condition, onSuccess, onError) {
	console.log('DELETE FROM '+  table + ' WHERE ' + transformObject(condition));
	this.storage.transaction(function (tx) {
		tx.executeSql('DELETE FROM '+  table + ' WHERE ' + transformObject(condition) , [], onSuccess, onError)
	});
};

Database.prototype.onSuccess = function (tx, data) {
	console.log(data)
};

Database.prototype.onError = function (tx, err) {
	console.log('error');
	console.log(err);
};
