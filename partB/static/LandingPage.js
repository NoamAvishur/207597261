const myForm = document.querySelector('.my-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const msg = document.querySelector('.msg');
//const loginList = JSON
var currentPage = window.location.pathname;

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
        //loginList.appendChild(li)
        // clean fields
        passwordInput.value = ''
        emailInput.value = ''
        msg.innerHTML = ''
        msg.classList.remove('error')
        window.location.href="../views/Seller.html"
    }
}
myForm.addEventListener('submit', onSubmit)