const form = document.querySelector('#sign-up-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('Submitting new user info');
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const csrfToken = formData.get('_csrf');

  const body = { email, password, confirmPassword, firstName, lastName, csrfToken };

  const res = await fetch('/api/users', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  if (!res.ok) {
    const { message, errors } = data;
    const errorsContainer = document.querySelector('#errors-container');
    for (let error in errors) {
      const errorLi = document.createElement('li');
      errorLi.innerHTML = error;
      errorsContainer.appendChild(errorLi);
    }
    return;
  }
  console.log(data);
  window.location.href = '/users/survey';
})
