import "./App.css";
import { BarChart, handleMonthlyData } from "./components/BarChart";
import { LineChart, handleAgeGroup } from "./components/LineChart";
import Navbar from "./components/Navbar";
import { PieChart, handleYearlyData } from "./components/PieChart";
import { BarChartp, handlePoliceSt } from "./components/PoliceStations";
import HeatmapComponent from "./components/Map";
import { useState, useEffect } from "react";

function App() {
  const [selectedYear, setSelectedYear] = useState(2021);
  const [ageGroups, setAgeGroups] = useState([]);
  const [ageCount, setAgeCount] = useState([]);
  const [policeSt, setPoliceId] = useState([]);
  const [casesCount, setCaseCount] = useState({});
  const [months, setMonths] = useState([]);
  const [monthlyCount, setMCaseCount] = useState([]);
  const [allYears, setyears] = useState([]);
  const [yearlyCount, setYcaseCount] = useState([]);
  const [policeName, setPoliceNames] = useState([]);

  //checking the valid years and handling year change event
  const [validYears, setValidYears] = useState([2021]); // Initialize the array with a default year
  const checkYear = [2021, 2022, 2023];
  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);

    // Clear existing data
    setAgeGroups([]);
    setPoliceId([]);
    setMonths([]);
    setyears([]);
    setAgeCount([]);
    setCaseCount({});
    setMCaseCount([]);
    setYcaseCount([]);
    setValidYears([]);

    if (!validYears.includes(year)) {
      setValidYears([...validYears, year]); // Add the selected year to the valid years array
    }

    fetchData();

    if (!checkYear.includes(year)) {
      alert("Sorry! Data for this Year is not available yet.");
    }
  };

  // cheking valid city handling city change event
  const [selectedCity, setSelectedCity] = useState("Pune"); // Initialize the selected city with a default value
  const city = ["Pune"];
  const handleCityChange = (event) => {
    const selectedCity = event.target.value; // Get the selected city from the event
    setSelectedCity(selectedCity); // Set the selected city in state
    // Check if the selected city is valid
    if (!city.includes(selectedCity)) {
      // Use ! to check if the selected city is NOT in the city array
      setSelectedCity("Pune"); // Reset the selected city to the default value if it's not valid
      alert("Sorry! Data for this City is not available yet.");
    }
  };

  //fecthing a data from the API Components functions
  const fetchData = async () => {
    handleAgeGroup(setAgeGroups, setAgeCount, selectedYear, selectedCity);
    handlePoliceSt(
      setPoliceId,
      setCaseCount,
      setPoliceNames,
      selectedYear,
      selectedCity,
      policeName
    );
    handleMonthlyData(setMonths, setMCaseCount, selectedYear, selectedCity);
    handleYearlyData(setyears, setYcaseCount, selectedYear, selectedCity);
  };

  // Trigger fetchData initially using useEffect for client-side fetching
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container-fluid mt-2 ml-1">
        <div className="row gx-2">
          {/* First Column */}
          <div className="col-md-3">
            <div
              id="glowing-div"
              className="border p-3  mb-2"
              style={{ height: "345px", borderRadius:"5px" }}
            >
              {/* Dropdown functionality for year*/}
              <h5 style={{ color: "#FEA619" }}>Missing Persons</h5>

              {/* making row for dropdown menu and button */}
              <div className="row pb-2 mt-3">
                {/* first colomn for year dropdown */}
                <div style={{ textAlign: "center", borderRadius:"5px" }} className="col">
                  <label
                    style={{
                      color: "#FEA619",
                      borderRadius: "10px",
                      marginRight: "10px",
                      fontSize: "20px",
                    }}
                  >
                    Year:
                  </label>

                  <select
                    style={{
                      backgroundColor: "transparent",
                      textAlign: "center",
                      color: "white",
                      borderRadius: 7,
                      borderBlockColor: "#ff9f1c",
                    }}
                    value={selectedYear}
                    onChange={handleYearChange}
                  >
                    <option
                      style={{
                        color: "white",
                        backgroundColor: " #77787B",
                      }}
                      value={2021}
                    >
                      2021
                    </option>

                    <option
                      style={{
                        color: "white",
                        backgroundColor: " #77787B",
                      }}
                      value={2022}
                    >
                      2022
                    </option>

                    <option
                      style={{
                        color: "white",
                        backgroundColor: " #77787B",
                      }}
                      value={2023}
                    >
                      2023
                    </option>
                  </select>
                </div>

                <div style={{ textAlign: "center",borderRadius:"5px" }} className="col">
                  {/* dropdown functionality for city */}
                  <label
                    style={{
                      color: "#FEA619",
                      marginRight: "10px",
                      alignItems: "left",
                      fontSize: "20px",
                      // display: "block"
                    }}
                  >
                    City:
                  </label>

                  <select
                    style={{
                      backgroundColor: "transparent",
                      textAlign: "center",
                      color: "white",
                      borderRadius: 7,
                      borderBlockColor: "#ff9f1c",
                    }}
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option
                      style={{
                        color: "black",
                        backgroundColor: " #77787B",
                      }}
                      value={"Pune"}
                    >
                      Pune
                    </option>
                  </select>
                </div>
                {/* third colomn for button to fetch data */}
              </div>

              <hr style={{color:"white"}} />

             
              {/* second div in the first card */}
              {/* div fo showing the summary of the yearwise data */}

              {selectedYear === 2021 && (
                <div className="year-2021-content" style={{ color: "white",borderRadius:"5px" }}>
                  » In 2021, the 20-25 age group had the highest number of
                  missing cases: 573.
                  <br />
                  <br />» L10 police station reported the highest number of
                  missing cases, totaling 318.
                  <br />
                  <br />» In March, there were 250 reported missing person
                  cases.
                </div>
              )}

              {selectedYear === 2022 && (
                <div className="year-2022-content" style={{ color: "white",borderRadius:"5px" }}>
                  » In 2022, the 15-20 age group had the highest number of
                  missing cases: 634.
                  <br />
                  <br />
                  » L14 police station reported the highest number of missing
                  cases, totaling 239.
                  <br />
                  <br />» In June, there were 328 reported missing person cases.
                </div>
              )}

              {selectedYear === 2023 && (
                <div className="year-2023-content" style={{ color: "white",borderRadius:"5px" }}>
                  » In 2023, the 20-25 age group had the highest number of
                  missing cases: 625.
                  <br />
                  <br />
                  » L10 police station reported the highest number of missing
                  cases, totaling 223.
                  <br />
                  <br />» In October, there were 284 reported missing person
                  cases.
                </div>
              )}
              {/* second div in the first card */}
            </div>

            <div
              className="border p-2 "
              style={{ height: "303px", overflow: "hidden",borderRadius:"5px" }}
              id="glowing-div"
            >
              <LineChart
                ageGroups={ageGroups}
                ageCount={ageCount}
                style={{ height: "300px" }}
              />
            </div>
          </div>

          {/* Second Column */}
          <div className="col-md-6" >
            <div className="border p-1 mb-2" style={{borderRadius:"5px"}}>
                {/* height: "calc(100% - 100px)" */}
                
                  
                    <HeatmapComponent
                      selectedYear={selectedYear}
                      setSelectedYear={setSelectedYear}
                    />
              
              </div>


             
                <div className="col-md-12">
                  <div
                    id="glowing-div"
                    className="border p-2"
                    style={{ height: "100%", overflow: "hidden" , borderRadius:"5px" }}
                  >
                    <BarChartp
                      policeSt={policeSt}
                      casesCount={casesCount}
                      policeName={policeName}
                    />
                  </div>
                </div>
          </div>


          {/* Third Column */}
          <div className="col-md-3">
            <div
              id="glowing-div"
              className="border p-2 mb-2"
              style={{ height: "345px", overflow: "hidden",borderRadius:"5px" }}
            >
              <BarChart months={months} monthlyCount={monthlyCount} />
            </div>

            <div
              className="border p-2  "
              style={{ height: "303px", overflow: "hidden",borderRadius:"5px" }}
              id="glowing-div"
            >
              {/* Pass chartData as prop to PieChart component */}
              <PieChart allYears={allYears} yearlyCount={yearlyCount} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
