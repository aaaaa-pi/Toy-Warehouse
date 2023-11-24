import { countryList } from "@doubco/countries";

export default defineEventHandler((event) => {
    return {
        random_country: countryList[Math.floor(Math.random() * countryList.length)]
    }
})