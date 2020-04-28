import {PLATFORM} from 'aurelia-pal';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import axios from 'axios';

@inject(Router)
export class Login {

    constructor(router) {
        this.router = router;
    }

    submit() {
        return axios.post('http://localhost:8000/auth/login', { login: `${this.mail}`, password: `${this.password}`})
        .then( (response) => {
            if(response.data === 'OK')
            {
                this.router.navigate("myURL");
            }
            else if(response.data === 'fail'){
                var span = document.getElementById("error");
                var txt = document.createTextNode("Error the link not saves");
                span.appendChild(txt);

            }
          })
        .catch(function (error) {
            console.log(error);
          });

    }

    
};