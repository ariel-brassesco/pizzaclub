import React from "react";
import { Formik, Field, Form } from "formik";

//Import Constants
import { DELIVERY_MODE, URL_API_MAKE_ORDERS } from "../constants";
//Import Components
import { CustomField } from "../components/Common";
import axios from "axios";

//Set CSRF Token configuration
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const FormCart = ({
  subtotal,
  total,
  shipping,
  mode,
  items,
  emptyCart,
}) => {
  // Define initial fields values
  let initialFieldsValues = {
    name: "",
    email: "",
    phone: "",
    comment: "",
  };
  // If mode is "delivery" add address field
  if (mode === DELIVERY_MODE)
    initialFieldsValues = { ...initialFieldsValues, address: "" };
  // Define Required Fields
  const REQUIRED_FIELDS = ["name", "email", "phone"];
  if (mode === DELIVERY_MODE) REQUIRED_FIELDS.push("address");
  // A custom validation function. This must return an object
  // which keys are symmetrical to our values/initialValues
  const validate = (values) => {
    const errors = {};

    // Check for required fields
    for (let key of REQUIRED_FIELDS) {
      if (!values[key].trim()) errors[key] = "Por favor completa este campo.";
    }
    // Particulars constraints
    if (values.name.trim().length > 15)
      errors.name = "Debe contener menos de 15 caracteres";

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Correo electrónico inválido.";
    }

    if (!/^\d{7,12}$/.test(values.phone))
      errors.phone = "Debe tener entre 7 y 12 digitos.";

    return errors;
  };

  const handleSubmit = (values, actions) => {
    const cart = {
      subtotal,
      total,
      shipping,
      mode,
      items,
      order_type: "whatsapp",
    };
    axios({
      method: "POST",
      url: URL_API_MAKE_ORDERS,
      data: { client: values, cart },
    })
      .then((res) => {
        if (res.data.success) {
          emptyCart();
          actions.setSubmitting(false);
          window.location.replace(res.data.url);
        } else {
          console.error(res.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
        actions.setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={initialFieldsValues}
      validate={validate}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            type="text"
            name="name"
            label="Nombre"
            component={CustomField}
            required
          />
          <Field
            type="email"
            name="email"
            label="Correo electrónico"
            component={CustomField}
            required
            placeholder="ejemplo@thepizzaclubsf.com"
          />
          <Field
            type="phone"
            name="phone"
            label="Teléfono"
            component={CustomField}
            required
          />
          {/* Only show address for DELIVERY */}
          {mode === DELIVERY_MODE ? (
            <Field
              name="address"
              label="Dirección"
              component={CustomField}
              required
            />
          ) : null}
          <Field
            type="textarea"
            name="comment"
            label="Comentarios"
            className="textarea"
            component={CustomField}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="button is-primary is-small gotocart-btn"
          >
            <span className="icon">
              <i className="fab fa-whatsapp"></i>
              <span>Enviar ya por WhatsApp!</span>
            </span>
          </button>
        </Form>
      )}
    </Formik>
  );
};
