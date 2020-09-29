import { Reducer } from "redux";

export const DASHBOARD_LOGIN = "DASHBOARD_LOGIN";
export const DASHBOARD_LOGOUT = "DASHBOARD_LOGOUT";

type State = {
  account: any;
};

const initialState: State = {
  account: {},
};

export const dashboardReducer: Reducer<State> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case DASHBOARD_LOGIN:
      return {
        ...state,
        account: payload,
      };

    case DASHBOARD_LOGOUT:
      return {
        ...state,
        account: {},
      };

    default:
      return state;
  }
};
