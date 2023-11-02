import citiesDB from 'cities.json';

export type City = {
  country: string;
  name: string;
  lat: number;
  lng: number;
  value?: string;
  label?: string;
};

const cities = citiesDB as unknown as City[];

const useCities = () => {
  const getAll = () => cities;

  const formatCity = (city: City) => {
    return {
      ...city,
      lat: Number(city.lat),
      lng: Number(city.lng),
      value: city.name,
      label: city.name,
    };
  };

  const getByName = (name: string) => {
    const city = cities.find(
      (city: City) => city.name.toLowerCase() === name.toLowerCase()
    );
    return city ? formatCity(city) : null;
  };

  const getBySubstring = (val: string): City[] => {
    return cities
      .filter((city: City) =>
        city.name.toLowerCase().includes(val.toLowerCase())
      )
      .map((city: City) => {
        return formatCity(city);
      });
  };

  return {
    getAll,
    getByName,
    getBySubstring,
  };
};

export default useCities;
