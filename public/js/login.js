const form = document.querySelector('#login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('Submitting');
  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');

  const body = { email, password };

  const res = await fetch('/api/users/token', {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  if (!res.ok) {
    const { message } = data;
    const errorsContainer = document.querySelector('#errors-container');
    errorsContainer.innerHTML = "Error:" + message + ", please try again.";
    return;
  }
  console.log(data);
  debugger;
  window.location.href = '/home';
})
