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
    if (confirm("האם את/ה בטוח/ה שברצונך למחוק את הפריט?")) {
        event.preventDefault();
        let choosenProductJson=JSON.stringify(serial_num)
        document.cookie= `choosenProduct=` + encodeURIComponent(choosenProductJson);
        window.location.href = "http://localhost:3000/removeProduct";
    }
}
/*function deleteRow(event) {
    var row = event.target.parentNode.parentNode;
    var table = row.parentNode;
    if (confirm("האם את/ה בטוח/ה שברצונך למחוק את הפריט?")) {
        table.removeChild(row);
      }
}*/