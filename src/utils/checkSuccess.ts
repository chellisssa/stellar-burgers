export function checkSuccess<T>(res: T): T | Promise<never> {
    if (res && res.success) {
        return res;
    }
    return Promise.reject(`Неуспешный ответ ${res}`);
}