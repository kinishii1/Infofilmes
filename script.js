// Seletores DOM para elementos com ID
const mensagemErro = document.getElementById("mensagemErro");
const inputNomeFilme = document.querySelector(".input");
const botaoBuscar = document.getElementById("botao_buscar");
const titulo = document.getElementById("titulo");
const sinopse = document.getElementById("sinopse");
const poster = document.querySelector(".poster");
const ano = document.getElementById("ano");
const duracao = document.getElementById("duracao");
const valorAvaliacao = document.querySelector(".valorAvaliacao");
const genero = document.getElementById("genero");
const atores = document.getElementById("atores");
const diretor = document.getElementById("diretor");
const spinner = document.querySelector('#loadingSpinner')

const apiKey = "d3773b94";
const imgDefault = "./default_image.png";

botaoBuscar.addEventListener('click', () => {
  clearInput();
  renderMovie();
});

async function searchMovie(prop) {
  try {
    if (!prop) {
      throw new Error('Please enter a movie title');
    }

    const res = await fetch(`http://www.omdbapi.com/?t=${prop}&apikey=${apiKey}`);

    if (!res.ok) {
      throw new Error('Invalid movie or API request');
    }

    const data = await res.json();

    if (data.Error) {
      throw new Error(data.Error);
    }

    return data;
  } catch (error) {
    displayError(error.message);
  }
}

async function renderMovie() {
  clearInput();
  displayLoading(true);

  try {
    const movie = await searchMovie(inputNomeFilme.value);
    renderInfo(movie);
  } catch (error) {
  } finally {
    displayLoading(false);
  }
}

function renderInfo(prop) {
  titulo.innerText = prop.Title;
  sinopse.innerText = prop.Plot;
  ano.innerText = prop.Year;
  duracao.innerText = prop.Runtime;
  valorAvaliacao.innerText = prop.Rated;
  genero.innerText = prop.Genre;
  atores.innerText = prop.Actors;
  diretor.innerText = prop.Director;
  poster.setAttribute('src', prop.Poster);
}

function clearInput() {
  mensagemErro.innerText = '';
  titulo.innerText = '';
  sinopse.innerText = '';
  ano.innerText = '';
  duracao.innerText = '';
  valorAvaliacao.innerText = '';
  genero.innerText = '';
  atores.innerText = '';
  diretor.innerText = '';
  poster.setAttribute('src', './default_image.png');
}

function displayError(errorMessage) {
  mensagemErro.innerText = errorMessage;
}

function displayLoading(isLoading) {
  if (isLoading) {
    spinner.style.display = 'block';
  } else {
    spinner.style.display = 'none'
  }
}