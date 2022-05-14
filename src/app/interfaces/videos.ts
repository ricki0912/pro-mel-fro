import { ParentInterface } from "../global/parents/parent.interface";

export interface Videos extends ParentInterface{
  vidId?: number,
  vidName?: string,
  vidLink?: string,
  vidState?: string
}
export enum VIDEOS_STATE{
  ENABLE=1, DISABLE=2
}