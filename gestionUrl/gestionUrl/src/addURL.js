import { PLATFORM } from "aurelia-pal";
import { computedFrom } from "aurelia-framework";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import axios from "axios";
//require('bootstrap/dist/css/bootstrap.min.css');
//require('bootstrap');

@inject(Router)
export class AddURL {

  activate() {
    return this.getCategories();
  }

  async getCategories() {
    const response = await axios.post("http://localhost:8000/api/categories");
    this.categories = response.data;
  }

  constructor(router) {
    this.router = router;
    this.categories = [];
    this.categoryName = null;
    this.selectedCategoryId = null;
  }

  submit() {
    const params = {
      title: this.title,
      url: this.urlLink,
      idCategory: this.selectedCategoryId,
      titleCategory: this.categoryName,
      description: this.description,
      keyWord: this.keyWords
    }

    return axios
      .post("http://localhost:8000/api/addUrl", params)
      .then(response => {
          this.router.navigate("myURL");
      })
      .catch(function(error) {
        console.log(error);
        var span = document.getElementById("error");
        var txt = document.createTextNode("Invalid credential");
        span.appendChild(txt);
      });
  }
}
