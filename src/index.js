import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfEl = document.querySelector('.country-info')



function fetchCountries() {
   const country = inputEl.value.trim(); 
  
       return fetch(`https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`).then(
    (res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    }
    
  );
  }


function renderCountriesList(users) {
    const markup = users
      .map((user) => {
        return `<li class="country__itm">
        <img class="country__image" src="${user.flags.svg}" width=30px alt="${user.flags.alt}"/>
        <p> ${user.name.official}</p>
          </li>`;
      })
      .join("");
    countryList.innerHTML = markup;
   
  }

function renderCountryInfo(users) {
    const countryMarkup = users
      .map((user) => {
        return `<h2>
        <span class="country__itm"><img class="country__image" src="${user.flags.svg}" width=30px alt="${user.flags.alt}"/>${user.name.official}</span>
        </h2>
        <p> <h3> Capital: </h3> ${user.capital}</p>
        <p> <h3> Population: </h3> ${user.population}</p>
        <p> <h3> Languages: </h3> ${Object.values(user.languages)}</p>
          </li>`;
      })
      .join("");
    countryInfEl.innerHTML = countryMarkup;
   
  }
  inputEl.addEventListener("input", debounce(() => {
    if (inputEl.value.trim() === "") {return} 
    else {
    fetchCountries( )
      .then(
        (users) =>
         { if (users.length > 10) {
          countryInfEl.innerHTML = "";
          countryList.innerHTML = "";
           Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
           }
        else if(users.length <=10 && users.length >1) {
          countryInfEl.innerHTML = ""
          renderCountriesList(users) }
        else if(users.length === 1) {
          countryList.innerHTML = ""
          renderCountryInfo(users) }
          else if (users.length === 0) {
            countryInfEl.innerHTML = "",
            countryList.innerHTML = ""
            
             }
      
      })
      .catch((error) => 
      
      Notiflix.Notify.failure('Oops, there is no country with that name'),
      countryInfEl.innerHTML = "",
      countryList.innerHTML = "",
      );
    }
     }, DEBOUNCE_DELAY));