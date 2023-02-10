const myForm = document.querySelector('.my-form')
const firstNameInput=document.querySelector(`#firstName`)
const lastNameInput=document.querySelector(`#lastName`)
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
//const msg = document.querySelector('.msg')

const onSubmit = (e) => {//check input
    if (emailInput.value === '' || passwordInput.value === '' || firstNameInput.value === '' || lastNameInput.value === '' ){
        e.preventDefault()
        console.log('error')
        //msg.innerHTML = 'בבקשה הכנס ערך בכל השדות'
        //msg.classList.add('error')
    } else {
        console.log('success')
        const li = document.createElement('li')
        li.innerHTML = `${firstNameInput.value}: ${lastNameInput.value}: ${emailInput.value}: ${passwordInput.value}`
        // clean fields
        firstNameInput.value = ''
        lastNameInput.value = ''
        passwordInput.value = ''
        emailInput.value = ''
        //msg.innerHTML = ''
        //msg.classList.remove('error')
        window.location.href="http://localhost:3000/seller"
    }
}

myForm.addEventListener('submit', onSubmit)