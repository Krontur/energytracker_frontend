import { useState, useRef, useEffect } from 'react';
import ConsumptionChart from './ConsumptionChart';
import ConsumptionChartLines from './ConsumptionChartLines';
import ConsumptionForm from './ConsumptionForm';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import exportFromJSON from 'export-from-json';

const Consumptions = () => {
  const [consumptions, setConsumptions] = useState(null);
  const [intervalType, setIntervalType] = useState('INTERVAL');
  const [showTable, setShowTable] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 50;

  const tableRef = useRef(null);

  const handleToggleTable = () => {
    setShowTable((prev) => !prev);
  };

  useEffect(() => {
    if (showTable && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showTable]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const getCommonTimestamps = () => {
    const allTimestamps = consumptions
      .flatMap((dataset) => dataset.consumptions.map((item) => item.consumptionTimestamp));
    return Array.from(new Set(allTimestamps)).sort();
  };

  const getConsumptionValue = (timestamp, meteringPointId) => {
    const dataset = consumptions.find((d) => d.meteringPointId === meteringPointId);
    const consumption = dataset.consumptions.find((item) => item.consumptionTimestamp === timestamp);
    return consumption
      ? `${consumption.consumptionValue.toFixed(2)} kWh`
      : '-';
  };

  const handleDownloadCSV = () => {
    const data = consumptions.flatMap((dataset) => 
      dataset.consumptions.map((item) => ({
        meteringPointId: dataset.meteringPointId,
        timestamp: item.consumptionTimestamp,
        value: item.consumptionValue.toFixed(2),
      }))
    );

    const fileName = 'consumptions';
    const exportType = 'csv';
    exportFromJSON({ data, fileName, exportType });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 2,
        bgcolor: 'background.default',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        alignItems: 'center',
        minWidth: '480px',
        height: 'auto',
        margin: '0 auto',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Consumptions
      </Typography>

      <ConsumptionForm setConsumptions={setConsumptions} setIntervalType={setIntervalType} />

      {consumptions && consumptions.length > 0 && (
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleToggleTable}
          >
            {showTable ? 'Hide Table' : 'Show as Table'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownloadCSV}
          >
            Download CSV
          </Button>
        </Box>
      )}

      {consumptions && consumptions.length > 0 && (
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            height: '500px',
            mt: 4,
          }}
        >
          {consumptions.length === 1 ? (
            <ConsumptionChart data={consumptions[0].consumptions} intervalType={intervalType} />
          ) : (
            <ConsumptionChartLines data={consumptions} intervalType={intervalType} />
          )}
        </Box>
      )}

      {showTable && consumptions && (
        <TableContainer 
            ref={tableRef}
            component={Paper}
            sx={{ mt: 3, maxWidth: '1000px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                {consumptions.map((dataset) => (
                  <TableCell key={dataset.meteringPointId} align="right">
                    Metering Point {dataset.meteringPointId}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {getCommonTimestamps()
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((timestamp, index) => (
                  <TableRow key={index}>
                    <TableCell>{timestamp}</TableCell>
                    {consumptions.map((dataset) => (
                      <TableCell
                        key={dataset.meteringPointId}
                        align="right"
                      >
                        {getConsumptionValue(timestamp, dataset.meteringPointId)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            component="div"
            count={getCommonTimestamps().length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[rowsPerPage]}
          />
        </TableContainer>
      )}
    </Box>
  );
};

export default Consumptions;
