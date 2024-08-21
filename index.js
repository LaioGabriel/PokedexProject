const pokemonName = document.querySelector(`.pokemon_name`)
const pokemonNumber= document.querySelector(`.pokemon_number`)
const pokemonImg= document.querySelector(`.pokemon`)

const form= document.querySelector(`.form`)
const input= document.querySelector(`.input_search`)
const btn_Prev= document.querySelector(`.btn_prev`)
const btn_Next= document.querySelector(`.btn_next`)

let search_pokemon=1
const fetchPokemon= async(pokemon)=>{
    pokemonName.innerHTML='Procurando...'
    pokemonNumber.innerHTML=''
    const APIresponse= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(APIresponse.status===200){
        const data = await APIresponse.json()
        return data;
    }
}
const renderPokemon= async(pokemon)=>{
const data = await fetchPokemon(pokemon)
if(data){
    pokemonImg.style.display = 'block';
    pokemonName.innerHTML=data.name;
    pokemonNumber.innerHTML=data.id
    pokemonImg.src= data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value=''
    search_pokemon = data.id;
}else{
    pokemonImg.style.display = 'none';
    pokemonName.innerHTML='Não encontrado'
    pokemonNumber=''
   
}

}

form.addEventListener('submit',(event)=>{
event.preventDefault();
renderPokemon(input.value.toLowerCase())
input.value=''

})
btn_Prev.addEventListener('click',()=>{
    if(search_pokemon>1){
        search_pokemon=search_pokemon-1
        renderPokemon(search_pokemon)
    }
  
 })
 btn_Next.addEventListener('click',()=>{
    search_pokemon++
    renderPokemon(search_pokemon)
 })
 renderPokemon(search_pokemon)