import setManyAttributes from '../helper/htmlHelpers.js';

export default function renderLoginPage() {
  const loginContainer = document.createElement('div');
  loginContainer.setAttribute('id', 'login-page');
  loginContainer.classList.add('container', 'w-75');

  const loginTitle = document.createElement('h1');
  loginTitle.innerText = 'Login';
  loginTitle.classList.add('text-center', 'mt-5');

  const welcomeBack = document.createElement('h4');
  welcomeBack.innerText = 'Welcome Back!';
  welcomeBack.classList.add('text-center', 'lead');

  const loginRow = document.createElement('div');
  loginRow.classList.add('row', 'mt-5');

  const loginCol = document.createElement('div');
  loginCol.classList.add('col');

  const form = document.createElement('form');
  const emailFormGrp = document.createElement('div');
  emailFormGrp.classList.add('form-group');

  const emailLabel = document.createElement('label');
  emailLabel.innerText = 'Email address';

  const emailInput = document.createElement('input');
  emailInput.classList.add('form-control');
  setManyAttributes(emailInput, {
    type: 'email',
    id: 'email-input',
    name: 'email',
    'aria-describedby': 'emailHelp',
    placeholder: 'Enter email',
  });

  const emailSmall = document.createElement('small');
  emailSmall.classList.add('form-text', 'text-muted');
  emailSmall.setAttribute('id', 'emailHelp');
  emailSmall.innerText = 'Test login: jerome@test.com';

  const passwordFormGrp = document.createElement('div');
  passwordFormGrp.classList.add('form-group', 'mt-3');

  const passwordLabel = document.createElement('label');
  passwordLabel.innerText = 'Password';
  const passwordBreak = document.createElement('br');

  const passwordInput = document.createElement('input');
  passwordInput.classList.add('form-control');
  setManyAttributes(passwordInput, {
    type: 'password',
    id: 'password-input',
    name: 'password',
    placeholder: 'Password',
  });

  const loginSubmitBtn = document.createElement('button');
  loginSubmitBtn.classList.add('btn', 'btn-dark', 'mt-3');
  loginSubmitBtn.innerText = 'Submit';
  setManyAttributes(loginSubmitBtn, {
    id: 'login-submit',
    type: 'button',
  });

  emailFormGrp.append(emailLabel, emailInput, emailSmall);
  passwordFormGrp.append(passwordLabel, passwordBreak, passwordInput);
  form.append(emailFormGrp, passwordFormGrp, loginSubmitBtn);
  loginCol.appendChild(form);
  loginRow.appendChild(loginCol);
  loginContainer.append(loginTitle, welcomeBack);
  loginContainer.appendChild(loginRow);

  // Append to <body>.
  // document.body.appendChild(loginTitle);
  // document.body.appendChild(welcomeBack);

  document.body.appendChild(loginContainer);
}
