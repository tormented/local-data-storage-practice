var db = new Database();

db.createTable('Tasks', ['text TEXT', 'created_at DATETIME'], db.onSuccess, db.onError);

db.create('Tasks', ['test test', new Date()], db.onSuccess, db.onError);

window.db = db;
