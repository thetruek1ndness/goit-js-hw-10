const BASE_URL = 'https://restcountries.com/v2/name/';

const fetchCountries = name => {
  const url = `${BASE_URL}${name}?fields=name,capital,population,flags,languages`;
  return fetch(url).then((response) => {
    if(!response.ok){
      throw new Error(Notiflix.Notify.failure('Oops, there is no countrywith that name.'));
    }
    return response.json();
  });
};


export { fetchCountries };