import { plugins } from "chart.js";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const BarChart = ({ monthlyCount, months }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBarData, setSelectedBarData] = useState(null);

  const handleBarClick = (event, elements) => {
    if (elements.length > 0) {
      // Extract data for the clicked bar
      const index = elements[0].index;
      const data = {
        label: months[index],
        count: monthlyCount[index],
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
    labels: months,
    datasets: [
      {
        label: "Monthly Cases Count",
        color: "#fafafa",
        data: monthlyCount,
        borderWidth: 1,
        borderColor: "#ff9f1c",
        backgroundColor: ["#FF8C46", "#FFC25E", "#D9D9DB"],
        barThickness: 8, // Adjust the width of the bars
        borderRadius: 9, // Make the bars round
      },
    ],
  };

  var options = {
    onClick: handleBarClick,
    responsive: true,

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
        },
        title: {
          display: true,
          color: "#F5F5F5",
          text: "Months",
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
    <div style={{ height: "100%",width:"auto", textAlign:"center",overflow: "hidden" }}>
      <Bar data={data} height={300} options={options} />

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
          <h6>🟠 Distribution by Month</h6>
          <hr />
          {selectedBarData && (
            <div>
              <p>Months: {selectedBarData.label}</p>
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
const handleMonthlyData = async (setMonths, setMCaseCount, selectedYear) => {
  const url = "http://127.0.0.1:8000/monthly-list/";
  const response = await fetch(url);
  const fetchedData = await response.json();

  const months = fetchedData
    .filter((item) => item.year === selectedYear)
    .map((item) => item.month);
  setMonths(months);

  const monthlyCount = fetchedData
    .filter((item) => item.year === selectedYear)
    .map((item) => item.count);
  setMCaseCount(monthlyCount);
};

export { BarChart, handleMonthlyData };
