import { Avatar, Box, Flex, FormLabel, Icon, Select, SimpleGrid, useColorModeValue, useColorMode,   Table, Thead, Tbody, Tr, Th, Td, HStack, VStack } from "@chakra-ui/react";
import ClickableMiniStatistics from 'components/card/ClickableMiniStatistics';
import { LineChart, Line, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import React, { useState, useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { renderLineComponents, createLegendPayload, formatChartData, CustomTooltip, getSettings, generateIconBox } from "./PaidCampaignUtils";
import PaidCampaignData from '../variables/Paid_Campaign.json';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePopper } from 'react-popper';
import AdFilterTable from "./AdFilterTable";
import AdPieChart from './AdPieChart';
import { Text } from "@chakra-ui/react";
import ProductTable from './ProductTable';




const ECommerceCampaignReport = () => {
  const minDate = new Date(Math.min.apply(null, PaidCampaignData.map(d => new Date(d.Date))));
  const maxDate = new Date(Math.max.apply(null, PaidCampaignData.map(d => new Date(d.Date))));
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => { filterData(); }, [startDate, endDate]);
  const datepickerButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      !datepickerButtonRef.current.contains(event.target)
    ) {
      setShowPopover(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  const filterData = () => {
    const filtered = PaidCampaignData.filter((d) => new Date(d.Date) >= startDate && new Date(d.Date) <= endDate);
    setFilteredData((prevState) => {
      return [...filtered];
    });
  };
  
  

  const handleDateRangeChange = (item) => {
    setStartDate(item.selection.startDate);
    setEndDate(item.selection.endDate);
  };
  

  // Popover logic
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);
  const { styles, attributes } = usePopper(buttonRef.current, popoverRef.current, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  const togglePopover = () => { setShowPopover(!showPopover); };
  const formatDate = (date) => { return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); };
  const formatNumber = (value) => { return new Intl.NumberFormat().format(value); };
  const formatCurrency = (value) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(value); };
  const calculateMetrics = (metric) => { return filteredData.reduce((total, item) => total + parseFloat(item[metric]), 0); };
  const calculatePercentage = (numerator, denominator) => { if (denominator === 0) { return 0; } return (numerator / denominator) * 100; };
  const CTR = calculatePercentage(calculateMetrics('Clicks'), calculateMetrics('Impression'));
  const CR = calculatePercentage(calculateMetrics('Conversions'), calculateMetrics('Clicks'));
  const ROAS = calculateMetrics('Expense') === 0 ? 0 : calculateMetrics('GMV') / calculateMetrics('Expense');

const [selectedMetrics, setSelectedMetrics] = useState(['Items Sold', 'CTR']);
const handleMetricSelection = (metricName) => {
  if (selectedMetrics.includes(metricName)) {
    setSelectedMetrics(selectedMetrics.filter((metric) => metric !== metricName));
  } else if (selectedMetrics.length < 2) {
    setSelectedMetrics([...selectedMetrics, metricName]);
  }
};

const formatTooltipValue = (payload, metricName) => {
  const metric = payload.find((p) => p.name === metricName);
  if (!metric) return "";
  if (metricName === "Date") {
    const date = new Date(metric.value);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  }
  if (metricName === "Expense" || metricName === "GMV") {
    return formatCurrency(metric.value);
  }
  if (metricName === "CTR" || metricName === "CR") {
    return `${(metric.value * 100).toFixed(2)}%`;
  }
  return formatNumber(metric.value);
};

const metricColor = {
  Impression: "#1a237e",
  Clicks: "#1b5e20",
  Conversions: "#b71c1c",
  "Items Sold": "#EA580C",
  GMV: "#006064",
  Expense: "#9333EA",
  CTR: "#0D9488",
  CR: "#8B5F33",
};

