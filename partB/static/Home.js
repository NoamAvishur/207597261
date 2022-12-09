const myForm = document.querySelector('.my-form')
const searchInput=document.querySelector(`#searchLine`)
const msg = document.querySelector('.msg')
const userList = document.querySelector('.users')

const onSubmit = (e) => {
    e.preventDefault()
    if (searchInput.value === '' ){
        console.log('error')
        msg.innerHTML = 'בבקשה הכנס ערך'
        msg.classList.add('error')
    } else {
        console.log('success')
        const li = document.createElement('li')
        li.innerHTML = `${searchInput.value}`
        //userList.appendChild(li)
        // clean fields
        searchInput.value = ''
        msg.innerHTML = ''
        msg.classList.remove('error')
        window.location.href="../views/Results.html"
    }
}

myForm.addEventListener('submit', onSubmit)