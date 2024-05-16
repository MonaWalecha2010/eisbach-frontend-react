import instance from "./AppInterceptor";
import ApiConfig from "../config/apiConfig";
import axios from "axios";
const prodKey = process.env.NEXT_PUBLIC_PROD_API_KEY;
const devKey = process.env.NEXT_PUBLIC_DEV_API_KEY;
const prodApiUrl = process.env.NEXT_PUBLIC_PROD_API_URL;
class AppService {
  //Routes API
  getRoutes(baseurl: string, key: string, user: string) {
    return axios
      .get(`${baseurl}${ApiConfig.allRoutes}`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getRoute(baseurl: string, key: string, user: string, routeName: string) {
    return axios
      .get(`${baseurl}${ApiConfig.allRoutes}/${routeName}`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  addRoute(baseurl: string, key: string, user: string, params: any) {
    return axios
      .post(`${baseurl}${ApiConfig.allRoutes}/${params?.name}`, params, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  updateRoute(baseurl: string, key: string, user: string, params: any) {
    return axios
      .put(`${baseurl}${ApiConfig.allRoutes}/${params?.name}`, params, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  reloadRoute(baseurl: string, key: string, user: string, routeName: string) {
    return axios
      .post(`${baseurl}${ApiConfig.reloadRoutes}/${routeName}/reload`, "", {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  deleteRoute(baseurl: string, key: string, user: string, routeName: string) {
    return axios
      .delete(`${baseurl}${ApiConfig.allRoutes}/${routeName}`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  //Gateway
  createAccount(params: any) {
    return axios
      .post(ApiConfig?.createAccount, params, {
        headers: {
          "x-api-key": `${prodKey}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  sendInvite(params: any) {
    return axios
      .post(ApiConfig?.createAccount, params, {
        headers: {
          "x-api-key": `${prodKey}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  addGateway(params: any, key: string) {
    return axios
      .post(ApiConfig?.addGateway, params, {
        headers: {
          "x-api-key": `${prodKey}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getChronicle(
    baseurl: string,
    key: string,
    user: string,
    routeName: string,
    queryparams: any
  ) {
    let url = `${baseurl}${ApiConfig.chronicle}`;
    if (routeName !== "") {
      url = `${baseurl}${ApiConfig.chronicle}/${routeName}`;
    }
    return axios
      .get(url, {
        params: { ...queryparams },
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getChronicleCount(
    baseurl: string,
    key: string,
    user: string,
    routeName: string
  ) {
    let url =
      routeName !== undefined && routeName !== ""
        ? `${baseurl}${ApiConfig.chronicle}/${routeName}/count`
        : `${baseurl}${ApiConfig.chronicle}/count`;
    return axios
      .get(`${url}`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getLogs(baseurl: string, key: string, user: string, queryparams: any) {
    return axios
      .get(`${baseurl}${ApiConfig.logs}`, {
        params: { ...queryparams },
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getLogCount(baseurl: string, key: string, user: string) {
    let url = `${baseurl}${ApiConfig.logs}/count`;
    return axios
      .get(`${url}`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getHealthz(base_url: string, key: string, user: string) {
    return axios
      .get(`${base_url}${ApiConfig.healthz}`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getRouteQuery(
    gatewayUrl: string,
    gatewayKey: string,
    user: string,
    route: string,
    headersData: any,
    params: any
  ) {
    return axios
      .post(`${gatewayUrl}${ApiConfig.query}/${route}`, params, {
        headers: {
          "x-api-key": `${gatewayKey}`,
          "x-javelin-user": `${user}`,
          ...headersData,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  //
  assistantsPull(
    base_url: string,
    gatewayKey: string,
    user: string,
    route: string,
    headersData: any,
    params: any
  ) {
    return axios
      .post(`${base_url}${ApiConfig.assistants}/${route}/threads`, params, {
        headers: {
          "x-api-key": `${gatewayKey}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
          ...headersData,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return instance.get(ApiConfig?.metrics);
  }
  //Analytics
  getMetrics(base_url: string, key: string, user: string) {
    return axios
      .get(`${base_url}${ApiConfig.metrics}`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return instance.get(ApiConfig?.metrics);
  }
  getAnalytics(base_url: string,key: string,user: string,start: any,end: any ) {
    let url;
    if (start === null || start === undefined) {
      url = `${base_url}${ApiConfig.analytics}`;
    } else {
      url = `${base_url}${ApiConfig.analytics}?start=${start}&end=${end}`;
    }
    return axios
      .get(url, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return instance.get(ApiConfig?.metrics);
  }
  getSystemMetrics() {
    return instance.get(ApiConfig?.systemMetrics);
  }
  //KEY VAULTS
  getAllKeyVaults(baseurl: string, key: string, user: string) {
    return axios
      .get(`${baseurl}${ApiConfig.allProvider}/keyvault/keys`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getKeyVaults(baseurl: string, key: string, user: string, provider: string) {
    return axios
      .get(`${baseurl}${ApiConfig.allProvider}/${provider}/keyvault/keys`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getKeyVault(
    baseurl: string,
    key: string,
    user: string,
    provider: string,
    keyName: string
  ) {
    return axios
      .get(
        `${baseurl}${ApiConfig.allProvider}/${provider}/keyvault/${keyName}`,
        {
          headers: {
            "x-api-key": `${key}`,
            "x-javelin-user": `${user}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  addKeyVault(
    baseurl: string,
    key: string,
    user: string,
    provider: string,
    params: any
  ) {
    return axios
      .post(
        `${baseurl}${ApiConfig.allProvider}/${provider}/keyvault/${params?.api_key_secret_name}`,
        params,
        {
          headers: {
            "x-api-key": `${key}`,
            "x-javelin-user": `${user}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  updateKeyVault(
    baseurl: string,
    key: string,
    user: string,
    provider: string,
    params: any
  ) {
    return axios
      .put(
        `${baseurl}${ApiConfig.allProvider}/${provider}/keyvault/${params?.api_key_secret_name}`,
        params,
        {
          headers: {
            "x-api-key": `${key}`,
            "x-javelin-user": `${user}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  deleteKeyVault(
    baseurl: string,
    key: string,
    user: string,
    provider: string,
    keyName: string
  ) {
    return axios
      .delete(
        `${baseurl}${ApiConfig.allProvider}/${provider}/keyvault/${keyName}`,
        {
          headers: {
            "x-api-key": `${key}`,
            "x-javelin-user": `${user}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  //Data Protections
  getDataProtections(baseurl: string, key: string, user: string) {
    return axios
      .get(`${baseurl}${ApiConfig.dataProtections}`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  getDataProtection(
    baseurl: string,
    key: string,
    user: string,
    templateName: string
  ) {
    return axios
      .get(`${baseurl}${ApiConfig.dataProtections}/${templateName}`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  addDataProtection(baseurl: string, key: string, user: string, params: any) {
    return axios
      .post(`${baseurl}${ApiConfig.dataProtections}/${params?.name}`, params, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  updateDataProtection(
    baseurl: string,
    key: string,
    user: string,
    params: any
  ) {
    return axios
      .put(`${baseurl}${ApiConfig.dataProtections}/${params?.name}`, params, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  deleteDataProtection(
    baseurl: string,
    key: string,
    user: string,
    templateName: string
  ) {
    return axios
      .delete(`${baseurl}${ApiConfig.dataProtections}/${templateName}`, {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
  reloadDataProtection(
    baseurl: string,
    key: string,
    user: string,
    templateName: string
  ) {
    return axios
      .post(`${baseurl}${ApiConfig.reloadDP}${templateName}/reload`, "", {
        headers: {
          "x-api-key": `${key}`,
          "x-javelin-user": `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  //Support
  addSupport(baseurl: string, key: string, user: string, params: any) {
    return axios
      .post(`${baseurl}${ApiConfig.support}`, params, {
        headers: {
          "x-api-key": `${key}`,
          //'x-javelin-user': `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  //Alerts
  getAlerts(baseurl: string, key: string, user: string, routeName: string) {
    return axios
      .get(
        `${baseurl}${ApiConfig.chronicle}/${routeName}?marked_for_review=false`,
        {
          headers: {
            "x-api-key": `${key}`,
            "x-javelin-user": `${user}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  updateAlertData(baseurl: string, key: string, user: string, params: any) {
    return axios
      .put(`${baseurl}${ApiConfig.alerts}/${params?.alert_id}`, params, {
        headers: {
          "x-api-key": `${key}`,
          //'x-javelin-user': `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  getAccountDetail(baseurl: string, key: string, user: string, org_id: string) {
    return axios
      .get(`${baseurl}${ApiConfig.account}/${org_id}`, {
        headers: {
          "x-api-key": `${key}`,
          //'x-javelin-user' : `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  updateAlertsData(
    baseurl: string,
    key: string,
    user: string,
    id: any,
    payload: any
  ) {
    return axios
      .put(`${baseurl}${ApiConfig.archive}/${id}`, payload, {
        headers: {
          "x-api-key": `${key}`,
          //'x-javelin-user': `${user}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
}
export default new AppService();
