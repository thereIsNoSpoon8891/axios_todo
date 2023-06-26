

// GET data from
 function getData(){
    axios.get("https://api.vschool.io/shane88/todo")
        .then(result => listData(result.data))//pass the data straight into the listData function
        .catch(error => console.log(error))
}

function listData(data){
    //    document.getElementById('displayitem').innerHTML = ""
    clearList()

for (i = 0; i < data.length; i++){// loop through the array of objects and append them to the DOM
    
    

    const ulList = document.createElement('ul')
    document.getElementById('displayitem').appendChild(ulList)
    //display title
    const listTitle = document.createElement('li')
    listTitle.innerHTML = data[i].title
    ulList.appendChild(listTitle)
    
    //price
    const listPrice = document.createElement('li')
    listPrice.textContent = data[i].price
    ulList.appendChild(listPrice)
    // description
    const listDescription = document.createElement('li')
    listDescription.textContent = data[i].description
    ulList.appendChild(listDescription)
    // display image
    const listImg = document.createElement('li')
    const showImg = document.createElement('img')
    showImg.setAttribute('src', data[i].imgUrl)
    showImg.setAttribute('width', '50') 
    ulList.appendChild(listImg)
    listImg.appendChild(showImg)
    // create delete button for todo
    
    const button = document.createElement('button')
    button.textContent = ""
    ulList.appendChild(button)
    const space = document.createElement('br')
    
    
    // ulList.appendChild(li)

    button.setAttribute('id', data[i]._id)
    button.setAttribute('class', 'deletebutton')
    //create striked list for completed Todos
    if (data[i].completed){// displays text with strike if todo completed: true
        listTitle.innerHTML = `<s class="complete">${data[i].title}<s/>`
        listPrice.innerHTML = `<s class="complete">${data[i].price}<s/>`
        listDescription.innerHTML = `<s class="complete">${data[i].description}<s/>`
    }
    // create checkbox with label
    const checkBox = document.createElement('input')
    checkBox.setAttribute('type', 'checkbox')
    checkBox.setAttribute('value', data[i]._id)
    checkBox.setAttribute('name', 'putlist')
    //create checkbox 
    const checkBoxText = document.createElement('label')
    checkBoxText.setAttribute('for', 'putlist')
    checkBoxText.textContent = 'Mark this Todo complete'
    checkBox.setAttribute('class', 'checkboxes')
    ulList.appendChild(checkBoxText)
    ulList.appendChild(checkBox)
    checkBoxText.prepend(space)
    
    const breakText = document.createElement('br')// add break to put element at bottom of list
    ulList.appendChild(breakText)
    
    // const editButton = document.createElement('button')
    // editButton.textContent = `Edit`
    // editButton.setAttribute('id', data[i]._id + "0")
    // ulList.appendChild(editButton)
    
    //create delete button callback function
    const removeButton = document.getElementById(data[i]._id)
    
    removeButton.addEventListener('click', e => {//why can i not assign more than listener in the loop?
        e.preventDefault()
        
        axios.delete("https://api.vschool.io/shane88/todo/" + e.target.id)
        .then(result => getData())
        .catch(error => console.log(error))
        
        })
    } addEdit(data)
}

function addEdit (data){
    for(i = 0; i < data.length; i++){
        const editButtons = document.getElementById(data[i]._id + "0")
        
        editButtons.addEventListener('click', e => {
            e.preventDefault()
            editButtons.textContent = `Save`
            editButtons.setAttribute('id', 'clickedbutton')
            
        })
    }
}

const todoList = document.todolist

todoList.addEventListener("submit", e => {
    e.preventDefault()
    
    const newTodo = {
        title: todoList.title.value,
        price: todoList.price.value,
        description: todoList.description.value,
        imgUrl: todoList.img.value
    }
    
    todoList.title.value = ""
    todoList.price.value = ""
    todoList.description.value = ""
    todoList.img.value = ""
    
    axios.post("https://api.vschool.io/shane88/todo", newTodo)
    .then(result => getData())
    .catch(error => console.log(error))
})

const listCheck = document.checkboxes

listCheck.addEventListener("submit", e => {
    e.preventDefault()
    // alert('test')
    for(i = 0; i < listCheck.putlist.length; i++){
        if(listCheck.putlist[i].checked){
            
            
            axios.put("https://api.vschool.io/shane88/todo/" + listCheck.putlist[i].value, {completed: true})
            .then(result => getData())
            .catch(error => console.log(error))
        } 
    }
})
    
    function clearList(){
        const el = document.getElementById('displayitem')
        while(el.firstChild){
            el.removeChild(el.firstChild)
        }
    }


    getData()
    
    
    