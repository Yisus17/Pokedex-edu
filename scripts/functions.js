const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';
const URL_BASE_IMG = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

async function findPokemon() {

    var HTMLInputPokemonID = document.getElementById('inputPokemonID');
    const pokemonID = HTMLInputPokemonID.value;

    if (pokemonID.length > 0) {
        const response = await fetch(URL_BASE + pokemonID).then(response => response.json()).catch(error => {
            alert("Error buscando el pokemon con id: " + pokemonID);
            console.log(error);
        });

        if (response) {
            localStorage.setItem('currentPokemon', JSON.stringify(response));
            window.location.href = 'detalle.html';
        }

    } else {
        alert("Introduzca un identificador valido")
    }
}

function loadPokemonFromLocalStorage() {
    if (localStorage.getItem("currentPokemon") === null) {
        alert("No hay datos de ningún pokemon");
    } else {
        var pokemon = JSON.parse(localStorage.getItem("currentPokemon"));
        var nombrePokemon = pokemon.name.toLocaleUpperCase();

        var HTMLdetailTitle = document.getElementById('detailTitle');
        HTMLdetailTitle.innerHTML+=' '+nombrePokemon;
        loadImageForPokemon(pokemon.id);
        loadInfoPokemon(pokemon);
    }
}

function loadImageForPokemon(idPokemon){
    let HTMLImageElement = document.getElementById('pokemonImg'); 
    HTMLImageElement.src = URL_BASE_IMG+idPokemon+'.png';
}

function loadInfoPokemon(pokemon){
    let HTMLPeso = document.getElementById('peso');
    let HTMLAltura = document.getElementById('altura');

    const peso = pokemon.weight;
    const altura = pokemon.height;

    HTMLPeso.innerHTML += peso;
    HTMLAltura.innerHTML += altura;
}