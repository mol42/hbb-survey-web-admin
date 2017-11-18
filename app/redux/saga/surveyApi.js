class SurveyApi {

    httpService;

    setHttpService(httpService) {
        this.httpService = httpService;
    }

    setToken(token) {
        this.httpService.setToken(token);
    }

    doLogin = (userData) => {

        return this.httpService.fetch({
            path : `/auth/login`,
            method : "POST",
            body : userData
        });
    }

    getSurveyList = () => {

        return this.httpService.fetch({
            path : `/survey/list/survey/1`
        });        
    }

    getPassiveSurveyList = () => {

        return this.httpService.fetch({
            path : `/survey/list/survey/0`
        });         
    }

    saveSurvey = (postData) => {

        return this.httpService.fetch({
            path : `/survey/create/survey`,
            method : "POST",
            body : postData
        });
    }

    updateSurvey = (postData) => {

        return this.httpService.fetch({
            path : `/survey/update/survey`,
            method : "POST",
            body : postData
        });
    }

    fetchUserList = () => {

        return this.httpService.fetch({
            path : `/account/list/user?v=_` + new Date().getTime()
        });
    }

    createUser = (userInfo) => {

        return this.httpService.fetch({
            path : `/account/create/user`,
            method : "POST",
            body : userInfo
        });
    }

    toggleSurveyStatus = (surveyId, surveyStatus) => {

        return this.httpService.fetch({
            path : `/survey/update-status/survey/${surveyId}/${surveyStatus}`,
            method : "POST"
        });
    }

    deleteSurvey = (surveyId) => {

        return this.httpService.fetch({
            path : `/survey/delete/survey/${surveyId}?v=_` + new Date().getTime(),
            method : "POST"
        });   
    }

    fetchSummaryData = () => {
        
        return this.httpService.fetch({
            path : `/survey/get/summary`
        });
    }

    saveAuthInfo(authInfo) {
        localStorage.setItem("AUTH_INFO", JSON.stringify(authInfo));
    }

    deleteAuthInfo() {
        localStorage.removeItem("AUTH_INFO");
    }

}

export default new SurveyApi();