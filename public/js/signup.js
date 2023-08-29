// console.log("in the sign up page")

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    console.log(`email : ${email} and password ${password}`)
    
    
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        document.location.replace('/');
        
      } else {
        console.log(password)
        console.log("hi",email)
        alert('Please add name, email, and password');
      }
    }
  };
  
  document.querySelector('#signup-form')?.addEventListener('submit', signupFormHandler);
  