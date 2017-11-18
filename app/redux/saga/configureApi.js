import httpService from "../../services/HttpService";
import surveyApi from "./surveyApi";
import Config from "../../config/Config";

httpService.setApiPath(Config.API_PATH);
// inject http service into surveyApi
surveyApi.setHttpService(httpService);

export default surveyApi;