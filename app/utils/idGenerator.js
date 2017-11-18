import shortid from "shortid";

export const generateId = () => {
    return idGenerator();
}

export const idGenerator = () => {
    return shortid.generate();
}