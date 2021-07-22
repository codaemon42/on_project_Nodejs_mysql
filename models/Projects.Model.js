const Model = require('./model');

class ProjectsModel extends Model{

    constructor(){
        super();
        this.tableName = 'on_Projects';
        this.notesTable = 'on_notes';
    }


    findWithNotes(data, cb){
        const sql = `SELECT * FROM ${this.tableName} INNER JOIN ${this.notesTable} ON ${this.tableName}.notes = ${this.notesTable}.id`;
    }

}

module.exports = new ProjectsModel();