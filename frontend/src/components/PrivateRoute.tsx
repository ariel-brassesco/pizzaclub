import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

type Props = {
  account: any;
  redirect: string;
};

const PrivateRoute: FC<Props> = ({ children, account, redirect, ...props }) => (
  <Route
    {...props}
    render={({ location }) =>
      account.id ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: redirect,
            state: { from: location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state: any) => ({
  account: state.dashboard.account,
});

export default connect(mapStateToProps)(PrivateRoute);
