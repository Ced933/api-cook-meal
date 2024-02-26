const inputSearch:any = document.querySelector("#search");
const form:any = document.querySelector("#form");
let arrayData:any =[]; 
let wordSearch:any;
const result:any = document.querySelector("#result")

inputSearch.addEventListener('change', ()=>{
    wordSearch = inputSearch.value;
})

const fetchData = async ()=>{
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${wordSearch}`)
    .then((res) => res.json())
    .then((data) => arrayData = data.meals) 
    console.log(arrayData,wordSearch)
}

form.addEventListener('submit', async (e:any)=>{
   
    e.preventDefault()
    result.innerHTML = "";
   await fetchData();
   if(arrayData == null){
    result.innerHTML = "<h3>désole aucune recette n'a été trouvé</h3>"
}else{
    createCardFound();
}
})

const createCardFound = () =>{
    
    arrayData.map((recipe:any) => {
       
        let ingredients:any =[];
        // let measure:any = [];
        
      for(let i = 1; i < 21; i++){
        // lorsqu'on a un une key qui s'incremente exemple strIngredient1 strIngredient2 strIngredient3 on recupére le parametre de notre map avec  recipe[`strIngredient${i}`] si ca va jusqu'a 20 on le préscise dans notre for 
        if(recipe[`strIngredient${i}`]){
            // creation de deux variables qui vont récupérer nos valeur que si elles existent grace a notre if 
            // a chaque tour de boucle on récupère un ingrédient et un measure qu'on va pusher dans le grand tableau 
            let ingredient:any = recipe[`strIngredient${i}`]
            let measure:any = recipe[`strMeasure${i}`];
            // on les push dans notre tableau ingredients à l'extérieur 
            console.log(ingredient + "-" + measure )
            ingredients.push(`<li>${ingredient} : ${measure} </li>`) 
        } 
    }  
        // lorsqu'on fait un map avec plusieur instruction pour retourner le innerHTML IL FAUT METRE UN RETURN 
        return result.innerHTML += 
      ` <li> 
            <h2> ${recipe.strMeal} </h2>
            <p> ${recipe.strArea} </p>
            <img src=${recipe.strMealThumb} alt=${recipe.strMeal} />
            <ul> 
                ${ingredients.join('')}                  
            </ul>
        </li>
        ` 
    })
}



