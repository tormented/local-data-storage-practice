function Database(){
	this.db = persistence.store.websql.config(persistence, 'todo', 'my todo database', 2 * 1024 * 1024);
	this.storage = {
		Tasks: persistence.define('Task', {
			text: "TEXT",
			created_at: "TEXT",
			done: "BOOL"
		})
	};
	persistence.schemaSync();
}

Database.prototype.get = function (key, onSuccess, onError) {
	this.storage.Tasks
		.all()
		.filter('id', '=', key)
		.one(function (result) {
			if(result) {
				onSuccess(result)
			}else{
				onError('no task', result);
			}
		});
};

Database.prototype.create = function (data, onSuccess, onError) {
	var task = new this.storage.Tasks(data);

	if(task){
		persistence.add(task);
		persistence.flush(function () {
			onSuccess(task);
		});
	}else{
		onError('fail create')
	}
};

Database.prototype.update = function (key, data, onSuccess, onError) {
	this.storage.Tasks
		.all()
		.filter('id', '=', key)
		.one(function(result){
			if(result){
				Object.keys(data).forEach(function(resultKey){
					result[resultKey] = data[resultKey];
				});
				console.log(result);

				persistence.flush(function(){
					onSuccess(result)
				});
			}else{
				onError('fail update')
			}
		});
};

Database.prototype.remove = function (key, onSuccess, onError) {
	this.storage.Tasks
		.all()
		.filter('id', '=', key)
		.one(function(result){
			if(result){
				persistence.remove(result);
				persistence.flush(function () {
					onSuccess('done')
				});
			}else{
				onError('fail remove')
			}
		});
};
