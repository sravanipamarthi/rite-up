// login.js

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('Username').value;
    const password = document.getElementById('Password').value;

    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const user = await response.json();
            console.log('Login successful:', user);

            const expirationTime = new Date();
            expirationTime.setHours(expirationTime.getHours() + 5);
            
            setCookie('userId', user.UserId, { expires: expirationTime });
            setCookie('FirstName', user.FirstName, { expires: expirationTime });
            setCookie('username', user.Username, { expires: expirationTime });

            // alert('Login successful! Redirecting to feed.');
            document.getElementById('Username').style.display = 'block';
            
            window.location.href = '/feed';
        } else {
            const data = await response.json();
            console.error('Login failed:', data.message);
            alert(`Login failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        alert('An unexpected error occurred during login.');
    }
});

// Function to set a cookie with options
function setCookie(name, value, options = {}) {
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let option in options) {
        updatedCookie += '; ' + option;
        if (options[option] !== true) {
            updatedCookie += '=' + options[option];
        }
    }

    document.cookie = updatedCookie;
}
