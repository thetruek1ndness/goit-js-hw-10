import './css/styles.css';

import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;


const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const  countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const searchName = event.target.value.trim();

  if (!searchName) {
    clearMarkup();
    return;
  }

  fetchCountries(searchName)
    .then(findCountry)
    .catch(error => console.log(error));
}

function findCountry(countries){
  if(countries.length > 10){
    Notiflix.Notify.info('Too many matches found.')
    clearMarkup();
    return;
  } 
  
  if((countries.length > 1) && (countries.length <= 10)){
    countryInfoRef.innerHTML = "";
    return createList(countries);
  } 
  
  if(countries.length === 1){
    countryListRef.innerHTML = "";
    return createDescription(countries);
  }
}

function createDescription(countries){
  const markup = countries.map(country => {
    `<div class="country">
    <img src="${country.flags.svg}" alt="flag of ${country.name.official}">
    <h2 class="country-name">${country.name.official}</h2>
    <ul>
      <li>
        <p><b>Capital</b>${country.capital}</p>
      </li>
      <li>
        <p><b>Population</b>${country.population}</p>
      </li>
      <li>
        <p><b>Languages</b>${country.Languages}</p>
      </li>
    </ul>
  </div>`
  }).join('');
  countryInfoRef.innerHTML = markup;
}

function createList(countries){
  const markup = countries.map(country => `<div class="country">
  <img src="${country.flags.svg}" alt="flag of ${country.name.official}" width="60" height="30">
  <h2 class="country-name">${country.name.official}</h2></div>`).join('');
  countryListRef.innerHTML = markup;
}
  
function clearMarkup() {
    countryListRef.innerHTML = '';
    countryInfoRef.innerHTML = '';
}