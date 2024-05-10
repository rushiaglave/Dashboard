import React, { useState } from "react";
import {
  Chart as ChartJs,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Colors } from "chart.js";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

ChartJs.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Colors,
  Tooltip,
  Legend
);

const PieChart = ({ allYears, yearlyCount }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBarData, setSelectedBarData] = useState(null);

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      // Extract data for the clicked bar
      const index = elements[0].index;
      const data = {
        label: allYears[index],
        count: yearlyCount[index],
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
    labels: allYears,
    datasets: [
      {
        label: "Cases Count by Year-wise",
        data: yearlyCount,
        borderWidth: 1.5,
        borderColor: "#fec89a",
        backgroundColor:  ["#FF8C46", "#FFC25E", "#D9D9DB"],
        color: "#fafafa",
      },
    ],
  };

  var options = {
    onClick: handleBarClick,
    // hover background color
    hoverBackgroundColor: ["#ffce56"],
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
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pie data={data} options={options} />

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
          <h6>🟠 Distribution by Year</h6>
          <hr />
          {selectedBarData && (
            <div>
              <p>Year: {selectedBarData.label}</p>
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
const handleYearlyData = async (setyears, setYcaseCount) => {
  const url = "http://127.0.0.1:8000/yearly-list/";
  const response = await fetch(url);
  const fetchedData = await response.json();

  //Filter data for year-wise and then extract total  cases count
  const allYears = fetchedData.map((item) => item.year);
  setyears(allYears);

  const yearlyCount = fetchedData.map((item) => item.count);

  setYcaseCount(yearlyCount);
};

export { PieChart, handleYearlyData };
