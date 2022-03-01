export interface ParentInterface{

}
export interface ParentInterfaceParams<T>{
    status: number;
    message:string;
    data: T[] | T | null;
}

  
  