import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { Box } from "@mui/material";
import { blue } from '@mui/material/colors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function formatChartData(data) {
    const sortedData = data.sort((a, b) => new Date(a.consumptionTimestamp) - new Date(b.consumptionTimestamp));
    const consumptionTimestampLabels = sortedData.map((item) => item.consumptionTimestamp);
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
        

    const ConsumptionChart = ({ data }) => {
        data = [{
        "consumptionId": 4296,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:12:00"
      },
      {
        "consumptionId": 4360,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:13:00"
      },
      {
        "consumptionId": 4424,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:14:00"
      },
      {
        "consumptionId": 4488,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:15:00"
      },
      {
        "consumptionId": 4552,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:16:00"
      },
      {
        "consumptionId": 4616,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:17:00"
      },
      {
        "consumptionId": 4680,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:18:00"
      },
      {
        "consumptionId": 4744,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:19:00"
      },
      {
        "consumptionId": 4808,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:20:00"
      },
      {
        "consumptionId": 4872,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:21:00"
      },
      {
        "consumptionId": 4936,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:22:00"
      },
      {
        "consumptionId": 5000,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:23:00"
      },
      {
        "consumptionId": 5064,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:24:00"
      },
      {
        "consumptionId": 5128,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:25:00"
      },
      {
        "consumptionId": 5192,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:26:00"
      },
      {
        "consumptionId": 5256,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:27:00"
      },
      {
        "consumptionId": 5320,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:28:00"
      },
      {
        "consumptionId": 5384,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:29:00"
      },
      {
        "consumptionId": 5448,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:30:00"
      },
      {
        "consumptionId": 5512,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:31:00"
      },
      {
        "consumptionId": 5576,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:32:00"
      },
      {
        "consumptionId": 5640,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:33:00"
      },
      {
        "consumptionId": 5704,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:34:00"
      },
      {
        "consumptionId": 5768,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:35:00"
      },
      {
        "consumptionId": 5832,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:36:00"
      },
      {
        "consumptionId": 5896,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:37:00"
      },
      {
        "consumptionId": 5960,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:38:00"
      },
      {
        "consumptionId": 6024,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:39:00"
      },
      {
        "consumptionId": 6088,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:40:00"
      },
      {
        "consumptionId": 6152,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:41:00"
      },
      {
        "consumptionId": 6216,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:42:00"
      },
      {
        "consumptionId": 6280,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:43:00"
      },
      {
        "consumptionId": 6344,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:44:00"
      },
      {
        "consumptionId": 6408,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:45:00"
      },
      {
        "consumptionId": 6472,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:46:00"
      },
      {
        "consumptionId": 6536,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:47:00"
      },
      {
        "consumptionId": 6600,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:48:00"
      },
      {
        "consumptionId": 6664,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:49:00"
      },
      {
        "consumptionId": 6728,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:50:00"
      },
      {
        "consumptionId": 6792,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:51:00"
      },
      {
        "consumptionId": 6856,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:52:00"
      },
      {
        "consumptionId": 6920,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:53:00"
      },
      {
        "consumptionId": 6984,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:54:00"
      },
      {
        "consumptionId": 7048,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:55:00"
      },
      {
        "consumptionId": 7112,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:56:00"
      },
      {
        "consumptionId": 7176,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:57:00"
      },
      {
        "consumptionId": 7240,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:58:00"
      },
      {
        "consumptionId": 7304,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T14:59:00"
      },
      {
        "consumptionId": 7368,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:00:00"
      },
      {
        "consumptionId": 7432,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:01:00"
      },
      {
        "consumptionId": 7496,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:02:00"
      },
      {
        "consumptionId": 7560,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:03:00"
      },
      {
        "consumptionId": 7624,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:04:00"
      },
      {
        "consumptionId": 7688,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:05:00"
      },
      {
        "consumptionId": 7752,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:06:00"
      },
      {
        "consumptionId": 7816,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:07:00"
      },
      {
        "consumptionId": 7880,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:08:00"
      },
      {
        "consumptionId": 7944,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:09:00"
      },
      {
        "consumptionId": 8008,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:10:00"
      },
      {
        "consumptionId": 8072,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:11:00"
      },
      {
        "consumptionId": 8136,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:12:00"
      },
      {
        "consumptionId": 8200,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:13:00"
      },
      {
        "consumptionId": 8264,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:14:00"
      },
      {
        "consumptionId": 8328,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:15:00"
      },
      {
        "consumptionId": 8392,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:16:00"
      },
      {
        "consumptionId": 8456,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:17:00"
      },
      {
        "consumptionId": 8520,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:18:00"
      },
      {
        "consumptionId": 8584,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:19:00"
      },
      {
        "consumptionId": 8648,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:20:00"
      },
      {
        "consumptionId": 8712,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:21:00"
      },
      {
        "consumptionId": 8776,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:22:00"
      },
      {
        "consumptionId": 8840,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:23:00"
      },
      {
        "consumptionId": 8904,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:24:00"
      },
      {
        "consumptionId": 8968,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:25:00"
      },
      {
        "consumptionId": 9032,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:26:00"
      },
      {
        "consumptionId": 9096,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:27:00"
      },
      {
        "consumptionId": 9160,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:28:00"
      },
      {
        "consumptionId": 9224,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:29:00"
      },
      {
        "consumptionId": 9288,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:30:00"
      },
      {
        "consumptionId": 9352,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:31:00"
      },
      {
        "consumptionId": 9416,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:32:00"
      },
      {
        "consumptionId": 9480,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:33:00"
      },
      {
        "consumptionId": 9544,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:34:00"
      },
      {
        "consumptionId": 9608,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:35:00"
      },
      {
        "consumptionId": 9672,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:36:00"
      },
      {
        "consumptionId": 9736,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:37:00"
      },
      {
        "consumptionId": 9800,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:38:00"
      },
      {
        "consumptionId": 9864,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:39:00"
      },
      {
        "consumptionId": 9928,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:40:00"
      },
      {
        "consumptionId": 9992,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:41:00"
      },
      {
        "consumptionId": 10056,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:42:00"
      },
      {
        "consumptionId": 10120,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T15:45:00"
      },
      {
        "consumptionId": 10184,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T16:00:00"
      },
      {
        "consumptionId": 10248,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T16:15:00"
      },
      {
        "consumptionId": 10312,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T16:30:00"
      },
      {
        "consumptionId": 10376,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T17:24:00"
      },
      {
        "consumptionId": 10440,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T17:25:00"
      },
      {
        "consumptionId": 10504,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T17:26:00"
      },
      {
        "consumptionId": 10568,
        "meteringPointId": 56,
        "consumptionValue": 0.0,
        "consumptionTimestamp": "2024-12-11T17:30:00"
      }
    ];

        const updatedData = data.map((item) => ({
            ...item,
            consumptionValue: parseFloat((Math.random() * 40 + 10).toFixed(2)), // Generar valores aleatorios
        }));

        const chartData = formatChartData(updatedData);
      
        const chartOptions = {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Energy Consumption of Metering Point" + " " + updatedData[0].meteringPointId
                + " " + "from" + " " + updatedData[0].consumptionTimestamp + " " + "to" + " " + updatedData[updatedData.length - 1].consumptionTimestamp,
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
            consumptionTimestamp: PropTypes.string.isRequired,
            consumptionValue: PropTypes.number.isRequired,
          })
        ).isRequired,
      };

      ConsumptionChart.defaultProps = {
        data: [],
      };
     
      
      export default ConsumptionChart;