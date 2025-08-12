const formTitle = document.getElementById('form-title');
const authForm = document.getElementById('auth-form');
const toggleBtn = document.getElementById('toggle-btn');
const toggleMsg = document.getElementById('toggle-msg');
const submitBtn = document.getElementById('submit-btn');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const confirmPasswordLabel = document.getElementById('confirm-password-label');
const passwordHelp = document.getElementById('password-help');
const googleBtn = document.getElementById('google-btn');
const backBtn = document.getElementById('back-btn');

let isLogin = true;
let isGoogleLogin = false;

function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return regex.test(password);
}

function switchMode() {
  isLogin = !isLogin;
  isGoogleLogin = false;
  backBtn.classList.add('hidden'); // hide back button when switching mode

  if (isLogin) {
    formTitle.textContent = 'Welcome Back';
    submitBtn.textContent = 'Login';
    toggleMsg.textContent = "Don't have an account?";
    toggleBtn.textContent = 'Sign Up';
    passwordHelp.classList.add('hidden');
    confirmPasswordInput.classList.add('hidden');
    confirmPasswordLabel.classList.add('hidden');

    passwordInput.classList.remove('hidden');
    passwordInput.disabled = false;
    confirmPasswordInput.disabled = false;

    authForm.email.disabled = false;
    authForm.username.disabled = false;

    toggleBtn.style.display = 'inline';
  } else {
    formTitle.textContent = 'Create Account';
    submitBtn.textContent = 'Sign Up';
    toggleMsg.textContent = 'Already have an account?';
    toggleBtn.textContent = 'Login';
    passwordHelp.classList.remove('hidden');
    confirmPasswordInput.classList.remove('hidden');
    confirmPasswordLabel.classList.remove('hidden');

    passwordInput.classList.remove('hidden');
    passwordInput.disabled = false;
    confirmPasswordInput.disabled = false;

    authForm.email.disabled = false;
    authForm.username.disabled = false;

    toggleBtn.style.display = 'inline';
  }

  authForm.reset();
  clearValidation();
}

function clearValidation() {
  passwordInput.setCustomValidity('');
  confirmPasswordInput.setCustomValidity('');
  passwordInput.style.borderColor = '';
  confirmPasswordInput.style.borderColor = '';
}

toggleBtn.addEventListener('click', switchMode);

googleBtn.addEventListener('click', () => {
  isGoogleLogin = true;

  authForm.email.value = 'user@gmail.com';
  authForm.username.value = 'GoogleUser';
  authForm.email.disabled = true;
  authForm.username.disabled = true;

  passwordInput.classList.add('hidden');
  confirmPasswordInput.classList.add('hidden');
  confirmPasswordLabel.classList.add('hidden');
  passwordHelp.classList.add('hidden');

  submitBtn.textContent = 'Login with Google';
  formTitle.textContent = 'Login with Google';

  toggleMsg.textContent = '';
  toggleBtn.style.display = 'none';

  backBtn.classList.remove('hidden');

  clearValidation();
});

backBtn.addEventListener('click', () => {
  isGoogleLogin = false;
  backBtn.classList.add('hidden');

  authForm.email.disabled = false;
  authForm.username.disabled = false;

  if (isLogin) {
    passwordInput.classList.remove('hidden');
    confirmPasswordInput.classList.add('hidden');
    confirmPasswordLabel.classList.add('hidden');
    passwordHelp.classList.add('hidden');
    formTitle.textContent = 'Welcome Back';
    submitBtn.textContent = 'Login';
    toggleMsg.textContent = "Don't have an account?";
    toggleBtn.style.display = 'inline';
    toggleBtn.textContent = 'Sign Up';
  } else {
    passwordInput.classList.remove('hidden');
    confirmPasswordInput.classList.remove('hidden');
    confirmPasswordLabel.classList.remove('hidden');
    passwordHelp.classList.remove('hidden');
    formTitle.textContent = 'Create Account';
    submitBtn.textContent = 'Sign Up';
    toggleMsg.textContent = 'Already have an account?';
    toggleBtn.style.display = 'inline';
    toggleBtn.textContent = 'Login';
  }

  authForm.reset();
  clearValidation();
});

authForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (isGoogleLogin) {
    const email = authForm.email.value.trim();
    if (!email) {
      alert('Google email is required.');
      return;
    }
    console.log('Logging in with Google:', email);
    alert('Google Login successful!');
    resetFormAfterGoogle();
    return;
  }

  const username = authForm.username.value.trim();
  const email = authForm.email.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (!username || !email || !password || (!isLogin && !confirmPassword)) {
    alert('Please fill in all fields.');
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!isLogin) {
    if (!validatePassword(password)) {
      passwordInput.setCustomValidity('Invalid password');
      passwordInput.reportValidity();
      passwordInput.style.borderColor = 'red';
      return;
    } else {
      passwordInput.setCustomValidity('');
      passwordInput.style.borderColor = '';
    }

    if (password !== confirmPassword) {
      confirmPasswordInput.setCustomValidity('Passwords do not match');
      confirmPasswordInput.reportValidity();
      confirmPasswordInput.style.borderColor = 'red';
      return;
    } else {
      confirmPasswordInput.setCustomValidity('');
      confirmPasswordInput.style.borderColor = '';
    }
  }

  if (isLogin) {
    console.log('Logging in:', { username, email });
    alert('Login successful!');
  } else {
    console.log('Signing up:', { username, email });
    alert('Sign Up successful!');
  }

  authForm.reset();
});

function resetFormAfterGoogle() {
  isGoogleLogin = false;

  authForm.reset();

  authForm.email.disabled = false;
  authForm.username.disabled = false;

  if (isLogin) {
    passwordInput.classList.remove('hidden');
    confirmPasswordInput.classList.add('hidden');
    confirmPasswordLabel.classList.add('hidden');
    passwordHelp.classList.add('hidden');
    formTitle.textContent = 'Welcome Back';
    submitBtn.textContent = 'Login';
    toggleMsg.textContent = "Don't have an account?";
    toggleBtn.style.display = 'inline';
    toggleBtn.textContent = 'Sign Up';
  } else {
    passwordInput.classList.remove('hidden');
    confirmPasswordInput.classList.remove('hidden');
    confirmPasswordLabel.classList.remove('hidden');
    passwordHelp.classList.remove('hidden');
    formTitle.textContent = 'Create Account';
    submitBtn.textContent = 'Sign Up';
    toggleMsg.textContent = 'Already have an account?';
    toggleBtn.style.display = 'inline';
    toggleBtn.textContent = 'Login';
  }

  backBtn.classList.add('hidden');
  clearValidation();
}