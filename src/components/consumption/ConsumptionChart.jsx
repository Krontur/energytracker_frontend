import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { Box } from "@mui/material";
import { blue } from '@mui/material/colors';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
const localZone = dayjs.tz.guess();

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
  let endOfChartTitle;
  switch (intervalType) {
    case "DAILY":
      endOfChartTitle = "day";
      break;
    case "MONTHLY":
      endOfChartTitle = "month";
      break;
    case "YEARLY":
      endOfChartTitle = "year";
      break;
    default:
      endOfChartTitle = "";
  }
  const fromTimestamp = data.length > 0 ? new Date(data[0].consumptionTimestamp) : new Date().toISOString();
  const toTimestamp = data.length > 0 ? new Date(data[data.length - 1].consumptionTimestamp) : new Date().toISOString();

  const fromDateTime = dayjs(fromTimestamp)
    .tz(localZone)
    .startOf(endOfChartTitle)
    .format('YYYY-MM-DDTHH:mm:ss');

  const toDateTime = dayjs(toTimestamp)
    .tz(localZone)
    .endOf(endOfChartTitle)
    .minute(intervalType === "INTERVAL" ? toTimestamp.getMinutes() : 59)
    .format('YYYY-MM-DDTHH:mm:ss');

  const chartTitle = data.length > 0
    ? `Energy Consumption of Metering Point ${meteringPointId} from ${fromDateTime} to ${toDateTime} ${intervalType.toLowerCase()}`
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
      meteringPointId: PropTypes.number,
    })
  ).isRequired,
  intervalType: PropTypes.string,
};


export default ConsumptionChart;