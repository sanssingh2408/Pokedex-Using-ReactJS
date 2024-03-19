import { useState } from 'react';
import './App.css'

function App() {
  
  const[Pokemon, setPokemon]=useState("");
  const[Image, setImage]=useState("");
  const[Pokemonname, setPokemonname]=useState("");
  const[Type, setType]=useState("");
  const[Attack, setAttack]=useState("");
  const[Defense, setDefense]=useState("");
  const[Speed, setSpeed]=useState("");
  function getname(event)
  {
    setPokemon(event.target.value);
  }
  async function generate()
  {
    if(Pokemon=="")
    {
      // console.log("entere the name of Pokemon");
      return;
    }
    let searchQuery = Pokemon.toLowerCase();
    let apiurl=`https://pokeapi.co/api/v2/pokemon/${searchQuery}`;
    
    try{
      
      const response=await fetch(apiurl);
      if(!response.ok)
      {
          throw new Error("Not able to find pokemon");
      }
      const data=await response.json();
      console.log(data);
      let tempName=data.name
      setPokemonname(tempName.toUpperCase());
      setImage(data.sprites.front_default);
      let tempType=data.types[0].type.name;
      setType(tempType.toUpperCase());
      setAttack(data.stats[1].base_stat);
      setDefense(data.stats[2].base_stat);
      setSpeed(data.stats[5].base_stat);
      setPokemon("");
  }
  catch(Error)
  {
      window.alert("Not able to find pokemon");
      // console.log(window); 
  }
  }
  return (
   <>
   <img src="assets/logo.jpeg" alt="pokemon logo" className='logo'/>
   <div className='inputfield'>
   <input type="text" className='poxmon' value={Pokemon} onChange={getname}/>
   <button onClick={generate}>🔎</button>
   </div>
   <div className='card'>
    <h1 className='pokemonName'> {Pokemonname}</h1>
    <h2 className='type'> {Type}</h2>
    <img className='pokemon_image' src={Image} alt={`${Pokemon} Image`} />
    <div className='description'>
      <p className='stats'>Attack</p>
      <p className='stats'>Defense</p>
      <p className='stats'>Speed</p>
    </div>
    <div className='description_value'>
      <p className='stats_value'>{Attack}</p>
      <p className='stats_value'>{Defense}</p>
      <p className='stats_value'>{Speed}</p>
    </div>
   </div>
   </>
  )
}

export default App
