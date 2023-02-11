const myForm = document.querySelector('.my-form')
const firstNameInput=document.querySelector(`#firstName`)
const lastNameInput=document.querySelector(`#lastName`)
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const msg = document.querySelector('.msg')

const onSubmit = (e) => {//check input
    if (emailInput.value === '' || passwordInput.value === '' || firstNameInput.value === '' || lastNameInput.value === '' ){
        e.preventDefault()
        msg.innerHTML = ''
        console.log('error')
        msg.innerHTML = 'בבקשה הכנס ערך בכל השדות'
        msg.classList.add('error')
    } else {
    if (emailInput.value.includes('@post.bgu.ac.il')){
            console.log('success')
            const li = document.createElement('li')
            li.innerHTML = `${firstNameInput.value}: ${lastNameInput.value}: ${emailInput.value}: ${passwordInput.value}`
            // clean fields
            msg.innerHTML = ''
            msg.classList.remove('error')
            window.location.href="http://localhost:3000/seller"    
    } else{
            e.preventDefault()
            msg.innerHTML = ''
            console.log('error')
            msg.innerHTML = 'המייל שהוכנס הוא לא מייל אוניברסיטאי'
            msg.classList.add('error')
    }

    }
}

myForm.addEventListener('submit', onSubmit)