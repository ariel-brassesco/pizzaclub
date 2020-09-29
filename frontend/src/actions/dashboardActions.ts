import { Dispatch } from "redux";
import { DASHBOARD_LOGIN } from "../reducers/dashboardReducer";
import { apiRoutes, http } from "../services/http";
import { Credentials } from "../types/credentials";

export const login = (credentials: Credentials) => async (
  dispatch: Dispatch
) => {
  try {
    const { token } = await http.post(apiRoutes.login, credentials);
    http.setAuth(token);
    const user = await http.get(apiRoutes.me);

    return dispatch({ type: DASHBOARD_LOGIN, payload: user });
  } catch (error) {}
};
