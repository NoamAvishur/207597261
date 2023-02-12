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
function deleteRow(event) {
    var row = event.target.parentNode.parentNode;
    var table = row.parentNode;
    if (confirm("האם את/ה בטוח/ה שברצונך למחוק את הפריט?")) {
        table.removeChild(row);
      }
}