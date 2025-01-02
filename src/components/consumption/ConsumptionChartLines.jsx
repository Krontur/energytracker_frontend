import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip } from "chart.js";
import { Box } from "@mui/material";
import { blue, red, green } from "@mui/material/colors";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

function formatChartData(data) {
  const colors = [blue[700], red[700], green[700]];

  const datasets = data.map((dataset, index) => {
    const sortedData = dataset.consumptions.sort((a, b) =>
      new Date(a.consumptionTimestamp) - new Date(b.consumptionTimestamp)
    );

    const values = sortedData.map((item) => item.consumptionValue);

    return {
      label: `Metering Point ${dataset.meteringPointId}`,
      data: values,
      fill: false,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      tension: 0.3, 
      pointRadius: 3,
      borderWidth: 1,
    };
  });

  const labels = data[0]?.consumptions.map((item) =>
    new Date(item.consumptionTimestamp).toLocaleString()
  ) || [];

  return {
    labels,
    datasets,
  };
}

const ConsumptionChartLines = ({ data, intervalType }) => {
  const chartTitle = data.length > 0
    ? `Energy Consumption for Selected Metering Points (${intervalType.toLowerCase()})`
    : "No data available";

  const chartData = formatChartData(data);

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Timestamp",
        },
      },
      y: {
        title: {
          display: true,
          text: "Consumption Value (kWh)",
        },
      },
    },
  };

  return (
    <Box>
      <Line data={chartData} options={chartOptions} />
    </Box>
  );
};

ConsumptionChartLines.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      meteringPointId: PropTypes.number.isRequired,
      consumptions: PropTypes.arrayOf(
        PropTypes.shape({
          consumptionTimestamp: PropTypes.string.isRequired,
          consumptionValue: PropTypes.number.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  intervalType: PropTypes.string.isRequired,
};

export default ConsumptionChartLines;
