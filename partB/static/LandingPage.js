const myForm = document.querySelector('.my-form')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const msg = document.querySelector('.msg')
const userList = document.querySelector('.users')
const onSubmit = (e) => {
    e.preventDefault()
    if (emailInput.value === '' || passwordInput.value === '' ){
        console.log('error')
        msg.innerHTML = 'בבקשה הכנס ערך בכל השדות'
        msg.classList.add('error')
    } else {
        console.log('success')
        const li = document.createElement('li')
        li.innerHTML = `${passwordInput.value}: ${emailInput.value}`
        //userList.appendChild(li)
        window.location.href="../views/Seller.html"
        // clean fields
        passwordInput.value = ''
        emailInput.value = ''
        msg.innerHTML = ''
        msg.classList.remove('error')

    }
}
myForm.addEventListener('submit', onSubmit)