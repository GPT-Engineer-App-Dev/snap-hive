import { Box, Container, Flex, Grid, GridItem, IconButton, Image, VStack, Text, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FaHome, FaUser, FaUpload } from "react-icons/fa";

const [photos, setPhotos] = useState([
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
]);

const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (event) => {
  setSelectedFile(event.target.files[0]);
};

const handleUpload = () => {
  if (selectedFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos([...photos, reader.result]);
    };
    reader.readAsDataURL(selectedFile);
  }
};

const Index = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="gray.800" color="white" p={4} justifyContent="space-around">
        <IconButton aria-label="Home" icon={<FaHome />} size="lg" variant="ghost" />
        <IconButton aria-label="Profile" icon={<FaUser />} size="lg" variant="ghost" />
        <IconButton aria-label="Upload" icon={<FaUpload />} size="lg" variant="ghost" />
      </Flex>
      <Flex p={4} justifyContent="center" alignItems="center">
        <Input type="file" onChange={handleFileChange} />
        <Button onClick={handleUpload} ml={2}>Upload</Button>
      </Flex>
      
      <Box p={4}>
        <Grid templateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={6}>
          {photos.map((src, index) => (
            <GridItem key={index}>
              <Image src={src} alt={`Photo ${index + 1}`} borderRadius="md" />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Index;