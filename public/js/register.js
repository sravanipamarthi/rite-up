// register.js

document.getElementById('regForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const firstName = document.getElementById('FirstName').value;
    const lastName = document.getElementById('LastName').value;
    const username = document.getElementById('Username').value;
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;

    try {
        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: firstName,
                lastname: lastName,
                username: username,
                email: email,
                password: password,
            }),
        });

        if (response.ok) {
            const user = await response.json();
            console.log('Registration successful:', user);
            // Redirect or perform other actions
            alert('Registration successful! Redirecting to login.');
            window.location.href = '/login';
        } else {
            const data = await response.json();
            console.error('Registration failed:', data.message);
            alert(`Registration failed: ${data.message}`);
        }
    } catch (error) {
        console.error('Error during registration:', error.message);
        alert('An unexpected error occurred during registration.');
    }
});
