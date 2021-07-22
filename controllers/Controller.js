
class Controller {

    async parent() {
        return new Promise(resolve=>{
            setTimeout(() => {
              resolve(true);
            }, 2000);
        });
      }

    async errorHandler(err){
        return new Promise(resolve=>{
            if(err instanceof Error){
                resolve(true);
            }
            else{
                resolve(false);
            }
        })
    }
}

module.exports = Controller;