const { colorMode } = useColorMode();


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const [selectedValue, setSelectedValue] = useState('GMV');
const brandColor = useColorModeValue("brand.500", "white");
const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
const textColor = useColorModeValue("secondaryGray.900", "white");
const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
const iconColor = useColorModeValue("brand.500", "white");
const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
const bgHover = useColorModeValue({ bg: "secondaryGray.400" }, { bg: "whiteAlpha.50" });
const bgFocus = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.100" });
console.log("Current color mode:", colorMode);

  return (
    <div>
      {/* Date range filter */}
      <div className="date-range-filter" style={{ float: 'right', position: 'relative' }}>
        {/* Date picker toggle button */}
        <button
          type="button"
          className="btn btn-primary"
          ref={datepickerButtonRef}
          onClick={togglePopover}
          style={{ zIndex: 1000 }}
        >
          {formatDate(startDate)} - {formatDate(endDate)}
        </button>


        {/* Date picker popover */}
        {showPopover && (
          <div
            ref={popoverRef}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              zIndex: 1000,
              width: 'fit-content',
            }}
          >
            <div
              className="card"
              style={{
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div className="card-body">
                <DateRangePicker
                  ranges={[
                    {
                      startDate: startDate,
                      endDate: endDate,
                      key: 'selection',
                    },
                  ]}
                  onChange={handleDateRangeChange}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simple-grid section */}
     
      <Text
        fontSize="xl"
        fontWeight="bold"
        textAlign="left"
        mt="-10px"
        mb="-60px"
        ml={6}
      >
        Aggregate Performance
      </Text>

      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4, '2xl': 6 }} gap="20px" mt="10px" mb="10px">
        <ClickableMiniStatistics
          onClick={() => handleMetricSelection('Impression')}
          name="Impressions"
          value={formatNumber(calculateMetrics('Impression'))}
          bgColor='#ff0000'
          style={{ textAlign: 'center' }}
          isActive={selectedMetrics.includes('Impression')}
          metric="Impression"
        />
        <ClickableMiniStatistics
            onClick={() => handleMetricSelection('Clicks')}
            name="Clicks"
            value={calculateMetrics('Clicks')}
            style={{ textAlign: 'center' }}
            isActive={selectedMetrics.includes('Clicks')}
            metric="Clicks"
        />
          <ClickableMiniStatistics
          onClick={() => handleMetricSelection('Conversions')}          
          name="Conversions"
          value={formatNumber(calculateMetrics('Conversions'))}
          style={{ textAlign: 'center' }}
          isActive={selectedMetrics.includes('Conversions')}
          metric="Conversions"
          />
          <ClickableMiniStatistics
          onClick={() => handleMetricSelection('Items Sold')}          
          name="Items Sold"
          value={formatNumber(calculateMetrics('Items Sold'))}
          style={{ textAlign: 'center' }}
          isActive={selectedMetrics.includes('Items Sold')}
          metric="Items Sold"
          />
          <ClickableMiniStatistics
          onClick={() => handleMetricSelection('GMV')}          
          name="GMV"
          value={formatCurrency(calculateMetrics('GMV'))}
          style={{ textAlign: 'center' }}
          isActive={selectedMetrics.includes('GMV')}
          metric="GMV"
          />
          <ClickableMiniStatistics
          onClick={() => handleMetricSelection('Expense')}          
          name="Expense"
          value={formatCurrency(calculateMetrics('Expense'))}
          style={{ textAlign: 'center' }}
          isActive={selectedMetrics.includes('Expense')}
          metric="Expense"
          />
          <ClickableMiniStatistics
            onClick={() => handleMetricSelection('CTR')}            
            name="CTR(%)"
            value={`${CTR.toFixed(2)}%`}
            style={{ textAlign: 'center' }}
            isActive={selectedMetrics.includes('CTR')}
            metric="CTR"
          />
          
          <ClickableMiniStatistics
            onClick={() => handleMetricSelection('ROAS')}            
            name="ROAS"
            value={ROAS.toFixed(2)}
            style={{ textAlign: 'center' }}
            isActive={selectedMetrics.includes('ROAS')}
            metric="ROAS"
          />         

        </SimpleGrid>
      </Box>
     

      {/*...linechart*/}

      <Box
         width="100%"
         minW="75%"
         pt="40px"
         height="400px"
         backgroundColor={colorMode === 'dark' ? '#1A202C' : 'white'}
         borderRadius="xl"
      >  

     <ResponsiveContainer>
      <LineChart
          width={800} // Adjust the width as needed
          height={200} // Adjust the height as needed
          data={formatChartData(filteredData)}
          margin={{ top: 5, right: 50, left: 50, bottom: 5 }}
      >

         <CartesianGrid strokeDasharray="3 3" stroke={colorMode === 'dark' ? '#4A5568' : '#ccc'} />  
          <XAxis
          dataKey="Date"
          axisLine={true}
          tickLine={false}
          angle={-45} // Add angle to rotate the ticks
          textAnchor="end" // Change text anchor to 'end'
          interval={0} // Set interval to 0 to show all the dates
          style={{
            fontSize: "12px",
            fontWeight: "500",
            color: colorMode === 'dark' ? 'white' : '#333',
          }}
          
          
        tickFormatter={(tick) => {
          const date = new Date(tick);
          const day = date.getDate();
          const month = date.toLocaleString("default", { month: "short" });
          return `${day} ${month}`;
        }}
      />

     <YAxis
      yAxisId="left"
      orientation="left"
      tickFormatter={(tick) => tick.toLocaleString()}
      tickInterval={Math.max(...selectedMetrics.map((metric) => getSettings(metric, selectedMetrics).stepSize)) / 2}
      style={{
        fontSize: "16px",
        fontWeight: "500",
        color: colorMode === 'dark' ? 'white' : '#333',
      }}      
      >

       <Label
            value={selectedMetrics[0]} // This will display the name of the selected metric
            angle={-90} // Rotate the label by 90 degrees
            position="insideLeft" // Position the label inside the left Y-axis
            offset={-20} // Adjust the offset to place the label correctly
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: colorMode === 'dark' ? 'white' : '#333',
                textAnchor: "middle",
              }}

          /> 
      </YAxis>
    
    <YAxis
      yAxisId="right"
      orientation="right"
      tickFormatter={(tick) => tick.toLocaleString()}
      tickInterval={Math.max(...selectedMetrics.map((metric) => getSettings(metric, selectedMetrics).stepSize)) / 2}
      
      style={{
        fontSize: "16px",
        fontWeight: "500",
        color: colorMode === 'dark' ? 'white' : '#333',
      }}
      
    >
          <Label
        value={selectedMetrics[1]} // This will display the name of the selected metric
        angle={-90} // Rotate the label by 90 degrees
        position="insideRight" // Position the label inside the left Y-axis
        offset={-10} // Adjust the offset to place the label correctly
        style={{
          fontSize: "16px",
          fontWeight: "500",
          color: colorMode === 'dark' ? 'white' : '#333',
          textAnchor: "middle",
        }}
      /> 
      </YAxis>


    <Tooltip
    content={
      <CustomTooltip
        selectedMetrics={selectedMetrics}
        brandColor={brandColor}
        metricColor={metricColor}
        formatTooltipValue={formatTooltipValue} // Pass the existing formatTooltipValue function from the CustomTooltip component
      />
    }
  />
      <Legend />
      {renderLineComponents(selectedMetrics)}
    </LineChart>
    </ResponsiveContainer>
    <Tooltip />

   {/*Piechart*/}
   

   <Text
  fontSize="xl"
  fontWeight="bold"
  textAlign="left"
  mt="40px"
  mb="-45px"
  ml={5}
  color={colorMode === 'dark' ? 'white' : 'black'}
