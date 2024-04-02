let button=document.querySelector('button');
let img=document.querySelector('.dp');
let sideBar=document.querySelector('.sidebar');
let ul=document.querySelector('ul');
let allrecipe=document.querySelector('.allrecipe');
let input=document.querySelector('input');
let h1=document.querySelector('.title');
let healthScore=document.querySelector('.healthscore');
let readyIn=document.querySelector('.readyin');
let servings=document.querySelector('.servings');
let price=document.querySelector('.pricepserve');
let score=document.querySelector('.score');
let vegetarian=document.querySelector('.vegetarian');
let para=document.querySelector('.para');
let switchRecipe=document.querySelector('.recipe');
let switchIngr=document.querySelector('.ingredients');
let switchNutri=document.querySelector('.nutrition');
let switchInfo=document.querySelector('.info');
let properties=document.querySelector('.properties');
let details=document.querySelector('.recing');
let summary=document.querySelector('.short');
let summaryContainer=document.querySelector('.summary');
let nutriDiv=document.querySelector('.nutriDiv');
let serveText=nutriDiv.querySelector('.servetext');
let datacontainer=document.querySelector('.data');
let header=document.querySelector('.head');
let title=document.querySelector('h1');
let switchopt=document.querySelector('.switch');
let main=document.querySelector('.main');
let mainData=document.querySelector('.maindata');
let options=document.querySelector('.options');
let flag=0;
let nutriflag=0;



let result;
let result2;
let id;
let url2;

let apiKeys=['52c8171ab83141b293a3b559f43e25f1','fccd9f91a89a45d8a52e4596856febee','cf0a888a78d043f687b3f2aab8efa401','93407a687685437e9649add219e60ed8', 'e1d0886b550948968d1624629a7b209e',' 2837bd4cda524fa2a91ca4d4a5df5036']
let count=5;
let apiKey='2837bd4cda524fa2a91ca4d4a5df5036';



button.addEventListener('click',fetch);
document.addEventListener('keyup',(event)=>{
    if(event.key=='Enter')
     fetch();
})
async function fetch(){
    
    try{
        let query=input.value;
        let url=(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&maxFat=100&number=20&diet=vegiterian&apiKey=${apiKey}`);
        result= await axios.get(url);
        console.log(result.data);
        let results=result.data.results;
        ul.innerHTML="";
        for(let i=0;i<results.length;i++){
           let li= document.createElement('li');
            li.classList.add('fetched');
            li.innerText=results[i].title;
            input.classList.remove('instart');
            title.classList.remove('none');
            switchopt.classList.remove('none');
            header.classList.remove('start');
            header.classList.add('header');
            button.classList.remove('button');
            
            main.classList.remove('none');
            ul.append(li);

            (function (index){                                         // creating an iife function
            li.addEventListener('click', async()=>{
                let allLi=document.querySelectorAll('li');
                allLi.forEach(li=>{                                // to remove the class selected from the active li when some other li is clicked.
                    li.classList.remove('selected');
                })
                li.classList.add('selected');
                try{
                id=results[index].id;
                url2=(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`);
                result2=await axios.get(url2);
                console.log(result2);
                setProperties(result2.data);
                }catch(e){
                    console.log("what the shit");
                }
            }
            )})(i);                        //passing i to iife
        }
    }catch(e){
        console.log(e);
   
        if(e.response.data.code===402){
            if(count===apiKeys.length)
              count=0;
            apiKey=apiKeys[count];
            count++;
            console.log(count);
            console.log(apiKey);
        }
        console.log("error occurred");
    }
}
async function setProperties(data){
    mainData.classList.remove('none');
    mainData.classList.add('animateright');
    properties.classList.remove('none');
    summaryContainer.classList.remove('none');
    nutriDiv.classList.add('none');
    details.classList.add('none');
    options.classList.remove('optionsFocus');

    img.src=data.image;
    h1.innerText=data.title;
    healthScore.innerText=`Health Score: ${data.healthScore}/100`;
    readyIn.innerText=`Ready In: ${data.readyInMinutes} Minutes`;
    servings.innerText=`Servings: ${data.servings}`;
    serveText.innerText=`Servings: ${data.servings}`;      //for serving of nutrition
    price.innerText=`Price per serving: ${parseInt((parseInt(data.pricePerServing)/300)*80)} Rs`;
    score.innerText=`Score: ${parseInt(data.spoonacularScore)}`
    vegetarian.innerText=`Vegetarian:${data.vegetarian}`;
    summary.innerHTML=data.summary;
    console.log(data.image);
}

