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

//SPAN справа на начальном экране
collapseSpan.addEventListener('click', async () => {
    
   await fetch('../json_file.json')
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i< data.length; i++) {
            positions.push(data[i])
        }
        renderPositions(positions)
    });
    
    searchInput.value = "";
})

//INTERACTIONS
searchInput.addEventListener('input', () => searchPositions(positions, searchInput.value));

//FUNCTIONS
const renderPositions = (positions) => {
    for(let i = 0; i < positions.length; i++) {
        const card = positionsTemplate.content.cloneNode(true).children[0];
        card.children[0].textContent = positions[i].name;
        card.children[1].addEventListener('click', addToAddedPositionsArray)

        employeePositions.appendChild(card) ;
    }
}

const searchPositions = (arrayOfPositions, searchText) => {

    removeElements();//перерисовываем отобрааемые данные при каждом вводе в инпут

    //отрисовываем те элементы, которые соответствуют вводу
    for(let i = 0; i < arrayOfPositions.length; i++) {
        if(arrayOfPositions[i].name.toLowerCase().startsWith(searchText.toLowerCase()) && searchText != "") {
            employeePositions.innerHTML = `
                <div class="employee-position-card">
                    <div class="employee-position">${arrayOfPositions[i].name}</div>
                    <button class="btn">Добавить</button>
                </div>
            `;
        }
        
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
const addToAddedPositionsArray = (e) => {
    const par = e.target.parentElement.children[0];

    const cardToAdd = addedPositionsTemplate.content.cloneNode(true).children[0];//div.position-card из template
    cardToAdd.children[0].children[0].textContent = par.textContent;
    addedPositions.appendChild(cardToAdd)
}