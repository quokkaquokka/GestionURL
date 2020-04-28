import {PLATFORM} from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = '';
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: PLATFORM.moduleName('./welcome'),
        nav: false,
        title: 'Welcome',
        settings:{
          img: ''
        }
      },
      
      {
        route: 'login',
        name: 'login',
        moduleId: PLATFORM.moduleName('./login'),
        nav: true,
        title: '',
        settings:{
          img: 'fas fa-sign-in-alt'
        }
      },
      {
        route: 'myURL',
        name: 'myURL',
        moduleId: PLATFORM.moduleName('./myURL'),
        nav: true,
        title: '',
        settings:{
          img: 'fas fa-link'
        }
      },
      {
        route: 'addURL',
        name: 'addURL',
        moduleId: PLATFORM.moduleName('./addURL'),
        nav: true,
        title: '',
        settings:{
          img: 'fas fa-plus'
        }
      },
      {
        route: 'deleteCategory',
        name: 'deleteCategory',
        moduleId: PLATFORM.moduleName('./deleteCategory'),
        nav: true,
        title: '',
        settings:{
          img: 'far fa-trash-alt'
        }
      },
      {
        route: '/deleteURL/:id',
        name: 'deleteURL',
        moduleId: PLATFORM.moduleName('./deleteURL'),
        nav: false,
        title: '',
      }
      
    ]);

    this.router = router;
  }
}
