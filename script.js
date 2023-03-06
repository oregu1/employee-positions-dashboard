//REFERENCES
const collapseSpan = document.querySelector(".collapse-icon");

const employeePositions = document.querySelector(".employee-positions");
const addedPositions = document.querySelector(".added-positions");

const positionsTemplate = document.querySelector("[data-position-card]");
const addedPositionsTemplate = document.querySelector("[data-added-position-card]");

const searchInput = document.getElementById("search-input");

//ARRAYS
const positions = [];//сюда добавляются все должности при обработке fetch запроса
const addedPositionsArr = [];

window.addEventListener("DOMContentLoaded", async ()=> {
    await fetch('../json_file.json')
    .then(res => res.json())
    .then(data => {
        
        for(let i = 0; i< data.length; i++) {
            positions.push(data[i]);
        }
    });
    renderPositions(positions);
    searchInput.value = "";
})

//SPAN справа на начальном экране
collapseSpan.addEventListener('click', () => {
    employeePositions.classList.toggle("hidden")
    // let ULElem = document.querySelector(".employee-positions");
    // ULElem.classList.remove("hidden")
    searchInput.value = "";
})

//INTERACTIONS
searchInput.addEventListener('input', () => searchPositions(positions, searchInput));

//FUNCTIONS
const renderPositions = (positions) => {
    for(let i = 0; i < positions.length; i++) {
        const card = positionsTemplate.content.cloneNode(true).children[0];
        
        card.children[0].textContent = positions[i].name;
        card.children[1].addEventListener('click', addToAddedPositions)

        employeePositions.appendChild(card) ;
    }
    employeePositions.classList.add("hidden");
}

const searchPositions = (arrayOfPositions, searchText) => {
    removeElements();//перерисовываем отобрааемые данные при каждом вводе в инпут
   
    arrayOfPositions.filter(item => {
        if(item.name.toLowerCase().includes(searchText.value.toLowerCase()) && searchText.value != "") {
            const card = positionsTemplate.content.cloneNode(true).children[0];
            card.children[0].textContent = item.name;
            card.children[1].addEventListener('click', addToAddedPositions)

            employeePositions.appendChild(card) ;
            employeePositions.classList.remove("hidden")
        }
    })

    if(searchText.value === "") {
        renderPositions(positions);
        employeePositions.classList.remove("hidden")
    }
}

//удаление элементов во время ввода в инпут
const removeElements = () => {
    let items = document.querySelectorAll(".employee-position-card");
    items.forEach(item => {
     item.remove();
    })
 }

 //добавляем должность в список добавленных позиций
const addToAddedPositions = (e) => {
    const par = e.target.parentElement.children[0];

    const cardToAdd = addedPositionsTemplate.content.cloneNode(true).children[0];//div.position-card из template
    cardToAdd.children[0].children[0].textContent = par.textContent;

    const deleteBtn = cardToAdd.children[0].children[1];
    deleteBtn.addEventListener("click", removeFromAddedPositions);

    addedPositions.appendChild(cardToAdd)
}

const removeFromAddedPositions = (e) => {
    if(e.target.className == 'btn delete') {
        addedPositions.remove(e.target.parentElement)
    }
}