switchRecipe.addEventListener('click',()=>{
    details.classList.add('details');
    switchRecipe.classList.add('optionsFocus');
    switchIngr.classList.remove('optionsFocus');
    switchInfo.classList.remove('optionsFocus');
    switchNutri.classList.remove('optionsFocus');
    details.innerHTML='';
    console.log(result2);
    properties.classList.add('none');
    details.classList.remove('none');
    details.classList.remove('nutriDiv')
    nutriDiv.classList.add('none');
    summaryContainer.classList.add('none');
    for(let i=0;i<result2.data.analyzedInstructions.length;i++){
       

        
        for(let j=0;j<result2.data.analyzedInstructions[i].steps.length;j++){
            let h4=document.createElement('h4');
            h4.classList.add('steps');
            let equipment=document.createElement('p');
            let ingredients=document.createElement('p');
            let description=document.createElement('p');
            let hr=document.createElement('hr');
            let recipeSteps=document.createElement('div');
            let text='';
            let textingr='';
            recipeSteps.classList.add('recipeSteps');
          
            equipment.innerHTML=`<b>Equipments: </b>`;
            ingredients.innerHTML=`<b>Ingredients: </b>`;
            h4.innerText=`${result2.data.analyzedInstructions[i].steps[j].number}`;
            console.log(result2.data.analyzedInstructions[i].steps[i].number);
            description.innerHTML=`<b>${result2.data.analyzedInstructions[i].steps[j].step}</b>`;
            console.log(result2.data.analyzedInstructions[i].steps[i].step);
            for(let k=0;k<result2.data.analyzedInstructions[i].steps[j].equipment.length;k++){
            text+=`${result2.data.analyzedInstructions[i].steps[j].equipment[k].name}, `;
            console.log(text);
            }
            for(let k=0;k<result2.data.analyzedInstructions[i].steps[j].ingredients.length;k++)
            textingr+=`${result2.data.analyzedInstructions[i].steps[j].ingredients[k].name}, `;
                    
                
        ingredients.innerHTML=`<b>Ingredients:</b> ${textingr.slice(0,-2)}`;
        equipment.innerHTML=`<b>Equipments: </b>${text.slice(0,-2)}`;
        recipeSteps.appendChild(h4);
        recipeSteps.appendChild(equipment);
        recipeSteps.appendChild(ingredients);
        recipeSteps.appendChild(description);
        recipeSteps.appendChild(hr);
        details.appendChild(recipeSteps);
        } 
    }  
    mainData.style='padding-top:0px';
});
document.addEventListener('click',(event)=>{
    if (event.srcElement.classList[0]!=='recipe'&&event.srcElement.classList[0]!=='maindata'&&event.srcElement.classList[0]!=='recipeSteps'&&event.srcElement.offsetParent.classList[0]!=='recipeSteps'){
        console.log(event.srcElement.offsetParent.classList[0]=='recipeSteps');
        mainData.style='padding=top:5rem';
    }
})

switchInfo.addEventListener('click',()=>{
    switchRecipe.classList.remove('optionsFocus');
    switchIngr.classList.remove('optionsFocus');
    switchInfo.classList.add('optionsFocus');
    switchNutri.classList.remove('optionsFocus');
    properties.classList.remove('none');
    nutriDiv.classList.add('none');
    details.classList.add('none');
    summaryContainer.classList.remove('none');
});


