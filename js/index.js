var userEmailInput = document.querySelector("#email");
var userPasswordInput = document.querySelector("#password");
var loginBtn = document.querySelector("#loginBtn");
var users = [];
var isEmailExist = false;
if (localStorage.getItem("users") != null) {
  users = JSON.parse(localStorage.getItem("users"));
}
loginBtn.addEventListener("click", function () {
  login();
});

function searchEmail(email) {
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].userEmail.toLowerCase().includes(email.toLowerCase()) === true
    ) {
      isEmailExist = true;
      return users[i];
    } else {
      isEmailExist = false;
    }
  }
  return isEmailExist;
}
function isEmailMatchPassword(user) {
  if (userPasswordInput.value == user.userPassword) {
    user.loggedIn = true;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));
    document.location.href = "home.html";
  } else {
    alert("Password is wrong");
  }
}
function login() {
  var emailSearchResult = searchEmail(userEmailInput.value);
  if (emailSearchResult != false) {
    isEmailMatchPassword(emailSearchResult);
  } else {
    alert("Sorry this Eamil is not exist");
  }
}
