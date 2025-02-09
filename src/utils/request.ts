import { checkResponse } from "./checkResponse.ts";

export function request(url: string, options = {}) {
    return fetch(url, options).then(checkResponse);
}