let switchIngrClicked = false; // Variable to track if switchIngr has been clicked once
switchIngr.addEventListener('click', ingclick);
function ingclick() {
    if (!switchIngrClicked) {
        displayIngr();
        setIngr();
        switchIngrClicked = true; // Set switchIngrClicked to true after the first click
    }
}

function displayIngr() {
    switchRecipe.classList.remove('optionsFocus');
    switchIngr.classList.add('optionsFocus');
    switchInfo.classList.remove('optionsFocus');
    switchNutri.classList.remove('optionsFocus');
    properties.classList.add('none');
    mainData.style='padding-top:0px';
    details.classList.remove('none');
    details.classList.remove('details');
    details.classList.add('nutriDiv');
    nutriDiv.classList.add('none');
    summaryContainer.classList.add('none');
    para.innerHTML = '';
    details.innerHTML='';
}
async function setIngr() {
    let allIng = result2.data.extendedIngredients;
    let index=document.createElement('div');
    index.classList.add('index');
    let ingr=document.createElement('h2');
    ingr.innerText='Ingredient';
    index.appendChild(ingr);
    details.appendChild(index);
    let amount=document.createElement('h2');
    amount.innerText='Amount';
    index.appendChild(amount);
    let data=document.createElement('div');
    data.classList.add('data');
    details.appendChild(data);

    for (let i = 0; i < allIng.length; i++) {
        let ingData = document.createElement('div');
        ingData.classList.add('ingdata');
        let ingName = document.createElement('h4');
        ingName.innerText = allIng[i].nameClean;
        ingData.appendChild(ingName);
        let quantity = document.createElement('p');
        quantity.innerText = allIng[i].measures.metric.amount + allIng[i].measures.metric.unitShort;
        ingData.appendChild(quantity);
        let hr=document.createElement('hr');
        data.appendChild(ingData);
        data.appendChild(hr);
    }
}
//Event listener for other elements
document.addEventListener('click', function(event) {                // most imp- to turn flag on when something is clicked instead ingredients
    if (event.srcElement.classList[0]!=='ingr') {
        console.log(event.srcElement);
        // Reset flag if any element other than switchIngr is clicked
        switchIngrClicked = false;
    }
});
document.addEventListener('click',(event)=>{
    if(event.srcElement.classList[0]!=='nutrition'){
        nutriflag=0;
    }
})

switchNutri.addEventListener('click',async()=>{
    if(nutriflag==0){
        switchRecipe.classList.remove('optionsFocus');
        switchIngr.classList.remove('optionsFocus');
        switchInfo.classList.remove('optionsFocus');
        switchNutri.classList.add('optionsFocus');    
        summaryContainer.classList.add('none');
        details.classList.add('none');
        properties.classList.remove('none');
        nutriDiv.classList.remove('none');
        datacontainer.innerHTML = '';
    let url=`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${apiKey}`
    let result=await axios.get(url);
    let data=result.data;
    for(let i=0;i<data.nutrients.length;i++){
        let dataDiv=document.createElement('div');
        let h4=document.createElement('h4');
        let hr=document.createElement('hr');
        let p=document.createElement('p');
        let span=document.createElement('span');
        dataDiv.appendChild(h4);
        dataDiv.appendChild(p);
        dataDiv.appendChild(span);
        dataDiv.classList.add('dataDiv');
        datacontainer.appendChild(dataDiv);
        datacontainer.appendChild(hr);
        p.innerText=`${data.nutrients[i].amount} ${data.nutrients[i].unit}`; 
        h4.innerText=data.nutrients[i].name;
        span.innerText=data.nutrients[i].percentOfDailyNeeds;
    }
    console.log(result.data);
    nutriflag=1;
}
})
