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
		objectStore = transaction.objectStore("Tasks");

	objectStore.get(key).onsuccess = function(event) {
		var item = event.target.result;

		item = data;
		var request = objectStore.put(item);

		request.onsuccess = function(e) {
			console.log("Added Employee");
		};

		request.onerror = function(e) {
			console.log(e.value);
		};

		objectStore.get(key).onsuccess = function(event) {
			onSuccess(event.target);
		};
	};
	objectStore.get(key).onerror = function(event) {
		onError(event.target);
	};
};