>
  Performance by Ad type
</Text>


<Box
  width="100%"
  minW="75%"
  pt="-60px"
  height="500px"
  backgroundColor={colorMode === 'dark' ? '#1A202C' : 'white'}
  borderRadius="xl"
>
  <VStack spacing={6}>
    <ResponsiveContainer width="100%" height={500}>
      <HStack spacing={5}>
        <Flex
          width="100%"
          alignItems="stretch"
          justifyContent="space-between"
        >
          <Box width="40%" minW="25%" height="60%">
            <Box
              height="100%"
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"
              overflow="hidden"
              backgroundColor={colorMode === 'dark' ? '#1A202C' : 'white'}

            >
              <AdPieChart filteredData={filteredData} />
            </Box>
          </Box>
          <Box width="60%" minW="25%" height="100%">
            <Box
              height="80%"
              borderWidth="1px"
              borderColor="gray.300"
              borderRadius="md"
              overflow="hidden"
            >
              <AdFilterTable filteredData={filteredData} />
            </Box>
          </Box>
        </Flex>
      </HStack>
    </ResponsiveContainer>
  </VStack>
</Box>

<Text
  fontSize="xl"
  fontWeight="bold"
  textAlign="left"
  mt="50px"
  mb="-55px"
  ml={5}
  color={colorMode === 'dark' ? 'white' : 'black'}
>
  Performance by SKU
</Text>

      <Box
        width="100%"
        minW="75%"
        pt="-40px"
        height="1000px"
        backgroundColor={colorMode === 'dark' ? '#1A202C' : 'white'}
        borderRadius="xl"
      >
            <VStack spacing={6}>
              <ResponsiveContainer width="100%" height={20}>
                <HStack spacing={5}>
                  <Box width="100%" minW="25%" pt="10px" height="80px">
                    <Box
                      borderWidth="0px"
                      borderColor="gray.300"
                      borderRadius="md"
                      overflow="hidden"
                    >
                      <ProductTable data={filteredData} />
                    </Box>
                  </Box>
                </HStack>
              </ResponsiveContainer>
            </VStack>
          </Box>
      </Box>
</div>  
    );
  };

export default ECommerceCampaignReport;

