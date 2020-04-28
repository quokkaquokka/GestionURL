import { PLATFORM } from "aurelia-pal";
import { computedFrom } from "aurelia-framework";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import axios from "axios";


@inject(Router)
export class MyURL {

  constructor(router) {
    this.router = router;
    this.categories = [];
    this.selectidCategory = null;
    this.urls = [];
    this.urldetail = [];
    this.selectidURL = null;
    this.catTitle = null;
  }

  activate() {
    return this.getCategories();
  }

  async getCategories() {
    const response = await axios.post("http://localhost:8000/api/categories");
    this.categories = response.data;
  }
  redirectionaddURL() {
    this.router.navigate("addURL");
  }

  async geturl() {
    const response = await axios.post("http://localhost:8000/api/urls",
    {
      idCategory: this.selectidCategory
    });
    this.urls= response.data;
  }

  async detail() {
    const response = await axios.post("http://localhost:8000/api/url",
    {
      idURL: this.selectidURL
    });
    this.urldetail = response.data;
    const category = this.categories.find( category => {
      return category.catid === this.selectidCategory
  
    })
    this.catTitle = category.title;
  }

  async search(){
    
    const response = await axios.post("http://localhost:8000/api/keywords",
    {
      keyWord: this.keyWords
    });
    this.urls = response.data;
  }


  
}