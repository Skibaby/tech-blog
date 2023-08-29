// document.location.replace('/');

document.querySelector('#logout')?.addEventListener('click', async() => {
    console.log('clicked');
    const response = await fetch('/api/users/logout', {
        method: 'POST',
    });

    if (response.ok) {
        location.replace('/');
    }

})

