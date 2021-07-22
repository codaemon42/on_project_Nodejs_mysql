module.exports = (text, variable) => {
    if(process.env.APP_CONSOLE === 'dev'){
        console.log(`${text} :`, variable);
    }

}