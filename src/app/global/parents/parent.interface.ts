export interface ParentInterface{

    
}

export interface ParentInterfaceWithDU extends ParentInterface{
  created_at?:Date,
  updated_at?:Date, 
  created_by?:number,
  updated_by?:number
}

export interface InterfaceParamsResponse<T extends ParentInterface> extends ParentInterface{
  res: boolean;
  msg:string;
  data: T[] | T | null;
}




