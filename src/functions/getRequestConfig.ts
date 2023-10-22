export const getBasicRequestConfig = (jwt: string) => {
    return {
        headers: { authorization: `Bearer ${jwt}` },
    };
};