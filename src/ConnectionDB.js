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

export function getAllCurrentTask(db, date)
{
    return db.allTasks
        .where("date")
        .between(
            new Date(date.setHours(0, 0, 0, 0)),
            new Date(date.setHours(23, 0, 0, 0)))
        .and(
            function (value) {
                        return value.complete === 0
            }
        );
}

export function getAllOverdueTask(db, date)
{
    return db.allTasks
        .where("date")
        .below(new Date(date.setHours(0, 0, 0, 0)))
        .and(
            function (value) {
                return value.complete === 0
            }
        );
}

export function getAllCompleteTask(db)
{
    return db.allTasks
        .where("complete")
        .equals(1);
}

export default db;