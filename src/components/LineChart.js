import React, { useState } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Colors } from "chart.js";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

ChartJs.register(PointElement, LineElement, CategoryScale, LinearScale, Colors);

const LineChart = ({ ageGroups, ageCount }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBarData, setSelectedBarData] = useState(null);

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      // Extract data for the clicked bar
      const index = elements[0].index;
      const data = {
        label: ageGroups[index],
        count: ageCount[index],
      };
      setSelectedBarData(data);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBarData(null);
  };

  var data = {
    labels: ageGroups,
    datasets: [
      {
        label: "Cases Count by Age Groups",
        data: ageCount,
        borderWidth: 2,
        borderColor: "#FEA619",
        backgroundColor: "#0471A6",
        color: "#fafafa",
        pointHoverBackgroundColor: "yellow",
        pointHoverRadius: 6,
        pointBorderColor: "#f0f3bd",
        pointBackgroundColor: "#021B27",
      },
    ],
  };

  var options = {
    onClick: handleBarClick,
    // Title configuration
    animation: true,
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#F5F5F5", // Color for y-axis labels
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
          color: "#F5F5F5", // Color for x-axis labels
          maxRotation: 90,
          minRotation: 0,
        },
        title: {
          display: true,
          color: "#F5F5F5",
          text: "Age Groups",
          padding: 4,
          align: "centre",
        },
      },
    },

    plugins: {
      legend: {
        display: true,

        labels: {
          // Set label text color
          color: "#F5F5F5", // Color for all labels
        },
      },
    },
  };

  return (
    <div style={{ height: "100%" }}>
      <Line
        data={data}
        // height={100%}
        height={360}
        width={450}
        options={options}
      />

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
          <h6>🟠 Distribution by Age</h6>
          <hr />
          {selectedBarData && (
            <div>
              <p>Age Group: {selectedBarData.label}</p>
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

//fetching a data from the api in the component
const handleAgeGroup = async (setAgeGroups, setAgeCount, selectedYear) => {
  const url = "http://127.0.0.1:8000/age-list/";
  const response = await fetch(url);
  const fetchedData = await response.json();
  // console.log(fetchedData);

  //Filter data for year 2021 and then extract age_group
  const ageGroups = fetchedData
    .filter((item) => item.year === selectedYear) // Filter data for year 2021
    .map((item) => item.age_group); // Extract age_group
  // console.log(ageGroups);

  setAgeGroups(ageGroups);

  const ageCount = fetchedData
    .filter((item) => item.year === selectedYear) // Filter data for year 2021
    .map((item) => item.age_count); // Extract age_group
  // console.log(ageCount);

  setAgeCount(ageCount);
};

export { LineChart, handleAgeGroup };
