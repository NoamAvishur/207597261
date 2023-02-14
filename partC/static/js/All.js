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
function deleteRow(event, serial_num) {
    if (confirm("האם את/ה בטוח/ה שברצונך למחוק את הפריט?")) {//only if the user is sure we'll delete the item from the DB
        event.preventDefault();
        let choosenProductJson=JSON.stringify(serial_num)
        document.cookie= `choosenProduct=` + encodeURIComponent(choosenProductJson);
        window.location.href = "http://localhost:3000/removeProduct";
    }
};