const myForm = document.querySelector('.my-form')
const searchInput=document.querySelector(`#searchLine`)
//const msg = document.querySelector('.msg')

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
    if (searchInput.value === '' ){
        e.preventDefault()
        console.log('error')
        //msg.innerHTML = 'בבקשה הכנס ערך'
        //msg.classList.add('error')
    } else {
        console.log('success')
        const li = document.createElement('li')
        li.innerHTML = `${searchInput.value}`
        // clean fields
        searchInput.value = ''
        //msg.innerHTML = ''
        //msg.classList.remove('error')
        window.location.href="http://localhost:3000/results"
    }
}

myForm.addEventListener('submit', onSubmit)