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

const [likes, setLikes] = useState(Array(photos.length).fill(0));
const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (event) => {
  setSelectedFile(event.target.files[0]);
};

const handleUpload = () => {
  if (selectedFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotos([...photos, reader.result]);
      setLikes([...likes, 0]);
    };
    reader.readAsDataURL(selectedFile);
  }
};

const handleLike = (index) => {
  const newLikes = [...likes];
  newLikes[index] += 1;
  setLikes(newLikes);
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
              <Button onClick={() => handleLike(index)} mt={2}>Like</Button>
              <Text mt={1}>{likes[index]} {likes[index] === 1 ? 'like' : 'likes'}</Text>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Index;