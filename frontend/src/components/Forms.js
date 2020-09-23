import React, { Component } from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';


export const FormCart = () => {
    
    // A custom validation function. This must return an object
    // which keys are symmetrical to our values/initialValues
    const validate = values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Requerido';
        } else if (values.name.length < 15) {
            errors.name = 'Debe contener menos de 15 caracteres';
        }

        if (!values.email) {
            errors.email = 'Requerido';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Correo electrónico inválido.';
        }

        if (!values.phone) {
            errors.phone = "Requerido";
        } else if (!/^\d{7,12}$/.test(values.email)){
            errors.phone = "Debe tener entre 7 y 12 digitos."
        }

        if (!values.address) {
            errors.address = "Requerido";
        }

    return errors;
    };

    return (
    <Formik
        initialValues={{
            name: '',
            email: '',
            phone: '',
            address: '',
            comment: '',
        }}
        validate={validate}
        onSubmit={(values, actions) => {
            console.log(values);
            setTimeout(() => {
                actions.setSubmitting(false);
            }, 2000);
            
        }}>
            {({errors, touched, isSubmitting}) => (
            <Form>
                <Field type="text" name="name" placeholder="Nombre" />
                <ErrorMessage name="name" />
                <Field type="email" name="email" placeholder="Correo electrónico" />
                <ErrorMessage name="email" />
                <Field type="phone" name="phone" placeholder="Teléfono" />
                <ErrorMessage name="phone" />
                <Field type="text" name="address" placeholder="Dirección" />
                <ErrorMessage name="address" />
                <Field as="textarea" name="address" placeholder="Dirección" />
                <button type="submit" disabled={isSubmitting}>Enviar ya por WhatsApp!</button>
            </Form>
            )}
    </Formik>
    );
};