const userId = getCookieValue('userId');
document.getElementById('currentYear').innerText = new Date().getFullYear();

if (userId) {
    const FirstName = getCookieValue('FirstName');

    // User is logged in
    document.getElementById('logout').style.display = 'block';
    document.getElementById('name').style.display = 'block';
    document.getElementById('name').innerText = "Hi " + FirstName;
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
}

function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}