import { ParentInterface } from "../global/parents/parent.interface";

export interface Videos extends ParentInterface{
  vidId?: number,
  vidName: string,
  vidLink: string,
  vidState: string,
  vidChannelTitle:string
  vidDescription:string
  vidImgLinkDefault:string,
  vidImgLinkMedium:string,
  vidImgLinkHigh:string

}
export enum VIDEOS_STATE{
  ENABLE=1, DISABLE=2
}