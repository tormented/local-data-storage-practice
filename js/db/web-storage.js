function Database(){
	this.storage = localStorage;
}

Database.prototype.get = function (key) {
	return JSON.parse(this.storage.getItem(key));
};

Database.prototype.create = function (key, value) {
	this.storage.setItem(key, JSON.stringify(value));
};

Database.prototype.update = function (key, value) {
	this.storage.setItem(key, JSON.stringify(value));
};

Database.prototype.remove = function (key) {
	this.storage.removeItem(key);
};
