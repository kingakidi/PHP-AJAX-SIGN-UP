let sf = i("form-signup");
let s = i("register");
let u = i("username");
let e = i("email");
let n = i("number");
let pass = i("password");
let cpass = i("confirm-password");

// VALID EMAIL
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
// CHECK NUMERIC WITH USERNAME
function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

// USERNAME KEYUP EVENT FIRED
u.addEventListener("keyup", () => {
  let uError = i(`${u.id[0]}-error`);
  if (isNumber(u.value[0])) {
    uError.style.display = "block";
    uError.innerHTML = "username can't start with number";
  } else {
    uError.style.display = "none";
  }
});

function onBlur(input, min) {
  input.addEventListener("blur", () => {
    let inputError = i(`${input.id[0]}-error`);
    if (input.value !== "") {
      if (input.value.length < 5) {
        inputError.style.display = "block";
        inputError.innerHTML = `Minimum of ${min} Character`;
      } else {
        inputError.style.display = "none";
      }
    }
  });
}
onBlur(pass, (min = 6));
// ON BLUR CHECK
u.addEventListener("blur", () => {
  let uError = i(`${u.id[0]}-error`);
  if (u.value !== "") {
    if (isNumber(u.value[0])) {
      uError.style.display = "block";
      uError.innerHTML = "Invalid username";
    } else if (u.value.length < 5) {
      uError.style.display = "block";
      uError.innerHTML = "username is too short";
    } else {
      uError.innerHTML = "Loading. . .";
      uError.style.display = "block";
      // CHECK THE AVAILABILITY
      let username = u.value;
      var uAjax = new XMLHttpRequest();
      uAjax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          uError.style.display = "block";
          uError.innerHTML = this.responseText;
        }
      };
      uAjax.open("POST", "control/sydeestack_signup_functions.php", true);
      uAjax.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      uAjax.send(`u=${username}`);
    }
  }
});

n.addEventListener("blur", () => {
  let nError = i(`${n.id[0]}-error`);
  if (n.value !== "") {
    if (n.value.length != 11) {
      nError.style.display = "block";
      nError.innerHTML = "11 digit Number Only";
    } else {
      nError.style.display = "none";
    }
  }
});

// CHECK EMAIL
e.onblur = () => {
  let eError = i(`${e.id[0]}-error`);
  if (e.value !== "") {
    if (!validateEmail(e.value)) {
      eError.style.display = "block";
      eError.innerHTML = "Enter a valid Email address";
    } else {
      eError.style.display = "none";
    }
  }
};

// PASSWORD KEYUP
pass.onkeyup = function () {
  if (pass.value !== pass.value) {
    i("c-error").style.display = "block";
    i("c-error").innerHTML = "Password Mismatch";
  } else {
    i("c-error").style.display = "none";
  }
};
cpass.onkeyup = function () {
  if (pass.value !== cpass.value) {
    i("c-error").style.display = "block";
    i("c-error").innerHTML = "Password Mismatch";
  } else {
    i("c-error").style.display = "none";
  }
};
// SUBMIT FORM

sf.addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    u.value == "" ||
    e.value == "" ||
    n.value == "" ||
    pass.value == "" ||
    cpass.value == ""
  ) {
    i("error").style.display = "block";
    i("error").innerHTML = "All filed is required";
  } else if (pass.value != cpass.value) {
    i("error").innerHTML = "Password Mismatch";
  } else if (n.value.length != 11) {
    i("n-error").style.display = "block";
    i("n-error").innerHTML = "Invalid Number";
  } else {
    i("error").style.display = "none";

    var submitAjax = new XMLHttpRequest();
    submitAjax.onreadystatechange = function () {
      document.getElementById("register").disabled = true;
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText !== "success") {
          i("error").innerHTML = this.responseText;
          i("error").style.display = "block";
          document.getElementById("register").disabled = false;
        } else {
          i("error").style.display = "none";
          i("form-signup").innerHTML = "REGISTERED SUCCESFULLY";
        }
      }
    };
    submitAjax.open("POST", "control/sydeestack_signup_functions.php", true);
    submitAjax.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    submitAjax.send(
      `username=${u.value}&e=${e.value}&n=${n.value}&p=${pass.value}&cp=${cpass.value}`
    );
  }
});
