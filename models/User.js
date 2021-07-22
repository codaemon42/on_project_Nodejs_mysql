const { DB } = require('../configuration');
const { userValidator, loginValidator, signupSchema, signupValidator } = require('../validator');
const { hashSync, compareSync } = require('bcryptjs');
const createError = require('http-errors');


class User {

    constructor(userData) {
        this.userData = {...userData};
    }


    /**
     * Insert new users to on_users table
     * @param {*} cb 
     */
    save(cb) {
        try{
            console.log("got into save function");
            const hashedPass = hashSync(this.userData['password'], 12 );
            this.userData['password'] = hashedPass;
            this.userData['verified'] = false;

            console.log("hashedPass", this.userData['password']);
            const sql = `INSERT INTO on_users (name, username, email, password, role, subordinates, verified)
                VALUES ('${this.userData['name']}', '${this.userData['username']}', '${this.userData['email']}', '${this.userData['password']}', 
                '${this.userData['role']}', '${this.userData['subordinates']}', '${this.userData['verified']}')`;
            DB.query(sql, (err, results, fields)=>{
                DB.errorHandler(err);

                cb();
            })

        }catch(error){
            cb(error);
        }
    }



    /**
     * check if name or email is already registered
     * @returns promises
     */
    checkExistance() {
        return new Promise( (resolve, reject) => {
            try{
                console.log("this.userData: ", this.userData);
                const sql = `SELECT * FROM on_users WHERE email='${this.userData.email}' OR username='${this.userData.username}'`;
                DB.query(sql, (err, results, fields)=>{
                    console.log(results);
                    DB.errorHandler(err);
                    if(results.length === 0) {
                        resolve({
                            check: false
                        })
                    }
                    else if( this.userData['email'] === results[0].email ) {
                        console.log(results[0]);
                        console.log(results[0].role);
                        console.log(results[0].role.split(','));
                        const role = results[0].role.split(',');
                        role.push('4')
                        console.log(role);
                        resolve({
                            check: true,
                            message: 'This email is already in use'
                        });
                    }
                    else if( this.userData['username'] === results[0].username ) {
                        resolve({
                            check: true,
                            message: 'This username is already in use'
                        });
                    }
                })
            }catch(err){
                console.log(err);
                return next(createError(500));
            }
        });
    }

    
    /**
     * validate userData with signUp Schema
     * @param {*} userData 
     * @returns 
     */
    static validator(userData) {
        return signupValidator.validate(userData);
    }


    /**
     * login method
     * @param {*} userData | login schema
     * @returns 
     */
    static login(userData){
        return new Promise((resolve,  reject) => {
            //validation
            const validation = loginValidator.validate(userData);            
            if( validation.error ) {
                const error = new Error(validation.error.message);
                error.statusCode = 404;
                return resolve(error);
            }
            //query
            try{
                const sql = `SELECT * FROM on_users WHERE username='${userData['username']}' 
                            OR email='${userData['email']}' LIMIT 1`;
                DB.query( sql, (err, results, fields)=>{
                    DB.errorHandler(err);
  
                    const user = results[0];
                    if(!user || !compareSync(userData['password'], user.password)){
                        const error = new Error('Please enter valid username and password');
                        error.statusCode = 404;
                        return resolve(error);
                    }
                    resolve(user);
                })
            }catch(err){
                reject(err);
            }
        })
    }

    /**
     * add capabilities to user => role & subordinates
     * @param {*} userData as username|email, 
     * return error|boolean:true
     */
    static addCapability(userData) {
        this.getUser(userData).then(data => {
            if( data instanceof Error){
                return next(data);
            }

            if(!userData.newRole && !userData.newSubordinates){
                return next(createError(400));
            }
            let sql = 'UPDATE on_users ';
            if(userData.newRole){
                const role = data.role.split(',');
                        console.log("prevRole :",role);
                if(role.includes(userData.newRole)){
                        console.log('check: ',role);
                    const error = new Error('This role has already been assigned to the user');
                    error.statusCode = 400;
                    return error;
                }
                role.push(userData.newRole);
                        console.log("newRole :",role);
                sql += `SET role='${role}' `;
            }
            if(userData.newSubordinates){
                const subordinates = data.subordinates.split(',');
                            console.log("prevSubordinates :",subordinates);
                if(role.includes(userData.newSubordinates)){
                            console.log('check: ',subordinates);
                    const error = new Error('This subordinate has already been assigned to the user');
                    error.statusCode = 400;
                    return error;
                }
                subordinates.push(userData.newSubordinates);
                            console.log("newSubordinates :",subordinates);
                sql += `, subordinates='${subordinates}' `;
            }
            try{
                sql += `WHERE username='${userData.username}' OR email='${userData.email}'`;
                DB.query(sql, (err, results, fields)=>{
                    DB.errorHandler(err);

                    return true;
                });
            }catch(errs){
                        console.log(errs);
                return next(createError(500));
            }

        }).catch(err=>{
                    console.log(err);
            return next(createError(500));
        })

    }

    /**
     * get user by username|email
     * @param {*} userData 
     * @returns Promise: error|json
     */
    static getUser(userData) {
        return new Promise((resolve, reject)=>{
            try{
                const sql = `SELECT * FROM on_users
                WHERE username='${userData.username}'
                OR email='${userData.username}'
                `;
                DB.query(sql, (err, results, fields)=>{
                    console.log(results);
                    DB.errorHandler(err);
                    resolve(results[0]) 
                });
            }catch(error){
                console.log(error);
                reject(error);
            }
        })
    }

    /**
     * fetch user roles
     * @param {*} userId 
     * @param {*} role 
     * @returns error | array 
     */
     static getRoles(userId, cb){
        try{
            DB.query(`SELECT * FROM on_users WHERE id='${userId}' LIMIT 1`, async (err, results, fields)=>{
                if(err) return err;
                const roles = results[0].role.split(',');
                console.log("role : ", roles);
                await cb(roles);
            });
        }
        catch(err){
            return createError(500);
        }
    }

    static getRolesP(userId){
        return new Promise( (resolve, reject)=>{
            try{
                DB.query(`SELECT * FROM on_users WHERE id='${userId}' LIMIT 1`, (err, results, fields)=>{
                    if(err) return resolve(err);
                    const roles = results[0].role.split(',');
                    console.log("role : ", roles);
                    resolve(roles);
                });
            }
            catch(err){
                return reject(createError(500));
            }
        });

   }

   static rolePresent(userId, roles){
    // $users = array(1,2,3,4,5);
    // $usersStr = implode(',', $users); // returns 1,2,3,4,5
    // $sql = "SELECT * FROM users where id in ({$userStr})";
   }

}


module.exports = User;