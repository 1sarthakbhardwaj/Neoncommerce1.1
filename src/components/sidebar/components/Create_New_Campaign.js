import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Heading,
  Flex,
  Text,
  useToast,
  Table, 
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  List,
  ListItem
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon, AddIcon, SearchIcon, ArrowUpDownIcon } from '@chakra-ui/icons';

const CreateNewCampaign = () => { 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [campaignName, setCampaignName] = useState('');
  const [marketplace, setMarketplace] = useState('');
  const [country, setCountry] = useState('');
  const [storefront, setStorefront] = useState('');
  const [schedule, setSchedule] = useState({ start: new Date(), end: new Date() });
  const [totalBudget, setTotalBudget] = useState('');
  const [dailyBudget, setDailyBudget] = useState('');
  const [objective, setObjective] = useState('');
  const [adObjectMethod, setAdObjectMethod] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const toast = useToast();
const { isOpen, onOpen, onClose } = useDisclosure();
const adToolOptions = ["Discovery ads", "Product Search ads", "Shop Search ads"];


  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic
    toast({
      title: "Campaign created.",
      description: "Your new campaign has been created successfully.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleDateChange = (date) => {
    console.log(date); // Check if 'date' is valid
    if (date instanceof Date && !isNaN(date)) {
      setStartDate(date);
    } else {
      console.error('Invalid date:', date);
    }
  };

  return (

    <>
    <Box p={5} maxW="45%">
      <Flex justifyContent="flex-start" mb={6}>
        <Heading size="sm">Campaign Management / {campaignName }</Heading>
      </Flex>

        <FormControl id="campaignName">
          <Input
            variant="unstyled"
            placeholder="Untitled"
            size="md"
            fontSize="2xl"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
          />

        </FormControl>

        <Heading size="md" mb={4} fontWeight="bold" mt = {10}>Campaign Setting</Heading>

        <VStack spacing={4} as="form" onSubmit={handleSubmit} mb = {14} mt = {5}>
       
        <FormControl id="marketplace">
          <FormLabel fontWeight="bold">Marketplace</FormLabel>
          <Select
            placeholder="Select marketplace"
            value={marketplace}
            onChange={(e) => setMarketplace(e.target.value)}
          >
            {/* Replace with actual options */}
            <option value="Shopee">Shopee</option>
            <option value="Lazada">Lazada</option>
            <option value="Amazon">Amazon</option>
            <option value="Tika">Tika</option>
            <option value="Flipkart">Flipkart</option>
          </Select>
        </FormControl>


        <FormControl id="country">
          <FormLabel fontWeight="bold">Country</FormLabel>
          <Select
            placeholder="Select country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {/* Replace with actual options */}
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="America">America</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Japan">Japan</option>
            <option value="China">China</option>
            <option value="Vietnam">Vietnam</option>
          </Select>
        </FormControl>
        <FormControl id="storefront">
          <FormLabel fontWeight="bold">Storefront</FormLabel>
          <Select
            // value={strefront}
            placeholder="Select Storefront"
            onChange={(e) => setStorefront(e.target.value)}
          >
            <option value="NeonCommerce Official Shop"> {marketplace}/{country}/NeonCommerce Official Shop</option>
            <option value="NeonCommerce Official Shop">{marketplace}/{country}/NeonCommerce Official Shop</option>
          </Select>
        </FormControl>

        <FormControl id="schedule">
          <FormLabel fontWeight="bold">Schedule</FormLabel>
          <Flex direction="column">
            <Flex>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
              <Box px={2}>to</Box>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </Flex>
          </Flex>
        </FormControl>


        <FormControl id="totalBudget">
          <FormLabel fontWeight="bold">Total Budget</FormLabel>
          <Input
            placeholder="Enter total budget in IDR"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
          />
        </FormControl>
        <FormControl id="dailyBudget">
          <FormLabel fontWeight="bold">Daily Budget</FormLabel>
          <Input
            placeholder="Enter daily budget in IDR"
            value={dailyBudget}
            onChange={(e) => setDailyBudget(e.target.value)}
          />
        </FormControl>
        <FormControl id="objective">
          <FormLabel fontWeight="bold">Objective</FormLabel>
          <Select placeholder="Select objective">
            {/* Add options */}
          </Select>
        </FormControl>
        <FormControl id="adObjectMethod">
          <FormLabel fontWeight="bold">Ad Object Method</FormLabel>
          <Select
            placeholder="Select method"
            value={adObjectMethod}
            onChange={(e) => setAdObjectMethod(e.target.value)}
          >
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </Select>
        </FormControl>
        <FormControl id="timeZone">
          <FormLabel fontWeight="bold">Time Zone</FormLabel>
          <Select placeholder="Storefront timezone">
          </Select>
        </FormControl>
      </VStack>
{/* this is the tabeleeeeee */}
</Box>

<Box p={5} maxW="100%">
  <Flex justifyContent="space-between" mb={4}>
    <Heading size="md">Campaign Detail</Heading>
    <Box>
      <Button leftIcon={<CalendarIcon />} mb={2}>
        {`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
      </Button>
      <HStack spacing={2} mt={2}>
        <Button leftIcon={<SearchIcon />} size ="xs" ml = {39} >Filter</Button>
        <Button leftIcon={<ArrowUpDownIcon />} size ="xs" >Sort</Button>
      </HStack>
    </Box>
  </Flex>



  <Table variant="simple" size="sm">
    <Thead>
      <Tr>
        <Th>Marketplace</Th>
        <Th>Country</Th>
        <Th>Storefront</Th>
        <Th>Ad Tool</Th>
        <Th>Keyword Position</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>Shopee</Td>
        <Td>Indonesia</Td>
        <Td>Shopee / Indoneisa/Brandname</Td>
        <Td>
          <Popover>
            <PopoverTrigger>
              <IconButton
                aria-label="Add ad tool"
                icon={<AddIcon />}
                size="sm"
                onClick={onOpen} // This will open the popover
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton onClick={onClose} />
              <PopoverHeader>Select an Ad Tool</PopoverHeader>
              <PopoverBody>
                {adToolOptions.map((adTool, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      console.log(adTool); // Handle the selection
                      onClose(); // Close the popover
                    }}
                    isFullWidth // To make the button extend to the width of the popover
                  >
                    {adTool}
                  </Button>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Td>
        
        <Td>0</Td>
      </Tr>
      {/* Add more rows as needed */}
    </Tbody>
  </Table>
  <Button colorScheme="blue" type="submit">Create Campaign</Button>
   </Box>
    </>
  );
};

export default CreateNewCampaign;
