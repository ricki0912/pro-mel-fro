import { ParentInterface } from "./parent.interface";


export interface SocketInterface  <T extends ParentInterface> extends ParentInterface {
    action: SOCKET_ACTION,
    data:T[] | T | null
}

export enum SOCKET_ACTION{
    TV_ADD_TARGET_CALL=1,
    TV_UPD_TARGET_CALL=2,
    TV_REFRESH_TARGET_CALL=3,
    TV_REMOVE_TARGET_CALL=4,
    WAITING_LINE_ADD_APPOINTMENT=5
    

}
