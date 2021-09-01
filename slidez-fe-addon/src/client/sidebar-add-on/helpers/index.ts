declare var google: any;

export const runGoogleScript = <Tout>(
    name: string,
    params: any
): Promise<Tout> => {
    return new Promise((res, rej) => {
        google.script.run
            .withSuccessHandler(res)
            .withFailureHandler(rej)
            [name](params);
    });
};
