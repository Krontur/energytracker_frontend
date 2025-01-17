import { Box } from "@mui/material"
import ConsumptionCard from "./ConsumptionCard"
import { useState, useEffect } from "react"
import { useFetchWithAuth } from "../../hooks/useFetchWithAuth"


const ConsumptionDashboard = () => {

    const [loading, setLoading] = useState(true);
    const [ consumptions, setConsumptions ] = useState([]);
    const [ meteringPoints, setMeteringPoints ] = useState([]);
    const { api } = useFetchWithAuth();

    const handleFetchMaxConsumptions = async () => {
        console.log('Fetching max consumptions');

        try {
            const { data, status } = await api.get('https://localhost:8082/consumptions/max');
            if (status === 200){
                console.log(data);
                setConsumptions(data);
            } else {
                console.log(data);
            }
        } catch (error){
            console.log(error);
        }
    };

    const handleFetchMeteringPoint = async (id) => {
        console.log("Fetching Metering Point with id: " + id);

        try {
            const { data, status} = await api.get(`http://localhost:8080/api/v1/metering-points/${id}`);
            if (status === 200){
                console.log(data);
                setMeteringPoints((prev) => [ ...prev, data ]);
            }
        } catch (error){
            console.log(error);

        }
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            // Datos simulados
            const mockConsumptions = [
                {
                "consumptionId": 2184,
                "meteringPointId": 214,
                "consumptionValue": 320.0,
                "consumptionTimestamp": "2024-12-11T13:39:00"
                },
                {
                "consumptionId": 2248,
                "meteringPointId": 214,
                "consumptionValue": 34.0,
                "consumptionTimestamp": "2024-12-11T13:40:00"
                },
                {
                "consumptionId": 2312,
                "meteringPointId": 214,
                "consumptionValue": 145.0,
                "consumptionTimestamp": "2024-12-11T13:41:00"
                }
            ];

            setConsumptions(mockConsumptions);

            // Espera la carga de todos los meteringPoints
            const meteringPointsData = [];
            for (const consumption of mockConsumptions) {
                const { data, status} = await api.get(`http://localhost:8080/api/v1/metering-points/${consumption.meteringPointId}`);
                if (status === 200){
                    meteringPointsData.push(data);
                }
            }

            console.log(meteringPointsData);

            if (meteringPointsData.length === 0) {
                setLoading(true);
                return;
            }
      
            setMeteringPoints(meteringPointsData);
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);

      useEffect(() => {
        console.log("Consumptions updated:", consumptions);
      }, [consumptions]);
      
      useEffect(() => {
        console.log("MeteringPoints updated:", meteringPoints);
      }, [meteringPoints]);
      
      return (
      <Box
        component="main"
        sx={{
          flexGrow: 2,
          bgcolor: "background.default",
          p: 3,
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          gap: 2,
          width: "100%",
          alignItems: "center",
          minWidth: "480px",
          height: "auto",
          margin: "0 auto",
        }}
      >
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          consumptions.map((consumption, index) => {
            const meteringPoint = meteringPoints.find(
              (meteringPoint) =>
                meteringPoint.meteringPointId === consumption.meteringPointId
            );
            return meteringPoint ? (
              <ConsumptionCard
                key={index}
                meteringPoint={meteringPoint}
                consumption={consumption}
              />
            ) : null;
          })
        )}
      </Box>
      );      
}

export default ConsumptionDashboard;