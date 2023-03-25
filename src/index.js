import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')

// inputEl.addEventListener('input' , console.log ("hello"))

function fetchCountries() {
   const country = inputEl.value.trim();

  return fetch(`https://restcountries.com/v3.1/name/${country}?fields=name,flags`).then(
    (res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
     
      return res.json();
      
    }
    
  );
}
console.log(fetchCountries());

function renderCountriesList(users) {
    const markup = users
      .map((user) => {
        return `<li>
        <img class="country__image" src="${user.flags.svg}" width =20px alt="${user.flags.alt}"/>
        <p> ${user.name.common}</p>
          </li>`;
      })
      .join("");
    countryList.innerHTML = markup;
   
  }

  inputEl.addEventListener("input", () => {
    fetchCountries( )
      .then((users) => renderCountriesList(users))
      .catch((error) => console.log(error));
  });