import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Box, Select, VStack, Text, useColorMode } from '@chakra-ui/react';

const formatNumber = (value) => {
  return new Intl.NumberFormat().format(value);
};

const AdPieChart = ({ filteredData }) => {
  const { colorMode } = useColorMode();

  const COLORS = colorMode === 'dark' 
    ? ['#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B'] 
    : ['#052D41', '#E99B26', '#00C6B1', '#00C6B1'];

  const adTypes = ['Discovery Ads', 'Product Search Ad', 'Shop Search Ad'];
  const metrics = ['Impression', 'Clicks', 'Conversions', 'GMV', 'Expense'];
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };


  const [selectedMetric, setSelectedMetric] = React.useState(metrics[0]);

  const calculateAggregate = (adType, metric) => {
    return filteredData
      .filter((data) => data['Ads Type'] === adType)
      .reduce((total, item) => total + parseFloat(item[metric]), 0);
  };

  const chartData = adTypes.map((adType) => ({
    name: adType,
    value: calculateAggregate(adType, selectedMetric),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      let formattedValue;
      
      if (selectedMetric === 'GMV' || selectedMetric === 'Expense') {
        formattedValue = formatCurrency(value);
      } else {
        formattedValue = formatNumber(value);
      }
      
      return (
        <Box 
          p={2} 
          bg={colorMode === 'dark' ? '#1A202C' : 'white'} 
          borderRadius="md" 
          boxShadow="lg"
          color={colorMode === 'dark' ? 'white' : 'black'}
        >
          <Text fontWeight="bold" fontSize="sm">{`${name}`}</Text>
          <Text fontSize="sm">{`${selectedMetric}: ${formattedValue}`}</Text>
        </Box>
      );
    }
  
    return null;
  };
  
  

  return (
    <VStack mt={2} spacing={5} alignItems="center">
      <Select
        width="50%"
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
        bg={colorMode === 'dark' ? '#1A202C' : 'white'}
        color={colorMode === 'dark' ? 'white' : 'black'}
        borderRadius="md"
        focusBorderColor="blue.500"
      >
        {metrics.map((metric) => (
          <option key={metric} value={metric}>
            {metric}
          </option>
        ))}
      </Select>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#8884d8"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
        formatter={(value) => (
          <span style={{ fontSize: "13px" }}>{value}</span>
        )}
      />
        </PieChart>
      </ResponsiveContainer>
    </VStack>
  );
};

export default AdPieChart;
