const myForm = document.querySelector('.my-form')
const nameInput=document.querySelector(`#Name`)
const categoryInput=document.querySelector(`#Category`)
const descriptionInput = document.querySelector('#Description')
const imageInput = document.querySelector('#Image')
const priceInput = document.querySelector('#Price')
const phoneInput = document.querySelector('#Phone')
const addressInput = document.querySelector('#Address')
const msg = document.querySelector('.msg')

var currentPage = window.location.pathname;//active nav bar
const activePage = document.querySelectorAll('nav a').forEach(
    link =>{
        console.log(link);
        console.log(currentPage);
        if (link.href.includes(`${currentPage}`)) {
            link.classList.add('active');
        }
    }
);
console.log();

const onSubmit = (e) => {//check input
    e.preventDefault()
    if (nameInput.value === '' || categoryInput.value === '' || priceInput.value === '' || phoneInput.value === '' || addressInput.value === ''){
        console.log('error')
        msg.innerHTML = 'בבקשה הכנס ערך בשדות החובה'
        msg.classList.add('error')
    }else {
        console.log('success')
        const li = document.createElement('li')
        li.innerHTML = `${nameInput.value}: ${categoryInput.value}: ${priceInput.value}: ${phoneInput.value}: ${addressInput.value}: ${descriptionInput.value}: ${imageInput.value} `
        // clean fields
        nameInput.value = ''
        categoryInput.value = 'בחר תת קטגוריה'
        priceInput.value = ''
        phoneInput.value = ''
        addressInput.value = ''
        descriptionInput.value = ''
        msg.innerHTML = ''
        msg.classList.remove('error')
        window.location.href="../views/Seller.html"
    }
}

myForm.addEventListener('submit', onSubmit)