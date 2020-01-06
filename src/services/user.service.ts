import { Injectable } from "@angular/core";
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { User } from '../interfaces/user.interface';


@Injectable()
export class UserService {

    isAuth = false;
    user: any;

    constructor(private dbService: NgxIndexedDBService) {
        dbService.currentStore = 'user';
    }

    async testUser(){
        return await this.dbService.getAll()
    }

    clearDB(){
        this.dbService.clear().then(
            () => {
                // Do something after clear
            },
            error => {
                console.log(error);
            }
        );
    }

    login(username?: string, password?: string) {
        return new Promise((resolve, reject) => {
            this.dbService.getByIndex('username', username)
                .then(user => {
                    if (user) {
                        if (user.password == atob(password)) {
                            this.isAuth = true;
                            this.user = user;
                            resolve(user)
                        }
                        else {
                            this.isAuth = false;
                            let err = new Error('login failled')
                            reject(err);
                        }
                    }
                    else {
                        this.isAuth = false;
                        let err = new Error('login failled')
                        reject(err);
                    }
                })
                .catch(err => reject(err))
        })
    }

    register(username: string, password : string, lastname?: string, firstname?: string, birthday?: string, sex?: string, profile?: Blob, locations?: any[]) {
        let user = {
            username : username,
            password : atob(password),
            lastname : lastname,
            firstname : firstname,
            birthday : birthday,
            sex : sex,
            profile : profile,
            locations : locations,
        }
        return new Promise((resolve, reject) => {
            this.dbService.add(user)
                .then(() => {
                    this.isAuth = true;
                    this.user = user;
                    resolve();
                })
                .catch(err => reject(err))
        })
    }

    private checkifShouldUpdate(old_obj , new_obj){
        let keys = Object.keys(old_obj);
        let new_keys = Object.keys(new_obj);
        let final_object = {}
        keys.forEach(key=>{
            final_object[key] = new_keys.includes(key) ? new_obj[key] : old_obj[key]
        })

        return final_object;

    }

    updateProfile(infos: any) {
        return new Promise((resolve, reject) => {
            if (this.isAuth) {
                if(infos['password']){
                    infos['password'] = atob(infos['password'])
                }
              let updatedInfo = this.checkifShouldUpdate(this.user , {...infos})
                this.dbService.update(updatedInfo)
                    .then(() => {
                        this.dbService.getByID(this.user.id)
                        .then(user=>{
                            this.user = user;
                            resolve()
                        })
                        .catch(err => reject(err));
                    })
                    .catch(err => reject(err))
            }
            else {
                let err = new Error("you are not auhtenticated");
                return reject(err);
            }
        })
    }

}