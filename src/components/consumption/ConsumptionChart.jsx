import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { Box } from "@mui/material";
import { blue } from '@mui/material/colors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function formatChartData(data, intervalType) {
    const sortedData = data.sort((a, b) => new Date(a.consumptionTimestamp) - new Date(b.consumptionTimestamp));

    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      switch (intervalType) {
          case "INTERVAL":
              return timestamp; 
          case "DAY":
              return date.toLocaleDateString();
          case "MONTH":
              return `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`; 
          case "YEAR":
              return date.getFullYear().toString();
          default:
              return timestamp;
      }
  };

    const consumptionTimestampLabels = sortedData.map((item) => formatTimestamp(item.consumptionTimestamp));
    const consumptionValues = sortedData.map((item) => item.consumptionValue);
    return {
        labels: consumptionTimestampLabels,
        datasets: [
        {
            label: "Energy Consumption",
            data: consumptionValues,
            borderColor: blue[700],
            backgroundColor: blue[900],
            borderWidth: 1,
            tension: 0.1,
        },
        ],
    };
}
        

    const ConsumptionChart = ({ data, intervalType }) => {

        const meteringPointId = data.length > 0 ? data[0].meteringPointId : "Not available";
        const chartTitle = data.length > 0
            ? `Energy Consumption of Metering Point ${meteringPointId} from ${data[0].consumptionTimestamp} to ${data[data.length - 1].consumptionTimestamp}`
            : "No data available";

        const chartData = formatChartData(data, intervalType);
      
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
            <Bar data={chartData} options={chartOptions} />
          </Box>
        );
      };
      
      ConsumptionChart.propTypes = {
        data: PropTypes.arrayOf(
          PropTypes.shape({
            consumptionTimestamp: PropTypes.string,
            consumptionValue: PropTypes.number,
            meteringPointId: PropTypes.string,
          })
        ).isRequired,
        intervalType: PropTypes.string,
      };
     
      
      export default ConsumptionChart;