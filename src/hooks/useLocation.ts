import {Country, State, City} from 'country-state-city'
import { get } from 'http';


const useLocation = () => {
    const getCountryByCode = (countryCode: string) => {
        return Country.getAllCountries().find((country) => country.isoCode === countryCode);
    }

    const getStateByCode = (countryCode: string, stateCode: string) => {
        if (!stateCode) return null;
        return State.getStatesOfCountry(countryCode).find((state) => state.isoCode === stateCode);
    }

    const getCountryStates = (countryCode: string) => {
        return State.getAllStates().filter((state) => state.countryCode === countryCode);
    }

    const getCityByName = (countryCode: string, stateCode: string, cityName: string) => {
        return City.getCitiesOfState(countryCode, stateCode).find((city) => city.name === cityName);
    }

    return {
        getAllCountries : Country.getAllCountries,
        getCountryByCode,
        getStateByCode,
        getCountryStates,
        getCityByName
    }
}
export default useLocation;