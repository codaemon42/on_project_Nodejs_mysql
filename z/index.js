const fs = require('fs');

create('Uploads');

function create(name){
    createFile( name, 'controllers', 'Controller' );
    createFile( name, 'models', 'Model' );
    createFile( name, 'validator', 'Validator' );
    createFile( name, 'routes', 'Router' );
}


function createFile(name, folder, fileCapitalize){
    const termToReplace = 'name';
    const ctrlReadFile = `z/${folder}.js`;
    const ctrlWriterFile = `${folder}/${name}.${fileCapitalize}.js`;

    fs.readFile(ctrlReadFile, {flag: 'r'}, (err, res)=>{
        const data = res.toString();
        const newData = data.split(termToReplace).join(name);
        console.log("newData : ",newData);

        fs.writeFile(ctrlWriterFile, newData, (err)=>{
            if(err) {
                console.log(err);
            }
            else{
                console.log("controller file created !!!");
            }
        })
    });

    if( folder !== 'routes' ) {
        assignFile(name, folder, fileCapitalize);
    }
}


function assignFile(name, folder, fileCapitalize){
    const searchTerm = 'module.exports = {';
    const ctrlIndexFile = `${folder}/index.js`;

    fs.readFile(ctrlIndexFile, {flag: 'r'}, (err, res)=>{
        const data = res.toString();
        const searchPosition = data.search(searchTerm)+searchTerm.length+1;
        const pre = data.slice(0, searchPosition);
        const suf = data.slice(searchPosition, -1);
        const toAdd = `
    ${name}${fileCapitalize}: require('./${name}.${fileCapitalize}'),`;
        const newData = pre + toAdd + suf;
        console.log("newData  : ", newData);
    
        fs.writeFile(ctrlIndexFile, newData, (err)=>{
            if(err) {
                console.log(err);
            }
            else{
                console.log("index file created !!!");
            }
        })
    })
}

