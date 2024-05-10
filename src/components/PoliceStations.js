import React, { useState } from "react";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Colors } from "chart.js";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

ChartJs.register(BarElement, CategoryScale, LinearScale, Colors);

let delayed;
const BarChartp = ({ casesCount, policeSt, policeName }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBarData, setSelectedBarData] = useState(null);

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      // Extract data for the clicked bar
      const index = elements[0].index;
      const data = {
        label: policeName[index],
        count: casesCount[index],
      };
      setSelectedBarData(data);
      setModalOpen(true);
    }
  };

  // Defining Modal here
  const closeModal = () => {
    setModalOpen(false);
    setSelectedBarData(null);
  };



  var data = {
    labels: policeSt,
    datasets: [
      {
        label: " Cases Count by Police Station",
        color: "#fafafa",
        data: casesCount,
        borderWidth: 1,
        borderColor: "#ff9f1c",
        backgroundColor: ["#FF8C46", "#FFC25E", "#D9D9DB"],
        barThickness: 8, // Adjust the width of the bars
        borderRadius: 9, // Make the bars round
      },
    ],
  };

  var options = {
    responsive: true,

    onClick: handleBarClick,
    // on hover background color should change
    hoverBackgroundColor: ["#ffce56"],
    animations: {
      tension: {
        duration: 1000,
        easing: "easeInQuart",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    // delayed animation here is not working yet
    animation: {
      // loop: true,
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }

        return delay;
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white", // Color for x-axis labels
        },
        title: {
          display: true,
          color: "#F5F5F5",
          text: "No. of Cases",
          padding: 4,
          align: "centre",
        },
      },

      x: {
        beginAtZero: true,
        ticks: {
          color: "white", // Color for x-axis labels
          maxRotation: 90,
          minRotation: 0,
          // autoSkip: false,
        },
        title: {
          display: true,
          color: "#F5F5F5",
          text: "Police Stations",
          padding: 4,
          align: "centre",
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          // Set label text color
          color: "#F5F5F5", // Color for all labels
        },
      },
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <Bar data={data} height={117} options={options} />

      <Modal
        isOpen={modalOpen}
        toggle={closeModal}
        centered={true}
        size={"lg,sm"}
        style={{ opacity: 0.8 }}
      >
        <ModalHeader
          toggle={closeModal}
          style={{ textAlign: "center", color: "#021B27" }}
        >
          <b>Missing Person Cases </b>
        </ModalHeader>

        <ModalBody>
          <h6>🟠 Distribution by Police Station</h6>
          <hr />
          {selectedBarData && (
            <div>
              <p>Police Station: {selectedBarData.label}</p>
              <p>Missing Persons Case Count: {selectedBarData.count}</p>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            color="btn btn-outline-success"
            onClick={closeModal}
            size={"sm"}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

// function for calling a api and filtering a data into the barchart
const handlePoliceSt = async (
  setPoliceId,
  setCaseCount,
  setPoliceNames,
  selectedYear
) => {
  const url = "http://127.0.0.1:8000/policest-list/";
  const response = await fetch(url);
  const fetchedData = await response.json();
  // console.log(fetchedData);
  //Filter data for year 2021 and then extract case count
  const policeSt = fetchedData
    .filter((item) => item.year === selectedYear) // Filter data for year 2021
    .map((item) => item.loc_id);
  setPoliceId(policeSt);

  const casesCount = fetchedData
    .filter((item) => item.year === selectedYear) // Filter data for year 2021
    .map((item) => item.count);

  setCaseCount(casesCount);

  const policeName = fetchedData
    .filter((item) => item.year === selectedYear) // Filter data for year 2021
    .map((item) => item.police_station);

  setPoliceNames(policeName);
};

export { handlePoliceSt, BarChartp };
