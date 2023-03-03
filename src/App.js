import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";

const regionOptions = [
  { value: "AllRegions", label: "AllRegions" },
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];
const ALL_COUNTRIES = "allCountries";
function App() {
  const [countries, setCountries] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchedConutry, setSearchedCountry] = useState(ALL_COUNTRIES);
  function fetchCountries(name) {
    setIsLoading(true);
    try {
      fetch(
        name === ALL_COUNTRIES
          ? "https://restcountries.com/v3.1/all"
          : "https://restcountries.com/v3.1/name/" + name
      )
        .then((res) => {
          if (res.status !== 200) {
            setErrorMsg(res.statusText);
            return [];
          } else {
            setErrorMsg("");
            return res.json();
          }
        })
        .then((data) => {
          setIsLoading(false);

          setCountries(
            data.length > 0
              ? data.filter((country) => {
                  if (selectedRegion === regionOptions[0]) {
                    return country;
                  } else {
                    return country.region === selectedRegion.value;
                  }
                })
              : []
          );
        });
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    fetchCountries(searchedConutry);
  }, [selectedRegion, searchedConutry]);

  function handleSearchInputChange(event) {
    if (event.target.value.length === 0) {
      setSearchedCountry(ALL_COUNTRIES);
    }
  }
  function handleRegionChange(selectedRegionParam) {
    setSelectedRegion(selectedRegionParam);
  }
  function handleSearchInputKeyDown(event) {
    if (event.key === "Enter") {
      setSearchedCountry(event.target.value);
    }
  }
  return (
    <>
      <Navbar
        handleSearchInputChange={handleSearchInputChange}
        handleSearchInputKeyDown={handleSearchInputKeyDown}
        regionOptions={regionOptions}
        handleRegionChange={handleRegionChange}
        selectedRegion={selectedRegion}
      />
      <main>
        <section className="cards">
          <>
            {isLoading ? (
              Array.from(Array(12).keys()).map((fakeId) => (
                <Shimmer key={fakeId} />
              ))
            ) : errorMsg !== "" ? (
              <div>{errorMsg}</div>
            ) : (
              countries.map((country) => {
                return <Card key={country.ccn3} country={country} />;
              })
            )}
          </>
        </section>
      </main>
    </>
  );
}

export const Shimmer = () => {
  return (
    <article className="profile-card-shimmer">
      <div className="profile-img"></div>
      <div className="country-name"></div>
      <div className="country-region"></div>
    </article>
  );
};

export default App;
