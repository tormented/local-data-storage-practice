function Database(){
	var that = this,
		indexedDB = window.indexedDB || window.webkitIndexedDB,
		open = indexedDB.open('todo', 1);

	open.onupgradeneeded = function(event) {
		var thisDB = event.target.result;

		if(!thisDB.objectStoreNames.contains("Tasks")) {
			thisDB.createObjectStore("Tasks", { keyPath: "id", autoIncrement: true});
		}
	};

	open.onsuccess = function(event) {
		that.db = event.target.result;
	};

}

Database.prototype.create = function (data, onSuccess, onError) {
	var transaction = this.db.transaction(["Tasks"], 'readwrite'),
		objectStore = transaction.objectStore("Tasks"),
		request = objectStore.add(data);

	request.onsuccess = function(event) {
		onSuccess(event.target);
	};

	request.onerror = function(event) {
		onError(event.target);
	};
};

Database.prototype.get = function (key, onSuccess, onError) {
	var transaction = this.db.transaction(["Tasks"]),
		objectStore = transaction.objectStore("Tasks"),
		request = objectStore.get(key);

	request.onsuccess = function(event) {
		onSuccess(event.target.result);
	};

	request.onerror = function(event) {
		onError(event.target);
	};
};

Database.prototype.update = function (key, data, onSuccess, onError) {
	var transaction = this.db.transaction(["Tasks"], 'readwrite'),
		objectStore = transaction.objectStore("Tasks"),
		request = objectStore.get(key);

	request.onsuccess = function(event) {
		data.id = key;
		Object.keys(data).forEach(function (dataKey) {
			request.result[dataKey] = data[dataKey];
		});
		objectStore.put(request.result);
		onSuccess(event.target.result);
	};

	request.onerror = function(event) {
		onError(event.target);
	};
};

Database.prototype.remove = function (key, onSuccess, onError) {
	var transaction = this.db.transaction(["Tasks"], 'readwrite'),
		objectStore = transaction.objectStore("Tasks"),
		request = objectStore.delete(key);

	request.onsuccess = function(event) {
		onSuccess(event.target.result);
	};

	request.onerror = function(event) {
		onError(event.target);
	};
};