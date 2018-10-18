const DATABASE = firebase.database()
const listRef = DATABASE.ref("Grocery Lists")

let txtboxStore = document.querySelector('#txtboxStore')
let btnStore = document.querySelector('#btnStore')
let container = document.querySelector('#container')
let userInputDiv = document.querySelector('#userInputDiv')
let viewList = document.querySelector('#viewList')

let groceryLists = []
let groceryItems = []

function removeDatabaseData(){
  listRef.child('kroger').remove()
}
//removeDatabaseData()

function displayLists(groceryLists){
  let listItems = groceryLists.map(function(groceryList){
    return `<li>${groceryList.name}</li>`
  })
  viewList.innerHTML = listItems.join('')
}

function getAllLists() {
  listRef.on('value', function(snapshot){
    groceryLists = []
    snapshot.forEach(function(childSnapshot){
      groceryLists.push(childSnapshot.val())
    })
      displayLists(groceryLists)
  })
}
getAllLists()

function storeToDatabase(storeName, groceryItem) {
  let storeRef = listRef.child(storeName)
  storeRef.set({
    name : storeName,
    items : groceryItems
  })
}

function assignListItems(storeName) {
  let groceryItem = txtboxGroceryItem.value
  groceryItems.push(groceryItem)
  storeToDatabase(storeName, groceryItems)
}

function createStoreDiv(storeName) {
  let createListDiv = `
  <div id="userInputDiv"/>
    <h3>${storeName}</h3>
    <input id="txtboxGroceryItem" type="text" placeholder="enter grocery item"/>
    <button id="btnSubmitList" onclick="assignListItems('${storeName}')">Submit</button>
  </div>`
  container.innerHTML = createListDiv
}

btnStore.addEventListener('click', function() {
  let userInputStore = txtboxStore.value
  createStoreDiv(userInputStore)
})
