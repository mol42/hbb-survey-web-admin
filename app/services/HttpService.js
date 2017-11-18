import Config from "../config/Config";

class HttpService {

    fetch(requestOptions) {

        return new Promise((resolve, reject) => {

            const logService = this.logService;
            const {sendToken} = requestOptions;
            const url = this.configureUrl(requestOptions);
            const overriddenHeaders = requestOptions.headers || {};
            const reqLogOptions = requestOptions.logOptions || {};

            const processedRequestOptions = {
                ...requestOptions,
                body : JSON.stringify(requestOptions.body),
                headers : {
                    "Content-Type" : "application/json",
                    "x-auth-token" : (typeof sendToken === "undefined" ? this.token : (sendToken === false ? null : this.token)),
                },
                timeout: Config.HTTP_TIMEOUT_MS
            };
            
            fetch(url, processedRequestOptions)
                .then(res => res.json()) // convert text response to json object
                .then(res => {
                    resolve(res);
                })
                .catch((err) => {
                    reject({
                        status : "error",
                        data : err
                    });
                });
        });
    }

    configureUrl(requestOptions) {
        let url = requestOptions.apiPath || this.apiPath;
        url = requestOptions.path ? (url + requestOptions.path) : url;
        return url;
    }

    setApiPath(apiPath) {
        this.apiPath = apiPath;
    }

    setToken(token) {
        this.token = token;
    }

    setLogService(logService) {
        this.logService = logService;
    }
}

function statusHelper(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

export default new HttpService();