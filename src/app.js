/* Initial vars */
let userName = '';
let caloriesGoal = 0;
let caloriesBurned = 0;
let trainingsContainer = document.getElementById('trainings');
let mealsContainer = document.getElementById('meals');
let userNameDisplay = document.getElementById('userName');
let caloriesGoalDisplay = document.getElementById('caloriesGoal');
let modals = document.querySelectorAll('.modal');
let popopver = document.querySelector('.popover');
let trainingFormContainer = document.getElementById('addTraining');
let mealsFormContainer = document.getElementById('addMeal');
let caloriesGoalContainer  = document.getElementById('changeCaloriesGoal');
let changeNameConainer  = document.getElementById('changeName');
let caloriesLeftDisplay = document.getElementById('caloriesLeftDisplay');


let adding = '';
let editing = '';

class Training {
    constructor(name, calories, icon){
        this.name = name;
        this.calories = calories;
        this.icon = icon;
    }
}

class Meal {
    constructor(name, calories, icon){
        this.name = name; 
        this.calories = calories;
        this.icon = icon;
    }
}

class User {
    constructor(name, caloriesGoal, trainings, meals){
        this.name = name;
        this.caloriesGoal = caloriesGoal;
        this.trainings = trainings;
        this.meals = meals;
    }
}

window.addEventListener('load', function(){
    caloriesGoalDisplay.innerHTML = `${caloriesBurned}/${caloriesGoal}`;
});

function calculateCaloriesLeft(){
    return  caloriesGoal - caloriesBurned;

}

function createHTMLfromString(strHTML){
    var temp = document.createElement('template');
    temp.innerHTML = strHTML;
    return temp.content;
}

function openPopover(){
    popopver.setAttribute('style', 'display: block');
}

/* Edit preferences */
function updateUserName(newName){
    userName = newName;
}

function updateCaloriesBurned(caloriesBurned){
    return caloriesLeft = caloriesGoal - caloriesBurned;
}

function updateProgress(){
    caloriesGoalDisplay.innerHTML = `${caloriesBurned}/${caloriesGoal}`;
    caloriesLeftDisplay.innerHTML = `You're ${calculateCaloriesLeft()} calories left`;
}

function closeModal(){
    [].forEach.call(modals, function(modal){
        modal.classList.remove('show');
    })
}

async function injectHTML(container, obj) {
    
    let cardTemplate = `<div class="card -secondary">
    <div class="card-header"><span>${obj.name}</span></div>
    <div class="card-content">
    <div class="chip">${obj.calories} calories</div>
    </div>
    </div>`;
    
    let newCard = await createHTMLfromString(cardTemplate);
    
    container.appendChild(newCard);
    
    closeModal();
}

function updateSettings(){
    if(editing === 'user') {
        let newUserName = document.getElementById('userNameTxt').value;

        userName = newUserName;

        userNameDisplay.innerHTML = userName;

    }

    if(editing === 'caloriesGoal'){
        let newCaloriesGoalVal = document.getElementById('caloriesGoalTxt').value;

        caloriesGoal = newCaloriesGoalVal;

        updateProgress();
    }

    closeModal();
}

function addElement(){
    if(adding === 'training'){
        /*get values from inputs, creates a new object with 
        input text values and calls injectHTML to render HTML */
        let trainingNameVal = document.getElementById('trainingName').value;
        let trainingCaloriesVal = document.getElementById('trainingCalories').value;
        
        let newTraining = new Training(trainingNameVal, trainingCaloriesVal, 'barbell-sharp');

        caloriesBurned = caloriesBurned + parseInt(trainingCaloriesVal);

        trainingNameVal = document.getElementById('trainingName').value = '';
        document.getElementById('trainingCalories').value = '';
        
        injectHTML(trainingsContainer, newTraining);

        updateProgress();
    }
    if(adding === 'meal'){
        let mealNameVal = document.getElementById('mealName').value;
        let mealCaloriesVal = document.getElementById('mealCalories').value;
        
        let newMeal = new Meal(mealNameVal, mealCaloriesVal, 'restaurant-sharp');

        caloriesBurned = caloriesBurned - parseInt(mealCaloriesVal);

        document.getElementById('mealName').value = '';
        document.getElementById('mealCalories').value = ''
        
        injectHTML(mealsContainer, newMeal);

        updateProgress();

    }

}

/*Prompt modal based on parameter modalForm -- also updates modal title*/
function promptModal(modalForm) {
    
    /* Open modal */
    let modalTitle = document.querySelector('.modal-title');
    [].forEach.call(modals, function(modal){
        modal.classList.add('show');
    })
    popopver.removeAttribute('style');

    let allContainers = document.querySelectorAll('.modal .content > div');

    [].forEach.call(allContainers, function(containerToClose){
        if(containerToClose.classList.contains('show')){
            containerToClose.classList.remove('show');
        }
    });
    
    if(modalForm=== 'training'){
        adding = 'training';
        
        trainingFormContainer.classList.add('show');
        
        modalTitle.innerHTML = "Add a Training";
        
    }
    if(modalForm === 'meal'){
        adding = 'meal';
        
        mealsFormContainer.classList.add('show');
        modalTitle.innerHTML = "Add a Meal";
        
    }
    if(modalForm === 'userName'){
        editing = 'user';
        changeNameConainer.classList.add('show');

        modalTitle.innerHTML = 'Update user name';
    }
    if(modalForm === 'caloriesGoal'){
        editing = 'caloriesGoal';
        caloriesGoalContainer.classList.add('show');

       modalTitle.innerHTML = 'Update my calories goal';

    }
    
}