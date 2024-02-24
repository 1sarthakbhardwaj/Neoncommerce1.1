import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, color } from "@chakra-ui/react";
import {
  Heading,
  VStack,
  HStack,
  Select,
  Collapse,
  IconButton,
  Text,
  Flex,
  Button,
  useColorMode 
} from '@chakra-ui/react';
import { Progress } from "@chakra-ui/react";

const DigitalShelfAnalysisTable = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const textColor = { light: "black", dark: "white" };
  const borderColor = { light: "gray.300", dark: "gray.600" };
  const tableColorScheme = { light: "gray", dark: "navy" };
  
  return (
    <Box mt={10} p={8} boxShadow="lg" borderRadius="md" bg={bgColor[colorMode]} color={textColor[colorMode]} borderColor={borderColor[colorMode]}>
    <Box bg={bgColor[colorMode]} borderRadius="md" boxShadow="base" p={2}>
    <Heading as="h2" size="md">
      Share of Voice
    </Heading>
  </Box>
  <Table variant="striped" colorScheme={tableColorScheme[colorMode]} fontSize="sm">  <Thead>
  <Tr>
    <Th fontSize="xs">Keyword</Th>
    <Th fontSize="xs">Keyword Type</Th>
    <Th fontSize="xs" isNumeric>Frequency Rank</Th>
    <Th fontSize="xs" isNumeric>Share of Sponsored Products</Th>
    <Th fontSize="xs" isNumeric>Share of Sponsored Brands</Th>
    <Th fontSize="xs" isNumeric>Organic Share of Top 3</Th>
    <Th fontSize="xs" isNumeric>Organic Share of Top 10</Th>
  </Tr>
</Thead>
    <Tbody>
      <Tr>
        <Td>cereal</Td>
        <Td>GENERIC</Td>
        <Td isNumeric>5</Td>
        <Td isNumeric>18.2%</Td>
        <Td isNumeric>28.07%</Td>
        <Td isNumeric>
          <Text as="span">19%</Text>
          <Progress value={19} size="sm" colorScheme="teal" />
        </Td>
        <Td isNumeric>
          <Text as="span">28%</Text>
          <Progress value={28} size="sm" colorScheme="teal" />
        </Td>
      </Tr>
      <Tr>
        <Td>bars</Td>
        <Td>GENERIC</Td>
        <Td isNumeric>10</Td>
        <Td isNumeric>94.52%</Td>
        <Td isNumeric>100%</Td>
        <Td isNumeric>
          <Text as="span">90%</Text>
          <Progress value={90} size="sm" colorScheme="teal" />
        </Td>
        <Td isNumeric>
          <Text as="span">79%</Text>
          <Progress value={79} size="sm" colorScheme="teal" />
        </Td>
      </Tr>
      <Tr>
        <Td>breakfast</Td>
        <Td>GENERIC</Td>
        <Td isNumeric>11</Td>
        <Td isNumeric>14.1%</Td>
        <Td isNumeric>21.05%</Td>
        <Td isNumeric>
          <Text as="span">17%</Text>
          <Progress value={17} size="sm" colorScheme="teal" />
        </Td>
        <Td isNumeric>
          <Text as="span">31%</Text>
          <Progress value={31} size="sm" colorScheme="teal" />
        </Td>
      </Tr>
      <Tr>
        <Td>granola bars</Td>
        <Td>GENERIC</Td>
        <Td isNumeric>29</Td>
        <Td isNumeric>9.11%</Td>
        <Td isNumeric>24.56%</Td>
        <Td isNumeric>
          <Text as="span">0%</Text>
          <Progress value={0} size="sm" colorScheme="teal" />
        </Td>
        <Td isNumeric>
          <Text as="span">11%</Text>
          <Progress value={11} size="sm" colorScheme="teal" />
        </Td>
                </Tr>
        <Tr>
          <Td>protein bars</Td>
          <Td>GENERIC</Td>
          <Td isNumeric>35</Td>
          <Td isNumeric>16.67%</Td>
          <Td isNumeric>21.93%</Td>
          <Td isNumeric>
            <Text as="span">19%</Text>
            <Progress value={19} size="sm" colorScheme="teal" />
          </Td>
          <Td isNumeric>
            <Text as="span">28%</Text>
            <Progress value={28} size="sm" colorScheme="teal" />
          </Td>
        </Tr>
        <Tr>
          <Td>granola</Td>
          <Td>GENERIC</Td>
          <Td isNumeric>64</Td>
          <Td isNumeric>37.24%</Td>
          <Td isNumeric>68.42%</Td>
          <Td isNumeric>
            <Text as="span">19%</Text>
            <Progress value={19} size="sm" colorScheme="teal" />
          </Td>
          <Td isNumeric>
            <Text as="span">22%</Text>
            <Progress value={22} size="sm" colorScheme="teal" />
          </Td>
        </Tr>
        <Tr>
          <Td>cookies prime pantry</Td>
          <Td>GENERIC</Td>
          <Td isNumeric>196</Td>
          <Td isNumeric>60.72%</Td>
          <Td isNumeric>100%</Td>
          <Td isNumeric>
            <Text as="span">67%</Text>
            <Progress value={67} size="sm" colorScheme="teal" />
          </Td>
          <Td isNumeric>
            <Text as="span">48%</Text>
            <Progress value={48} size="sm" colorScheme="teal" />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  </Box>
);

     

};

export default DigitalShelfAnalysisTable;
