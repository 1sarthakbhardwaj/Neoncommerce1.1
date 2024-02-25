import React, { useState } from 'react';import {
  Box,
  Text,
  Flex,
  Button,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Icon,
  useColorModeValue,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { AddIcon, CheckCircleIcon, WarningIcon, NotAllowedIcon, CalendarIcon } from '@chakra-ui/icons';import { MdPauseCircleFilled } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router-dom';


const Campaign_Management = () => {
    const history = useHistory();
    const [startDate, setStartDate] = useState(null);
    const tableBackground = useColorModeValue('gray.100', 'gray.700');
    const headerBg = useColorModeValue('gray.200', 'gray.600');
    const colorMode = useColorModeValue('light', 'dark');

    const handleCreateCampaignClick = () => {
        history.push("/admin/create_new_campaign");
      };
      
    const getStatusElement = (status) => {
        let icon, color;
        if (status === 'Ongoing') {
          icon = CheckCircleIcon;
          color = 'green';
        } else if (status === 'Paused') {
          icon = WarningIcon;
          color = 'gray';
        } else if (status === 'Ended') {
          icon = NotAllowedIcon;
          color = 'red';
        }
        return (
          <Flex align="center">
            <Icon as={icon} color={`${color}.500`} mr={2} />
            <Text>{status}</Text>
          </Flex>
        );
      };

  // Dummy data for table rows
  // Dummy data for table rows
const dummyRows = new Array(10).fill(null).map((_, index) => {
    let status;
    if (index % 3 === 0) {
      status = 'Ongoing';
    } else if (index % 3 === 1) {
      status = 'Paused';
    } else {
      status = 'Ended';
    }
  
    return {
      country: 'Indonesia',
      marketplace: `Shopee`,
      storefront: 'Neon Storefront',
      adTool: 'Product Search Ads',
      campaign: `Campaign ${index + 1}`,
      campaignTag: 'N/A',
      campaignStatus: status,
      dailyBudget: '1,000,000 IDR',
      clicks: Math.floor(Math.random() * 200),
      cost: `${Math.floor(Math.random() * 1000)} IDR`,
      adCMV: `${Math.floor(Math.random() * 10000)} IDR`,
      roas: `${(Math.random() * 10).toFixed(2)}`,
      cpc: `${Math.floor(Math.random() * 100)} IDR`
    };
  });
  

  // Function to determine and return the status icon
//   const renderStatusIcon = (status) => {
//     if (status === 'Ongoing') {
//       return <CheckCircleIcon color='green.500' />;
//     } else if (status === 'Paused') {
//       return <Icon as={MdPauseCircleFilled} color='gray.400' />;
//     }
//     // Add more conditions as needed
//   };

  return (
    <Box p={5}>
      

      <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <Text fontSize="md" mb={2}>
        Campaign Management
      </Text>
      </Flex>         

      <Flex justifyContent="space-between" alignItems="center" mb={4}>
    <Text fontSize="2xl" fontWeight="bold" mb={4}>
      Campaign overview setting
    </Text>

    <Flex alignItems="center">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        customInput={
          <IconButton
            aria-label="Date Picker"
            icon={<CalendarIcon />}
          />
        }
        dateFormat="MMMM d, yyyy"
      />
      <Text ml={2}>{startDate ? startDate.toLocaleDateString() : 'Select Date'}</Text>
    </Flex>

  </Flex>
      
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Badge colorScheme="blue" p={2}>
          P&G Indo Olay Store Shopee - Updated 2 minutes ago
        </Badge>
        <Flex>
          <Button mr={2}>Filter</Button>
          <Button mr={2}>Sort</Button>
          <Button
              colorScheme="blue"
              leftIcon={<AddIcon />}
              onClick={handleCreateCampaignClick}
            >
              Create Campaign
          </Button>

        </Flex>
      </Flex>

      <Box overflowX="auto">
      <Table variant="striped" colorScheme="gray" size="sm" bg={tableBackground} overflowX="auto">
            <Thead bg={headerBg}>
            <Tr>
              <Th>Country</Th>
              <Th>Marketplace</Th>
              <Th>Storefront</Th>
              <Th>Ad Tool</Th>
              <Th>Campaign</Th>
              <Th>Campaign Tag</Th>
              <Th>Campaign Status</Th>
              <Th>Campaign Daily Budget</Th>
              <Th>Clicks</Th>
              <Th>Cost</Th>
              <Th>Ad CMV</Th>
              <Th>ROAS</Th>
              <Th>CPC</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dummyRows.map((row, index) => (
              <Tr key={index}>
                <Td>{row.country}</Td>
                <Td>{row.marketplace}</Td>
                <Td>{row.storefront}</Td>
                <Td>{row.adTool}</Td>
                <Td>{row.campaign}</Td>
                <Td>
                  <Center>
                    <Icon as={AddIcon} color="gray.500" />
                  </Center>
                </Td>
                <Td>{getStatusElement(row.campaignStatus)}</Td>
                <Td>{row.dailyBudget}</Td>
                <Td>{row.clicks}</Td>
                <Td>{row.cost}</Td>
                <Td>{row.adCMV}</Td>
                <Td>{row.roas}</Td>
                <Td>{row.cpc}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Campaign_Management;
