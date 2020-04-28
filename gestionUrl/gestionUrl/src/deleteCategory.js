import { PLATFORM } from "aurelia-pal";
import { computedFrom } from "aurelia-framework";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import axios from "axios";
import { DeleteURL } from "./deleteURL";

@inject(Router)
export class DeleteCategory {

  constructor(router) {
    this.router = router;
    this.categories = [];
    this.id = 0;
  }

  activate() {
    return this.getCategories();
  }

  async getCategories() {
    const response = await axios.post("http://localhost:8000/api/categories");
    this.categories = response.data;
  }

  async deleteCategory(idCategorySelect) {
    this.idCat = idCategorySelect;
    console.log("delete category : ", idCategorySelect);
    const response = await axios.post("http://localhost:8000/api/deleteURLbyCatId",
    {
      idCategory : idCategorySelect
    });
    const response2 = await axios.post("http://localhost:8000/api/deleteCategory",
    {
      idCategory : idCategorySelect
    });
    
  }

  async deleteURL(idCategorySelect){
    // DeleteURL.this.idCategory = idCategorySelect;
    console.log("deleteUrl idCategory:" + idCategorySelect);
    // this.router.navigate("deleteURL/:id");
    console.log('Start routing to deleteURL with id 123')
    this.router.navigateToRoute('deleteURL', { id:  idCategorySelect});
    //this.router.navigate("deleteURL/:id", { id: idCategorySelect });
    //this.router.navigate("deleteURL");
  }

  getidCategory(){
    return this.id;
  }
}