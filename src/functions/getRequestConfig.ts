export const getBasicRequestConfig = (jwt: string) => {
    return {
        headers: { authorization: `Bearer ${jwt}` },
    };
};

export const getContentTypeJsonRequestConfig = (jwt: string) => {
    return {
        headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
    };
};