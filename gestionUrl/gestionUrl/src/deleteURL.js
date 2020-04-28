import { PLATFORM } from "aurelia-pal";
import { computedFrom } from "aurelia-framework";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import axios from "axios";
import { DeleteCategory } from "./deleteCategory";

@inject(Router)
@inject(DeleteCategory)
export class DeleteURL {

  constructor(router, deleteCategory) {
    this.router = router;
    this.urls = [];
    //this.deleteCategory = deleteCategory; 
  }

  activate(params) {
    console.log(params.id);
    //catId = this.deleteCategory.getidCategory();
    const catId = params.id
    return this.getURLs(catId);
  }

  async getURLs(catId) {
    console.log(catId);
    const response = await axios.post("http://localhost:8000/api/urls",
    {
      idCategory: catId,
    });
    this.urls = response.data;
  }

  async deleteUrl(idUrlSelect) {
    console.log("delete url : ", idUrlSelect);
    const response = await axios.post("http://localhost:8000/api/deleteUrl",
    {
      idUrl : idUrlSelect
    });
    this.router.navigate("myURL");
  }
  
}