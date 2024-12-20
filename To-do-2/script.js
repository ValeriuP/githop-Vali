

const input = document.getElementById("new_todo_input");
const sortableContainer = document.getElementById("page_todo_container");
const statesGroup = document.getElementById("states_group");
input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
  
  
  
  let rowItem = document.createElement('div');
  let dotItem = document.createElement('button');
  let item = document.createElement('span');
  let deteleItem = document.createElement('button');

  rowItem.classList.add("todo-group");
  dotItem.classList.add("dot");
  item.classList.add("todo-item");
  deteleItem.classList.add("todo-delete");
  statesGroup.classList.add("states-group");
  
  //make the items draggable by adding them the draggable attribute
  rowItem.setAttribute("draggable", "true");
  //add drag and drop event listeners to all items
  rowItem.addEventListener("dragstart", () => { rowItem.classList.add("dragging"); });
  //removing dragging class from items on dragend event
  rowItem.addEventListener("dragend", () => { rowItem.classList.remove("dragging"); });
  
  item.innerText=input.value;
  item.setAttribute("state", "incomplete");
  deteleItem.innerText = "X";
  dotItem.addEventListener("click", (e) => handleTaskClick(e));
  deteleItem.addEventListener("click", (e) => deleteRowItem(e, sortableContainer));
  rowItem.appendChild(dotItem);
  rowItem.appendChild(item);
  rowItem.appendChild(deteleItem);
  sortableContainer.appendChild(rowItem);

   
  dragAndDrop();
  displayLeftItems();
  if(document.getElementById("all_items")==null){
    displayAllItem();
  }
  if(document.getElementById("active_items")==null){
    displayActiveItems();
  }
  if(document.getElementById("complete_items")==null){
    displayCompleteItems();
  }
  if(document.getElementById("clear_items")==null){
    clearCompletedItems();
  }
  
  }
});

const statesButtonsContainer = document.getElementById("states_buttons_container");
const clearButtonContainer = document.getElementById("clear_button_container");



 //functie de bifare si debifare scris
 function handleTaskClick(e){
  const item = e.target.parentNode.getElementsByTagName('span')[0];
  const dot = e.target.parentNode.getElementsByTagName('button')[0];
  console.log(dot);
  if(!item.style.textDecoration){
    item.style.textDecoration = "line-through";
    item.setAttribute("state", "complete");
    displayLeftItems();
    dot.classList.remove("dot");
    dot.classList.add("complete-dot");
    dot.innerText = `✔`;
  }
  else{
      item.style.textDecoration = "";
      item.setAttribute("state", "incomplete");
      displayLeftItems();
      dot.classList.remove("complete-dot");
      dot.classList.add("dot");
      dot.innerText = ``;
  }
}

function dragAndDrop(){
  const initSortableContainer = (e) => {
    e.preventDefault();
    const draggingItem = sortableContainer.querySelector(".dragging");
   
    //getting all items except the one currently dragging
    const siblings = [...sortableContainer.querySelectorAll(".todo-group:not(.dragging)")];
    console.log(siblings);
    //finding the sibling after whitch the dragging item should be placed
    let nextSibling = siblings.find(sibling => {
      // console.log(sibling);
      return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    console.log(nextSibling);
    //insert the dragging item before the found sibling
    sortableContainer.insertBefore(draggingItem, nextSibling);
  }
  sortableContainer.addEventListener("dragover", initSortableContainer);
}

function deleteRowItem(e, todoContainer){
  let itemRow = e.target.parentElement;
  todoContainer.removeChild(itemRow);
  displayLeftItems();
}



function displayLeftItems(){
  const leftItemsContainer = document.getElementById("left_items_container");
  let count = 0;
  leftItemsContainer.classList.add("states-group");
  const items = document.querySelectorAll(".todo-item");
 
  let leftItems = document.createElement('span');
  for(let el of items){
    if(el.getAttribute("state")=="incomplete"){
      count++
      leftItems.innerText = " ";
    } 
  }
 
  leftItems.innerText = `${count} items left`;
  leftItemsContainer.innerHTML = leftItems.innerHTML;
  
}

function displayAllItem(){
  let allItemsBtn = document.createElement('button');
  allItemsBtn.textContent = "All";
  allItemsBtn.classList.add("states-button");
  allItemsBtn.id = "all_items";
  allItemsBtn.addEventListener("click", () => {
    const items = document.querySelectorAll(".todo-item");
    for(let el of items){
      if(el.getAttribute("state")=="complete" || el.getAttribute("state")=="incomplete"){
        el.parentNode.style.display = "grid";
      } 
    }
  });
    statesButtonsContainer.appendChild(allItemsBtn);
  
  
}
function displayActiveItems(){
  let activeItems = document.createElement('button');
  activeItems.textContent = "Active";
  activeItems.classList.add("states-button");
  activeItems.id = "active_items";
  activeItems.addEventListener("click", () => {
    const items = document.querySelectorAll(".todo-item");
    for(let el of items){
      if(el.getAttribute("state")=="complete"){
        el.parentNode.style.display = "none";
      }
    }
  })
  statesButtonsContainer.appendChild(activeItems);
}

function displayCompleteItems(){
  let completeItems = document.createElement('button');
  completeItems.textContent = "Completed";
  completeItems.classList.add("states-button");
  completeItems.id = "complete_items";
  completeItems.addEventListener("click", () => {
    const items = document.querySelectorAll(".todo-item");
    for(let el of items){
      if(el.getAttribute("state")=="incomplete"){
        el.parentNode.style.display = "none";
      } 
    }
  })
  statesButtonsContainer.appendChild(completeItems);
}

function clearCompletedItems(){
  let clearItems = document.createElement('button');
  clearItems.textContent = "Clear Completed";
  clearItems.classList.add("states-button");
  clearItems.id = "clear_items";
  clearItems.addEventListener("click", () => {
    const items = document.querySelectorAll(".todo-item");
    for(let el of items){
      if(el.getAttribute("state")=="complete"){
        sortableContainer.removeChild(el.parentNode);
      } 
    }
  })
  clearButtonContainer.appendChild(clearItems);
}


// Toggle light and dark mode
function swapStyleSheet(sheet){
  
  let pageStyle = document.getElementById("page_style");pageStyle.setAttribute("href", sheet);
}
function toggleMode(){
  let objDate = new Date();
  let currentTime = objDate.getHours();
  //console.log(currentTime);
  if(currentTime > 18 || currentTime < 6){
    swapStyleSheet("light.css");
    
  } else {
    swapStyleSheet("dark.css");
    //sortableContainer.style.setProperty('--background-color', 'pink');
  }
  
}

toggleMode();

// var style = getComputedStyle(document.body)
// console.log( style.getPropertyValue('--bar') ) // #336699
// console.log( style.getPropertyValue('--baz') ) // calc(2px*2)
// :root { --foo:#336699; --bar:var(--foo); --baz:calc(2px*2); }
// document.documentElement.style
//     .setProperty('--my-variable-name', 'pink');
