const grid = document.querySelector('#container');
const sizeInput = document.querySelector("#size-input");
const loadBtn = document.querySelector("#load-btn");
const loadBtnP = document.querySelector("#load-btn p");
const progressBtn = document.querySelector("#progress-btn");
async function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 0));
}
const createGrid = async (n) => {
    if (parseFloat(n) !== parseInt(n)) {
        alert("The number must be an integer.");
        return;
    }
    container.innerHTML = "";
    loadBtn.style.cursor = 'wait';
    n = parseInt(n);
    const width = 100/n;
    let p = 0;
    for(let i=0;i<n*n;i++) {
        container.innerHTML += `<div style="width:${width}%"></div>`;
        p += 1/(n*n);
        window.requestAnimationFrame(()=>{
            if (loadBtn.style.cursor !== 'pointer') {
                loadBtn.style.width = `${(1-p)*100}%`;
                loadBtnP.style.right = `${(4450)/((1-p)*100)}%`
            }
        });
        await sleep();
    }
    document.querySelectorAll('#container div').forEach(div => {
        div.addEventListener('mouseover', (e)=>{
            if (!e.target.style.background) {
                const hue = Math.floor(361*Math.random())
                e.target.style.background = `hsl(${hue}, 100%, 90%, 1)`;
            }
            else {
                let rgb = e.target.style.background;
                rgb = rgb.substring(4, rgb.length-1).replace(" ", "").split(',').map(e=>parseInt(e));
                const r = rgb[0]/255; const g = rgb[1]/255; const b = rgb[2]/255;
                const cmax = Math.max(r, g, b);
                const cmin = Math.min(r, g, b);
                const d = cmax-cmin;
                let h;
                let l = (cmax+cmin)/2;
                let s = d/(1-Math.abs(2*l-1));
                if (d === 0) {
                    h = 0;
                    s = 0;
                }
                else if (cmax === r) {
                    h = 60*(((g-b)/d)%6);
                }
                else if (cmax === g) {
                    h = 60*(((b-r)/d)+2);
                }
                else if (cmax === b) {
                    h = 60*(((r-g)/d)+4);
                }
                e.target.style.background = `hsl(${h}, 100%, ${Math.max(0, l-0.1)*100}%, 1)`;
            }
    })
    })
    sizeInput.value = "";
    loadBtn.style.width = '100%';
    loadBtn.style.cursor = 'pointer';
    loadBtnP.style.right = `44.5%`;
}
createGrid(16);
loadBtn.addEventListener('click', ()=>{
    createGrid(sizeInput.value);
});