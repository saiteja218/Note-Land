


document.getElementById("btn1").addEventListener("click", () => {
    document.querySelector(".empty").style.display="none";
    document.querySelector(".function1").style.display = "block";
    document.querySelector(".function2").style.display = "none";
})

storage = [];

function renderDataToSrn() {
    if (localStorage.getItem("database")) {
        // document.querySelector(".empty").style.display="none";
        notes = JSON.parse(localStorage.getItem("database"));
        notes.forEach(e => {
            storage.push(e);
            renderDataToLeft(e, e.objId);
            // console.log(e)
        });
    }
}


document.getElementById("btn2").addEventListener("click", () => {
   
    noteTasks = [];

    data = {
        title: document.getElementById("title").value,
        content: document.getElementById("description").value
    }
    data = { ...data, noteTasks };
    console.log(data.title)
    if (data.title != "" && data.content != "") {
        let objId = "id" + Math.floor(Math.random() * 1000000)
        addToLocalStorage(data, objId);
        renderData(data, objId);
    }
    else {
        alert("Note is Incomplete");
    }
})





function renderDataToLeft(data, objId) {
    document.querySelector(".empty").style.display="none";
    let head = document.createElement("h3");
    let para = document.createElement("p");
    let divv = document.createElement("div");
    divv.classList.add('note', objId);
    divv.addEventListener('click', () => renderDataToRight(data, objId));
    divv.appendChild(head);
    divv.appendChild(para);
    // if(data.title.length>=15){
    //     head.innerText = data.title.substring(0,14)+"...";
    // }
    // else
    head.innerText = data.title;
    if(data.content.length>=25){
        para.innerText = data.content.substring(0,25)+"...";
    }
    else
    para.innerText = data.content;

    document.querySelector(".notes").appendChild(divv);
}

function renderDataToRight(data, objId) {
    // document.querySelector(".empty").style.display="none";
    var displayDataDiv = document.createElement('div');
    displayDataDiv.classList.add('displayData');

    var headDiv = document.createElement('div');
    headDiv.classList.add('head', objId);

    var heading = document.createElement('h1');
    heading.textContent = data.title;
    heading.style.fontSize = '29px';

    var btnDiv = document.createElement('div');
    btnDiv.classList.add('btn');

    var newTaskBtn = document.createElement('button');
    newTaskBtn.addEventListener("click", () => newTaskFunc(data, objId));
    newTaskBtn.textContent = 'New Task';
    newTaskBtn.id = 'btn3';

    var deleteNoteBtn = document.createElement('button');
    deleteNoteBtn.textContent = 'Delete Note';
    deleteNoteBtn.addEventListener("click",()=>{
        document.querySelector(".function2").style.display = "none";
        document.querySelector("."+objId).remove();
        deleteNote(deleteNoteBtn,data,objId);
    })
    deleteNoteBtn.id = 'btn4';
   

    btnDiv.appendChild(newTaskBtn);

    btnDiv.appendChild(deleteNoteBtn);

    headDiv.appendChild(heading);
    headDiv.appendChild(btnDiv);

    var dataDiv = document.createElement('div');
    dataDiv.classList.add('data');

    var paragraph = document.createElement('p');
    paragraph.textContent = data.content

    dataDiv.appendChild(paragraph);

    displayDataDiv.appendChild(headDiv);
    displayDataDiv.appendChild(dataDiv);

    document.querySelector(".function2").replaceChildren();
    document.querySelector(".function2").appendChild(displayDataDiv);

    document.querySelector(".function2").style.display = "block";
    document.querySelector(".function1").style.display = "none";

    var taskDivv = document.createElement('div');

    if (data.noteTasks.length >= 1) {
        var H2 = document.createElement('h2');
        H2.innerText = "Tasks List"
        taskDivv.appendChild(H2);
        taskDivv.className = "newTasks"

        data.noteTasks.forEach((e) => {
            // console.log(e.taskName)
            if (e.taskCompleted == false) {
                checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = e.taskName;
                // checkbox.addEventListener("change",()=>{
                //     checkBoxChange(checkbox,e.taskName);
                //     // console.log(e.taskName)
                // })
                checkbox.addEventListener("change", (event) => {
                    checkBoxChange(event.target, e.taskName, data, objId);
                });
                var label = document.createElement('label');
                label.htmlFor = e.taskName;
                label.innerText = e.taskName;
                var lineBreak = document.createElement('br');

                var tasksDiv = document.createElement('div');
                tasksDiv.className = "tasks"
                var dataDiv = document.querySelector(".data");

                tasksDiv.appendChild(checkbox);
                tasksDiv.appendChild(label);
                tasksDiv.appendChild(lineBreak);
                taskDivv.appendChild(tasksDiv);
            }

        })
        data.noteTasks.forEach((e) => {
            if (e.taskCompleted == true) {
                doneTasks = document.createElement("div");
                doneTasks.className = "doneTasks";
                imgg = document.createElement("img");
                imgg.src = "icons8-check-box-with-check-48.png"
                para = document.createElement("p")
                para.innerText = e.taskName;
                doneTasks.appendChild(imgg);
                doneTasks.appendChild(para);

                taskDivv.appendChild(doneTasks);
               
            }
        })

        dataDiv.appendChild(taskDivv);
        taskDivv.style.display = "block"
    }



}


function renderData(data, objId) {
    let head = document.createElement("h3");
    let para = document.createElement("p");
    let divv = document.createElement("div");
    divv.addEventListener('click', () => renderDataToRight(data, objId));
    // btn.addEventListener('click', () => removeELe(objId))
    divv.classList.add('note', objId);

    divv.id = "firstDiv"

    divv.appendChild(head);
    divv.appendChild(para);
    head.innerText = data.title;
    if(data.content.length>=25){
        para.innerText = data.content.substring(0,25)+"...";
    }
    else
    para.innerText = data.content;

    document.querySelector(".notes").appendChild(divv);
    document.querySelector(".function1").style.display = "none";



}



