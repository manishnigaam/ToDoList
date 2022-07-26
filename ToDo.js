console.log('ToDo List script');

// const inputField = document.querySelector('.inputField input');
let inputBox = document.getElementById('TodoInput');
let addBtn =document.getElementById('addBtn');
let clearBtn =document.getElementById('clearBtn');
let todoList= document.querySelector('.toDoList');


inputBox.addEventListener('keyup',()=>{
    let inputData = inputBox.value;//get the input value
    // console.log(inputData);
    // x=inputData.trim()
    // console.log(x!=0)
    if(inputData.trim() != 0 ){
        addBtn.classList.add('active');
    }else{
        addBtn.classList.remove('active');
    }
});
showLists();//calling function

addBtn.addEventListener('click',()=>{
    let userData = document.getElementById('TodoInput').value;//get the input value
    let getLocalStorage= localStorage.getItem("ToDo");//getting localstorage
    if(getLocalStorage==null){
        listArr= []; //create blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //change json string to js object
    }
    listArr.push(userData); //push/add user data in array
    localStorage.setItem("ToDo",JSON.stringify(listArr)); //change js object to json string
    showLists();//calling function
    document.getElementById('TodoInput').value=""; //input field blank
    addBtn.classList.remove('active');

});

//show list items
function showLists(){
    let getLocalStorage= localStorage.getItem("ToDo");//getting localstorage
    if(getLocalStorage==null){
        listArr= []; //create blank array
    }else{
        listArr = JSON.parse(getLocalStorage); //change json string to js object
    };

    //start: for clear all section
    let listNo= document.querySelector('.listNo');
    listNo.textContent = listArr.length; //passing the array length value in pending lists 
    if(listArr.length > 0){
        clearBtn.classList.add('active');//add a active class
    }else{
        clearBtn.classList.remove('active');//remove a active class

    }
    //End: for clear all section

    let newList = "";
    listArr.forEach((element, index) => {
        newList += `<li> ${element} 
                        <span onclick="deletList(${index})";>
                        <i class="fa-solid fa-trash-can"></i>
                        </span>
                    </li>`;
    });

    if(listArr.length !=0){
        todoList.innerHTML=newList; 
    }else{
        todoList.innerHTML=`Nothing to show ToDo List..!! `;
    }
};

//delete list item
function deletList(index){
    let getLocalStorage= localStorage.getItem("ToDo");//getting localstorage
    listArr = JSON.parse(getLocalStorage); //change json string to js object
    listArr.splice(index,1); //delete or remove the perticular list
    //after remove the list again update the localstoreg
    localStorage.setItem("ToDo",JSON.stringify(listArr)); //change js object to json string
    showLists();
};

//clear all function
clearBtn.addEventListener('click',()=>{
    listArr = []; //empty an array
    //after clear all list again update local storage
    localStorage.setItem("ToDo", JSON.stringify(listArr));
    showLists();
    
})