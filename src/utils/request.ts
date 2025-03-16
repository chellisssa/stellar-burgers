import { checkResponse } from "./checkResponse.ts";
import { checkSuccess } from "./checkSuccess.ts";

export function request<T>(url: string, options = {}): Promise<T> {
    return fetch(url, options).then(checkResponse<T>).then(checkSuccess<T>);
}