function newTaskFunc(data, objId) {
    const newTaskDiv = document.createElement('div');
    newTaskDiv.className = 'newTask';

    const ttDiv = document.createElement('div');
    ttDiv.className = 'tt';

    const inpDiv = document.createElement('div');
    inpDiv.className = 'inp';

    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.id = 'task';
    inputElement.placeholder = 'Task Name';

    inpDiv.appendChild(inputElement);

    const tskBtnDiv = document.createElement('div');
    tskBtnDiv.className = 'tskBtn';

    const buttonElement = document.createElement('button');
    buttonElement.id = 'btn5';
    buttonElement.textContent = 'Create Task';
    buttonElement.addEventListener("click", () => {
        if (inputElement.value != "") {
            newTaskDiv.style.display = "none";
            createTask(inputElement.value, data, objId);
        }
        else {
            alert("Task cannot be empty")
        }
    })


    tskBtnDiv.appendChild(buttonElement);

    ttDiv.appendChild(inpDiv);
    ttDiv.appendChild(tskBtnDiv);

    newTaskDiv.appendChild(ttDiv);

    document.body.appendChild(newTaskDiv);
    newTaskDiv.style.display = "block"
}
//  taskDivv=document.querySelector(".newTasks");
function createTask(Task, data, objId) {
    // taskDivv=document.querySelector(".newTasks");
    // if (document.querySelector(".newTasks").style.display == "none") {
    // taskDivv.style.display = "block"
    // }
    t = {
        taskName: Task,
        taskCompleted: false
    }
    var taskDivv = document.createElement('div');

    if (data.noteTasks.length == 0) {
        data.noteTasks.push(t);
        // console.log(data);
        changeLocalStorage(data, objId);

        var H2 = document.createElement('h2');
        H2.innerText = "Tasks List"
        taskDivv.appendChild(H2);
        taskDivv.className = "newTasks"

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = Task;
        checkbox.addEventListener("change", () => {
            checkBoxChange(checkbox, Task, data, objId);
        })


        var label = document.createElement('label');
        label.htmlFor = Task;
        label.innerText = Task;
        var lineBreak = document.createElement('br');

        var tasksDiv = document.createElement('div');
        tasksDiv.className = "tasks"
        var dataDiv = document.querySelector(".data");

        tasksDiv.appendChild(checkbox);
        tasksDiv.appendChild(label);
        tasksDiv.appendChild(lineBreak);
        taskDivv.appendChild(tasksDiv);
        dataDiv.appendChild(taskDivv);
        
        taskDivv.style.display = "block"
    }
    else {
        data.noteTasks.push(t);
        console.log(data);
        changeLocalStorage(data, objId);
        var checkbox = document.createElement('input');
        checkbox.addEventListener("change", () => {
            checkBoxChange(checkbox, Task, data, objId);
        })
        checkbox.type = 'checkbox';
        checkbox.value = Task;

        var label = document.createElement('label');
        label.htmlFor = Task;
        label.innerText = Task;
        var lineBreak = document.createElement('br');

        var tasksDiv = document.createElement('div');
        tasksDiv.className = "tasks"
        var dataDiv = document.querySelector(".data");

        tasksDiv.appendChild(checkbox);
        tasksDiv.appendChild(label);
        tasksDiv.appendChild(lineBreak);
        taskDivv.appendChild(tasksDiv);
        dataDiv.appendChild(taskDivv);
        taskDivv.style.display = "block"
    }



}

function checkBoxChange(checkbox, Task, data, objId) {
    if (checkbox.checked) {
        index = data.noteTasks.findIndex((i) => {
            return Task == i.taskName;
        })

        ttt = {
            taskName: Task,
            taskCompleted: true
        }

        data.noteTasks.splice(index, 1, ttt)
        console.log(data)
        changeLocalStorage(data, objId);
        // console.log(Task)
        var label = document.querySelector(`label[for="${Task}"]`);
        var cBox = document.querySelector(`input[type="checkbox"][value="${Task}"]`);
        var labelData = label.innerText;
        label.style.display = "none"
        cBox.style.display = "none"
        label.parentElement.remove();
        label.remove();
        cBox.remove();

        doneTasks = document.createElement("div");
        doneTasks.className = "doneTasks";
        imgg = document.createElement("img");
        imgg.src = "icons8-check-box-with-check-48.png"
        para = document.createElement("p")
        para.innerText = labelData;
        doneTasks.appendChild(imgg);
        doneTasks.appendChild(para);

        document.querySelector(".newTasks").appendChild(doneTasks);
    }

}


function addToLocalStorage(data, objId) {
    data = { ...data, objId }
    storage.push(data);

    localStorage.setItem("database", JSON.stringify(storage));


}

function deleteNote(btn,data,objId){
    db = JSON.parse(localStorage.getItem("database"));
    ind = db.findIndex(note => {
        return note.objId == objId;


    })
   
    db.splice(ind,1);
    localStorage.setItem("database", JSON.stringify(db));
    // renderDataToSrn();
    if(db.length==0){
        storage=[];
        document.querySelector(".empty").style.display="flex";
    }
    
}
function changeLocalStorage(data, objId) {
    // console.log(data)
    data={...data,objId}
    db = JSON.parse(localStorage.getItem("database"));
    ind = db.findIndex(note => {
        return note.objId == objId;

    })
    console.log(ind);

    db.splice(ind, 1, data);
    localStorage.setItem("database", JSON.stringify(db));


}



renderDataToSrn();