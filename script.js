const grid = document.querySelector('#container');
const sizeInput = document.querySelector("#size-input");
const loadBtn = document.querySelector("#load-btn");
const createGrid = (n) => {
    container.innerHTML = "";
    if (parseFloat(n) !== parseInt(n)) {
        alert("The number must be an integer.");
        return;
    }
    n = parseInt(n);
    const width = 100/n;
    for(let i=0;i<n*n;i++) {
        container.innerHTML += `<div style="width:${width}%"></div>`;
    }
    document.querySelectorAll('#container div').forEach(div => {
        div.addEventListener('mouseover', (e)=>{
            e.target.style.background = 'black';
    })
    })
}
createGrid(16);
loadBtn.addEventListener('click', ()=>createGrid(sizeInput.value));