//local variables
const HOST = 'localhost';
// const HOST = '16.16.201.152';

console.log('login.js loaded');
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Submit event triggered');
    submitData();
});
document.getElementById('signupBtn').addEventListener('click', function () {
    window.location.href = './signup.html';
});

//function to display the message
function showMessage(msgText, className) {
    const msg = document.getElementById('message');
    const div = document.createElement('div');
    const textNode = document.createTextNode(msgText);
    div.appendChild(textNode);
    msg.appendChild(div);
    msg.classList.add(className);

    setTimeout(() => {
        msg.classList.remove(className);
        msg.removeChild(div);
    }, 2000);
}

async function submitData() {
    // event.preventDefault();
    console.log('inside submitData login');
    // Get values from the form
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    console.log('email = ' + email);
    console.log('password = ' + password);

    if (email == "" || password == "") {
        console.log("Empty user fields");
    }
    else {
        const obj = {
            email: email,
            password: password
        }

        try {
            const response = await axios.post(`http://${HOST}:3000/user/login`, obj);
            console.log('response data = ' + JSON.stringify(response.data));
            //this will give the data inside the array
            console.log('email = ' + response.data.userDetails.email);
            console.log('phoneNumber = ' + response.data.userDetails.phoneNumber);
            console.log('password = ' + response.data.userDetails.password);
            console.log('token = ' + response.data.token);
            localStorage.setItem('token', response.data.token);

            showMessage('Email and Password verified', 'succesMessage');
            //user will be redirected to home page after 2 sec of login
            setTimeout(() => {
                window.location.href = './whatsappHome.html';
            }, 2000);
        }
        catch (error) {
            if (error.response) {
                if (error.response.status == 401 || error.response.data == 403 || error.response.data == 404) {
                    console.log('Error object:', error.response.data.message);
                    showMessage(error.response.data.message, 'failureMessage');
                } else {
                    console.log('Unhandled error:', error);
                    showMessage(error.response.data.message, 'failureMessage');
                }
            }
            else
                showMessage('No response from server', 'failureMessage');
        }
    }

    //to clear the fields
    document.getElementById('inputEmail').value = "";
    document.getElementById('inputPassword').value = "";
}//submitData
