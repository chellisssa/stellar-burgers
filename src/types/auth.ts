import { IBaseRes } from "./common.ts";

export interface IBaseAuthRes extends IBaseRes{
    user: {
        email: string,
        name: string,
    },
    accessToken: string,
    refreshToken: string,
}
