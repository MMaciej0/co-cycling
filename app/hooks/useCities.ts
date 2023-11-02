import citiesDB from 'cities.json';

export type City = {
  country: string;
  name: string;
  lat: string;
  lng: string;
  value?: string;
  label?: string;
};

// @ts-ignore
const formatedCities = citiesDB.map((city: City) => ({
  ...city,
  value: city.name,
  label: city.name,
}));

const useCities = () => {
  const getAll = () => formatedCities;

  const getByName = (name: string) =>
    formatedCities.find(
      (city: City) => city.name.toLowerCase() === name.toLowerCase()
    );

  const getBySubstring = (val: string) =>
    formatedCities.filter((city: City) =>
      city.name.toLowerCase().includes(val.toLowerCase())
    );

  return {
    getAll,
    getByName,
    getBySubstring,
  };
};

export default useCities;
