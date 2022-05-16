export interface ParentInterface{
  
    
}
export interface InterfaceParamsResponse<T extends ParentInterface> extends ParentInterface{
  res: boolean;
  msg:string;
  data: T[] | T | null;
}




