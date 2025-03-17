export function checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
        return res.json() as Promise<T>;
    }
    return Promise.reject(`Ошибка ${res.status}`);
}