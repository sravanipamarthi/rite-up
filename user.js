function User(Username, Password, FirstName, LastName, Email) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Username = Username;
    this.Email = Email;
    this.Password = Password;
}

var regForm = document.getElementById("regForm");
var logForm = document.getElementById("logForm");

if(regForm != null)
    regForm.addEventListener("submit", registrationForm);

if(logForm != null)
    logForm.addEventListener("submit", loginForm);

function loginForm(e) {
    let Username = document.getElementById("Username").value;
    let Password = document.getElementById("Password").value;
    var user = new User(Username, Password);
    console.log(user);
    var cookie = "Username="+Username;
    document.cookie = cookie;
    e.preventDefault();
}

function registrationForm(e) {
    let FirstName = document.getElementById("FirstName").value;
    let LastName = document.getElementById("LastName").value;
    let Username = document.getElementById("Username").value;
    let Email = document.getElementById("Email").value;
    let Password = document.getElementById("Password").value;
    var user = new User(Username, Password, FirstName, LastName, Email);
    console.log(user);
    e.preventDefault();
}