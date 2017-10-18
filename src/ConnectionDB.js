import Dexie from 'dexie';

const db = new Dexie('tasks');
db.version(1).stores({
    allTasks: `hash, description, name, date, comment, overdue, complete`
});

export function addNewTasksOrUpdate(db, task){
    db.allTasks
        .where("hash").equals(parseInt(task.hash, 10))
        .count ((value) =>
        {
            if (value > 0) {
                db.allTasks
                    .where("hash").equals(parseInt(task.hash, 10))
                    .modify((result) => {
                    result.name = task.name;
                    result.comment = task.comment;
                    result.description = task.description;
                    result.date = task.date;
                });
            } else {
                db.allTasks.add(task);
            }
        })

}

export function getAllTasks(db) {
    return db.allTasks.where('hash').notEqual(0);
}

export function modifyTask(db, hash){
    db.allTasks
        .where("hash").equals(parseInt(hash, 10))
        .modify((task) => {task.complete = 1});
}

export function modifyExecutedTask(db, hash){
    db.allTasks
        .where("hash").equals(parseInt(hash, 10))
        .modify((task) => {task.complete = 0});
}

export default db;