import apiClient from "./api-client";

class HttpClient {

    #endpoint: string;

    constructor(endpoint: string) {
        this.#endpoint = endpoint
    }

    getAll<T>() {
        return apiClient.get<T>(this.#endpoint).json();
    } 

}

const create = (endpoint: string) => new HttpClient(endpoint);

export default create;