import create from "./http-client";

export interface Brand {
    id: string,
    name: string,
}


export default create("brands");