let toDo = [];

const todoList = document.getElementById("todoList");
const inputOpravilo = document.getElementById("input-opravilo");
const steviloDokoncanih = document.getElementById("steviloDokoncanihNalog");
const steviloNedokoncanih = document.getElementById("steviloNedokoncanihNalog")

if (localStorage.getItem("opravila") !== null) {
    toDo = JSON.parse(localStorage.getItem("opravila"));
}
izpisiOpravila();

document.getElementById("gumb_dodajOpravilo").addEventListener("click", (e)=> {
    toDo.push({
        naloga: inputOpravilo.value,
        id: Date.now(),
        opravljeno: false
    });
    inputOpravilo.value = "";
    izpisiOpravila();
})

todoList.addEventListener("click", (e) => {
    if(e.target.parentElement.id !== "todoList"){
        const opravilo = toDo.find(o => o.id == e.target.parentElement.id);
        if(e.target.nodeName === "INPUT") {
            if(e.target.checked) {
                opravilo.opravljeno = true;
            } else {
                if(confirm("Naloga je že bila potrjena in bo ponovno aktivna za novo potrjevanje. Ste prepričani, da želite nadaljevati?")) {
                    opravilo.opravljeno = false;
                } else {
                    e.target.checked = true;
                }
            }
        }
        if(e.target.nodeName === "SPAN") {
            if(confirm("Naloga bo izbrisana iz seznama. Ste prepričani, da želite nadaljevati?")) {
                const index = toDo.indexOf(opravilo);
                toDo.splice(index, 1);
            }
        }
        izpisiOpravila();
    }
    localStorage.setItem("opravila", JSON.stringify(toDo));
})


function izpisiOpravila() {
    localStorage.setItem("opravila", JSON.stringify(toDo));
    let text = "";
    for(i=0; i<toDo.length; i++) {
        text += `
            <li class="list-group-item" id="${toDo[i].id}">
                <input class="form-check-input me-1 checkTask" ${toDo[i].opravljeno ? "checked" : ""} type="checkbox" value="" >
                <label class="form-check-label ${toDo[i].opravljeno ? 'line-through' : ''}" for="${toDo[i].id}">${toDo[i].naloga}</label>
                <span class="badge x bg-danger rounded-pill deleteTask">X</span>
            </li>`;
    }
    todoList.innerHTML = text;
    steviloDokoncanih.innerText = toDo.reduce((ac, cv) => {
        if(cv.opravljeno) return ac+1;
        else return ac;
    }, 0);
    steviloNedokoncanih.innerText = toDo.reduce((ac, cv) => {
        if(!cv.opravljeno) return ac+1;
        else return ac;
    }, 0);
}
