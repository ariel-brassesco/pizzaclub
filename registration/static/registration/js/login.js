'use strict';
const axios = require('axios');

const sendLoginCredentials = (e) => {
    e.preventDefault();

    const form = e.target;
    //const btn_submit = document.getElementById('contact-form-submit');
    const data = new FormData(form);

    //Disable all inputs and buttons
    //form.querySelectorAll('input,textarea, button').forEach(e => e.disabled = true);;
    //Put a loader in button
    //btn_submit.classList.add('is-loading');
    
    axios({
        method: form.method,
        url: form.action,
        data: data,
    }).then(res => {

        res.data

        //Show the notification
        //let notification = data.success?'contact-success':'contact-failed';
        //show_notification(notification);
        //Disable all inputs and buttons
        //form.querySelectorAll('input,textarea, button').forEach(e => e.disabled = false);
        //Remove the loader in button
        //btn_submit.classList.remove('is-loading');
        //Reset the form values
        form.reset();
    })
    .catch(err => {
        console.error(err);
        //Disable all inputs and buttons
        //form.querySelectorAll('input,textarea, button').forEach(e => e.disabled = false);
        //Remove the loader in button
        //btn_submit.classList.remove('is-loading');
    });
}

/*
La función loadEvents define todos los eventos de la página
los eventos en general van linkeados al document.
*/
function loadEvents() {
    const form = document.getElementById('login-form');
    //Add the submit form event
    form.addEventListener('submit', sendLoginCredentials, false);

// Cuando se carga la página ejecuta la función loadEvents
document.addEventListener('DOMContentLoaded', loadEvents, false);

