'use strict'

import { jsonDataPokemon } from "./json.js";

//! PRIMERO CAZAMOS LOS ELEMENTOS DEL HTML PARA PODER TRABAJAR CON ELLOS POSTERIORMENTE


const formSearch = document.forms[0];
const inputSearch = document.querySelector('.inputsearch');
const namePokemon = document.querySelector('.nombre');
const heightPokemon = document.querySelector('.altura'); 
const weightPokemon = document.querySelector('.peso'); 
const vidaPokemon = document.querySelector('.vida'); 
const attackPokemon = document.querySelector('.ataque');
const defensePokemon = document.querySelector('.defensa');
const attackSpecialPokemon = document.querySelector('.ataqueespecial');
const defenseSpecialPokemon = document.querySelector('.defensaespecial');
const velocityPokemon = document.querySelector('.velocidad'); 
const typesPokemon = document.querySelector('.tipos'); 
const dataPokemonConvertida = JSON.parse(jsonDataPokemon);
const imgDelante = document.querySelector('.imgdelante');
const imgDetras = document.querySelector('.imgdetras');
const contenedorBusqueda = document.querySelector('.containersearch');
console.log(dataPokemonConvertida);


//* EVENTO SUBMIT PARA EL FORMULARIO Y EMPEZAR LA BÚSQUEDA

formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    typesPokemon.textContent = 'TIPOS: '
    const pokemonIntroducido = inputSearch.value;
    const pokemonBuscado = dataPokemonConvertida.results.filter((pokemon) => {
      return pokemon.name.includes(pokemonIntroducido.toLowerCase());
    })
    console.log(pokemonBuscado);
    if (pokemonBuscado.length === 1) {
      namePokemon.textContent = pokemonBuscado[0].name.toUpperCase();
      const urlPokemon = pokemonBuscado[0].url;
      fetch(urlPokemon)
      .then((resp) => resp.json()) 
      .then((data) => {
        console.log(data)
        heightPokemon.textContent = `ALTURA: ${data.height} ft`;
        weightPokemon.textContent = `PESO: ${data.weight} lb`;
        vidaPokemon.textContent = `VIDA: ${data.stats[0].base_stat} hp`;
        attackPokemon.textContent = `ATAQUE: ${data.stats[1].base_stat} p`;
        defensePokemon.textContent = `DEFENSA: ${data.stats[2].base_stat} p`;
        attackSpecialPokemon.textContent = `ATAQUE ESPECIAL: ${data.stats[3].base_stat} p`;
        defenseSpecialPokemon.textContent = `DEFENSA ESPECIAL: ${data.stats[4].base_stat} p`;
        velocityPokemon.textContent = `VELOCIDAD: ${data.stats[5].base_stat} p`;
        data.types.forEach((element) => typesPokemon.textContent += ` ${element.type.name.toUpperCase()}`);
        imgDelante.setAttribute('src', data.sprites.front_default);
        imgDetras.setAttribute('src', data.sprites.back_default);
        inputSearch.value = '';
        inputSearch.focus();
      })
      .catch((error) => console.error("Error:", error));
    } else {
      pokemonBuscado.forEach((pokemon) => {
        const elementoBuscado = document.createElement('button');
        console.log(elementoBuscado);
        elementoBuscado.classList.add('creado');
        elementoBuscado.textContent = pokemon.name.toUpperCase();
        contenedorBusqueda.appendChild(elementoBuscado);

        elementoBuscado.addEventListener('click', (e) => {
          namePokemon.textContent = e.target.textContent;
          const urlPokemon = pokemon.url;
          fetch(urlPokemon)
          .then((resp) => resp.json()) 
          .then((data) => {
          console.log(data)
          heightPokemon.textContent = `ALTURA: ${data.height} ft`;
          weightPokemon.textContent = `PESO: ${data.weight} lb`;
          vidaPokemon.textContent = `VIDA: ${data.stats[0].base_stat} hp`;
          attackPokemon.textContent = `ATAQUE: ${data.stats[1].base_stat} p`;
          defensePokemon.textContent = `DEFENSA: ${data.stats[2].base_stat} p`;
          attackSpecialPokemon.textContent = `ATAQUE ESPECIAL: ${data.stats[3].base_stat} p`;
          defenseSpecialPokemon.textContent = `DEFENSA ESPECIAL: ${data.stats[4].base_stat} p`;
          velocityPokemon.textContent = `VELOCIDAD: ${data.stats[5].base_stat} p`;
          data.types.forEach((element) => typesPokemon.textContent += ` ${element.type.name.toUpperCase()}`);
          imgDelante.setAttribute('src', data.sprites.front_default);
          imgDetras.setAttribute('src', data.sprites.back_default);
          inputSearch.value = '';
          inputSearch.focus();
      })
      .catch((error) => console.error("Error:", error));
        contenedorBusqueda.innerHTML = '';
        })
      })
    }
  });




