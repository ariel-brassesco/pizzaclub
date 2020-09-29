import React, { Component } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { CustomField } from "../components/Common";
import { connect, DispatchProp } from "react-redux";
import { login } from "../actions/dashboardActions";
import * as Yup from "yup";
import { compose } from "redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { DASHBOARD } from "../routes";

type Values = {
  username: string;
  password: string;
};

const validationSchema = Yup.object({
  username: Yup.string().required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
});

type Props = DispatchProp<any> & RouteComponentProps & {};

class DashboardLoginPage extends Component<Props> {
  private handleSubmit = async (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => {
    await this.props.dispatch(login(values));
    this.props.history.push(DASHBOARD);
  };

  public render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-black has-text-centered">
                Ingreso
              </h3>

              <div className="box">
                <Formik<Values>
                  initialValues={{ username: "", password: "" }}
                  validationSchema={validationSchema}
                  onSubmit={this.handleSubmit}
                >
                  <Form>
                    <Field
                      name="username"
                      label="Usuario"
                      component={CustomField}
                    />

                    <Field
                      type="password"
                      name="password"
                      label="Contraseña"
                      component={CustomField}
                    />

                    <button className="button is-block is-info is-fullwidth">
                      Ingresar
                    </button>
                  </Form>
                </Formik>
              </div>

              <p className="has-text-grey has-text-centered">
                <a>Olvide mi Contraseña</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default compose(connect(), withRouter)(DashboardLoginPage);
