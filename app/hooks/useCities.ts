import citiesDB from 'cities.json';

export type City = {
  country: string;
  name: string;
  lat: number;
  lng: number;
};

const cities = citiesDB as City[];
const formatedCities = cities.map((city: City) => ({
  ...city,
  value: city.name,
  label: city.name,
}));

const useCities = () => {
  const getAll = () => formatedCities;

  const getByName = (name: string) =>
    formatedCities.find(
      (city) => city.name.toLowerCase() === name.toLowerCase()
    );

  const getBySubstring = (val: string) =>
    formatedCities.filter((city) =>
      city.name.toLowerCase().includes(val.toLowerCase())
    );

  return {
    getAll,
    getByName,
    getBySubstring,
  };
};

export default useCities;
