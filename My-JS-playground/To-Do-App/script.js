'use strict'

class Task {
    constructor(task, status){
        this.task = task;
        this.status = status;
        this.id = Date.now();
    }
};

///////////////////////////////////////
// APPLICATION ARCHITECTURE


const taskForm = document.querySelector('.new-task-form');
const taskInput = document.querySelector('.new-task-input');
const taskDisplay = document.querySelector('.tasks-container');
const filterDisplay = document.querySelector('.filter-cur');
const filterOptions = document.querySelector('.filter-option')

class App{
    constructor(){
        this.tasks=[];
        this._filterCurrent();
        taskForm.addEventListener('submit', this._createNewTask.bind(this));
        taskDisplay.addEventListener('click', this._displayStatusOption.bind(this));
        filterDisplay.addEventListener('click', this._filterDisplay.bind(this));
    }

    // create new task on user input
    _createNewTask(e){
            e.preventDefault();
            let taskStatus = filterDisplay.innerText;
            if (filterDisplay.innerText === 'all') taskStatus = 'not start';
            const newTask = new Task(taskInput.value, taskStatus);
            this.tasks.push(newTask);
            taskInput.value = ''; //clear form input value
            this._displayTask(newTask);
    
    }

    // Displaying the added task to DOM
    _displayTask({task, status, id}){
        const newTask = document.createElement('div');
        const html = 
        `<span>👉  ${task}</span>
        <div class="task-status">
        <div class="cur-status">${status}</div>
        <ul class="status-options hidden">
            <li class="option" value="not-start">not start</li>
            <li class="option" value="on-going">on going</li>
            <li class="option" value="completed">completed</li>
        </ul></div>`;
        newTask.classList.add('task-container');
        newTask.setAttribute('id', id)
        newTask.innerHTML = html;
        taskDisplay.appendChild(newTask);
        const curStatus = document.querySelectorAll('.cur-status');
        curStatus.forEach(el => this._curStatusDisplay(el));
        
    }

    _displayFilterTasks(curFilter){
        let filterTasks;
        taskDisplay.innerHTML = '';

        if(curFilter !== 'all'){
            filterTasks = this.tasks.filter(el => el.status === curFilter);
        } else {
            filterTasks = this.tasks;
        }
        
        filterTasks.forEach(task =>{
            this._displayTask(task);
        })
        const curStatus = document.querySelectorAll('.cur-status');
        curStatus.forEach(el => this._curStatusDisplay(el));
        

    }
    _displayStatusOption(e){
        
            const clicked = e.target.closest('.cur-status');
            // gaurd clause
            if (!clicked) return;
            const targetEl = clicked.nextElementSibling;
            targetEl.classList.toggle('hidden')

            const statusOptions = document.querySelectorAll('.status-options');
            statusOptions.forEach(el=> {
                if (el !== targetEl){
                    el.classList.add('hidden')
                }
            })
            this._updateStatus(targetEl, clicked);
            
    }
    // Updateing task's status from user input
    _updateStatus(options, curStatus){
        options.addEventListener('click', (e)=>{
            const clicked = e.target.closest('.option');
            
            if (!clicked) return;
            const whatTaskID = e.target.closest('.task-container').id;
            clicked.parentElement.previousElementSibling.innerText  = clicked.innerText
            const dataUpdate = this.tasks.find(task => task.id == whatTaskID);
            dataUpdate.status = clicked.innerText;

            this._curStatusDisplay(curStatus);
            options.classList.add('hidden')   
        })
    }

    // Change color of current status
    _curStatusDisplay(curStatus){
        if (curStatus.innerText === 'not start') {
            curStatus.style.borderColor = 'red';
            curStatus.style.color = 'red';
        }
        if (curStatus.innerText === 'on going') {
            curStatus.style.borderColor = 'orange';
            curStatus.style.color = 'orange';
        }
        if (curStatus.innerText === 'completed') {
            curStatus.style.borderColor = 'springgreen';
            curStatus.style.color = 'springgreen';
        }
    }

    _filterCurrent(selectedFilter = 'all'){
        let curFilter = selectedFilter;
        const filterCur = document.querySelector('.filter-cur')
        filterCur.innerText = curFilter;
        this._displayFilterTasks(curFilter);
    }
    // Filter display
    _filterDisplay(e){
        filterOptions.classList.toggle('hidden')
        filterDisplay.classList.add('hidden')
        
        const eachOption = document.querySelectorAll('.option');
        eachOption.forEach(option=>{
            option.addEventListener('click', ()=>{
                const selectedFilter = option.dataset.option
                .split('-')
                .join(' ');
                this._filterCurrent(selectedFilter);
                filterDisplay.classList.remove('hidden')
                option.parentElement.classList.add('hidden');
            })
        })
    }
    
}

const application = new App();

