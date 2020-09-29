'use strict';
function show_notification(message, elem) {
    elem.innerHTML = message;
}

const sendLoginCredentials = (e) => {
    e.preventDefault();

    const form = e.target;
    const btn_submit = document.getElementById('login-btn-submit');
    const data = new FormData(form);

    //Disable all inputs and buttons
    form.querySelectorAll('input, button').forEach(e => e.disabled = true);;
    //Put a loader in button
    btn_submit.classList.add('is-loading');
    
    // Send the form to Login
    axios({
        method: form.method,
        url: form.action,
        data: data,
    }).then(res => {
        const {success: status} = res.data
        console.log(status);
        if (!status) {
            //Show the notification
            const {message, error} = res.data;
            const notification = document.getElementById('login-notification');
            console.error(error);
            show_notification(message, notification);
            //Enable all inputs and buttons
            form.querySelectorAll('input, button').forEach(e => e.disabled = false);
            //Remove the loader in button
            btn_submit.classList.remove('is-loading');
            //Reset the form values
            form.reset();
        } else {
            const {redirect} = res.data;
            location.replace(location.origin + redirect);
        }
    })
    .catch(err => {
        console.error(err);
        //Enable all inputs and buttons
        form.querySelectorAll('input, button').forEach(e => e.disabled = false);
        //Remove the loader in button
        btn_submit.classList.remove('is-loading');
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
}
// Cuando se carga la página ejecuta la función loadEvents
document.addEventListener('DOMContentLoaded', ()=> {
    loadEvents();
}, false);

