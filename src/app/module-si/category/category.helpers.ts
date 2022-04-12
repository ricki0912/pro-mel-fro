import { Category, CategoryTree } from "src/app/interfaces/category";

export class CategoryHelpers{

   static convertTableToTree=(data: Category[], id?: Number, catNameLong:String="",idParents:any[]=[]):CategoryTree[]=>{
        
        const result:CategoryTree[]=data.filter(object=>object.catIdParent==id);
        const characterJoin:string='/'
        
         for (const key in result) {
          result[key].catNameLong=catNameLong+characterJoin+result[key].catName;
          result[key].idParents= idParents;
          const treeTemp:CategoryTree[]=this.convertTableToTree(data, result[key].catId,  result[key].catNameLong, [...idParents, result[key].catId] );
          result[key].children=treeTemp
        }


        return result;
    }


}