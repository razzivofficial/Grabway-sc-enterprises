import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Homepage.css";
import Geocode from "react-geocode";
import { Navigator } from "react-router-dom";
import { FcDownload } from "react-icons/fc";
import HomeInfo from "../../components/HomeInfo/HomeInfo";

import {
  Input,
  InputGroup,
  InputLeftElement,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  border,
  Button,
  Toast,
  Image,
  Container,
  Stack,
  Link,
  HStack,
  Skeleton,
  useColorModeValue,
  Box,
  chakra,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { GoChevronRight } from "react-icons/go";
import { MdBolt } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { FiRefreshCcw } from "react-icons/fi";
import { FaCircleDot } from "react-icons/fa6";
import TopSlider from "./TopScroller/TopSlider";
import { PiMountainsDuotone } from "react-icons/pi";
import { BiLeaf } from "react-icons/bi";
import { GiGlassBall } from "react-icons/gi";
import { AiFillHeart, AiOutlineThunderbolt } from "react-icons/ai";
import { FaRoad } from "react-icons/fa6";
import { useJsApiLoader } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import Cookies from "js-cookie";
const TopSection = ({ nonceVal, loginState }) => {
  const textArray = [
    "Effortless Scheduling",
    "Smart Routing",
    "Safety-First Focus",
  ];

  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const currentTextArray = textArray[currentIndex];
      setCurrentText((prevText) => {
        if (prevText === currentTextArray) {
          setTimeout(() => {
            setCurrentText("");
            setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
          }, 1500); // Adjust the delay between phrases
        }
        return currentTextArray.substring(0, prevText.length + 1);
      });
    }, 100); // Adjust the typing speed

    return () => clearInterval(typingInterval);
  }, [currentText, currentIndex]);

  const [currLocation, setCurrlocation] = useState({});
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrlocation(position.coords);
          //console.log(position.coords);
        },
        (error) => {
          //console.log(error);
        }
      );
    } else {
      //console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  const navigate = useNavigate();
  const sourceDesk = useRef();
  const destinationDesk = useRef();
  const sourceMob = useRef();
  const destinationMob = useRef();
  const toast = useToast();

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
    libraries: ["maps", "places"],
    mapIds: ["7e437361629e930a"],
    nonce: nonceVal,
  });
  const pacItemQuery = {
    padding: "20px",
  };

  const [srcCord, setsrcCord] = useState({});
  const [destCord, setDestCord] = useState({});

  //geocode convert function
  async function getgeoCode(place, type) {
    await Geocode.fromAddress(
      place,
      "AIzaSyDJaFr-HFXGBOg8pUSdQfGjGwGdIwtbXhY",
      "en"
    ).then(
      (response) => {
        const coordData = response.results[0].geometry.location;
        //console.log(coordData);
        if (type == "Source") setsrcCord(coordData);
        else setDestCord(coordData);
        return true;
      },
      (error) => {
        console.error(error);
        toast({
          title: `Please select valid ${type} location from list`,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      }
    );
  }

  useEffect(() => {
    if (
      Object.keys(srcCord).length !== 0 &&
      Object.keys(destCord).length !== 0
    ) {
      navigate("/maps", {
        state: {
          source:
            windowSize[0] <= 600
              ? sourceMob.current.value
              : sourceDesk.current.value,
          destination:
            windowSize[0] <= 600
              ? destinationMob.current.value
              : destinationDesk.current.value,
          sourceCord: srcCord,
          destinationCord: destCord,
        },
      });
    }
  }, [srcCord, destCord]);

  const handleSearchDesk = async () => {
    /*
     if (
      sourceDesk.current.value.length === 0 &&
      destinationDesk.current.value.length === 0
    ) {
      toast({
        title: "Source and Destination cannot be empty",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } else if (sourceDesk.current.value.length === 0) {
      toast({
        title: "Source cannot be empty",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } else if (destinationDesk.current.value.length === 0) {
      toast({
        title: "Destination cannot be empty",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } else {
      getgeoCode(sourceDesk.current.value, "Source");
      getgeoCode(destinationDesk.current.value, "Destination");
    }
   */
    toast({
      title: "Kindly Login",
      description: "Please Login before to proceed",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSearchMob = () => {
    toast({
      title: "Kindly Login",
      description: "Please Login before to proceed",
      status: "warning",
      duration: 2000,
      isClosable: true,
    });

    /*
    if (
      sourceMob.current.value.length === 0 &&
      destinationMob.current.value.length === 0
    ) {
      toast({
        title: "Source and Destination cannot be empty",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } else if (sourceMob.current.value.length === 0) {
      toast({
        title: "Source cannot be empty",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } else if (destinationMob.current.value.length === 0) {
      toast({
        title: "Destination cannot be empty",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    } else {
      getgeoCode(sourceMob.current.value, "Source");
      getgeoCode(destinationMob.current.value, "Destination");
    }
    */
  };
  const [userData, setUserData] = useState(localStorage.getItem("grabwayUser"));
  useEffect(() => {
    setUserData(localStorage.getItem("grabwayUser"));
  }, [localStorage.getItem("grabwayUser")]);
  if (userData) {
    if (JSON.parse(userData).name === "") {
      return <Navigate to={"/registration"} userType="" />;
    }
    if (JSON.parse(userData).name !== "") {
      if (JSON.parse(userData).userType === "user") {
        return <Navigate to={"/userHomepage"} />;
      }
      if (JSON.parse(userData).userType === "driver") {
        return <Navigate to={"/driverHomepage"} />;
      }
    }
  }
  const googleUserData = Cookies.get("grabwayGoogleToken");
  if (googleUserData) {
    return <Navigate to={"/googleRegistration"} />;
  }
  if (!isLoaded) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Button
          size={"lg"}
          isLoading
          colorScheme="red"
          color={"red"}
          bgColor={"white"}
        ></Button>
      </div>
    );
  }

  return (
    <>
      <div className="relative dekstop-view">
        {/*<div className="flex justify-center items-center w-auto h-auto ml-14">
          <div className="flex justify-center items-center h-[80vh] w-[100%] z-10">
            <img
              className="h-[75vh] w-[80%] opacity-70"
              src="/assets/images/loginImage.jpg"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center items-center absolute z-20 mt-5 ml-[-6vw]">
            <div className="input-main-div flex justify-center items-center ">
              <div>
                <Card
                  variant="filled"
                  sx={{ boxShadow: "0px 0px 0px 10px white" }}
                >
                  <CardHeader>
                    <Heading size="lg">
                      <div className="font-ubuntu">FROM</div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex flex-row">
                        <div className="source flex justify-center items-center">
                          <InputGroup>
                            <InputLeftElement
                              sx={{
                                marginTop: "13px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              pointerEvents="none"
                            >
                              <FaCircleDot fill="green" />
                            </InputLeftElement>
                            <Autocomplete className=" font-ubuntu text-center">
                              <Input
                                className="card"
                                variant="filled"
                                sx={{
                                  border: "2px solid grey",
                                  padding: "30px",
                                  paddingLeft: "40px",
                                }}
                                type="text"
                                w={400}
                                placeholder="From where ?"
                                ref={sourceDesk}
                              />
                            </Autocomplete>
                          </InputGroup>
                        </div>
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card variant={"filled"} sx={{ borderRadius: "0px" }}>
                  <CardBody>
                    <Text
                      sx={{ border: "2px solid black", width: "10vw" }}
                    ></Text>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card
                  variant="filled"
                  sx={{ boxShadow: "0px 0px 0px 10px white" }}
                >
                  <CardHeader>
                    <Heading size="lg">
                      <div className="font-ubuntu">DESTINATION</div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex flex-row">
                        <div className="flex justify-center items-center">
                          <InputGroup variant={"filled"}>
                            <InputLeftElement
                              sx={{
                                marginTop: "13px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              pointerEvents="none"
                            >
                              <FaCircleDot fill="red" />
                            </InputLeftElement>
                            <Autocomplete className="font-ubuntu text-center">
                              <Input
                                variant="filled"
                                sx={{
                                  border: "2px solid grey",
                                  padding: "30px",
                                  paddingLeft: "40px",
                                }}
                                w={400}
                                type="text"
                                placeholder="Where to ?"
                                ref={destinationDesk}
                              />
                            </Autocomplete>
                          </InputGroup>
                        </div>
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div>
              <Button
                colorScheme="red"
                sx={{
                  padding: "40px",
                  backgroundColor: "#E51B23",
                  color: "white",
                  marginTop: "10%",
                  borderRadius: "9px",
                  boxShadow: "10px 10px #824244",
                }}
                onClick={handleSearchDesk}
              >
                <div className="font-ubuntu text-2xl">Search GrabWay</div>
              </Button>
            </div>
          </div>
        </div>*/}
        <div>
          <Container maxW="90%" px={{ base: 6, md: 3 }} py={20}>
            <Stack
              direction={{ base: "column", md: "row" }}
              justifyContent="center"
            >
              <Stack
                direction="column"
                spacing={6}
                justifyContent="center"
                // maxW="480px"
              >
                <HStack
                  as={Link}
                  p={1}
                  rounded="full"
                  fontSize="sm"
                  w="max-content"
                  // bg={useColorModeValue("gray.300", "gray.700")}
                >
                  <Box
                    py={1}
                    px={2}
                    lineHeight={1}
                    rounded="full"
                    color="white"
                    bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                  >
                    What's new
                  </Box>
                  <HStack
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text lineHeight={1}>See our recent updates</Text>
                    <Icon as={GoChevronRight} w={4} h={4} />
                  </HStack>
                </HStack>
                {/* <chakra.h1
                  fontSize="5xl"
                  lineHeight={1}
                  fontWeight="bold"
                  textAlign="left"
                >
                  Grabway Promises <br />
                  <chakra.span color="teal">Effortless Scheduling</chakra.span>
                  <chakra.span color="teal">
                    Smart Routing for Efficient Rides
                  </chakra.span>
                  <chakra.span color="teal">Safety-First Approach</chakra.span>
                </chakra.h1> */}
                <chakra.h1
                  fontSize="5xl"
                  lineHeight={1}
                  fontWeight="bold"
                  textAlign="left"
                >
                  Grabway Promises <br />
                  {currentText.split("\n").map((item, index) => (
                    <chakra.span key={index} color="teal">
                      {item}
                      <br />
                    </chakra.span>
                  ))}
                </chakra.h1>
                <Text
                  fontSize="1.2rem"
                  textAlign="left"
                  lineHeight="1.375"
                  fontWeight="400"
                  color="gray.500"
                >
                  Elevating Campus Travel - Your go-to platform for hassle-free
                  rides, connecting students seamlessly while prioritizing
                  convenience and safety. Grab your ride, grab your way!
                </Text>
                <HStack
                  spacing={{ base: 0, sm: 2 }}
                  mb={{ base: "3rem !important", sm: 0 }}
                  flexWrap="wrap"
                >
                  <chakra.button
                    w={{ base: "100%", sm: "auto" }}
                    h={12}
                    px={6}
                    color="white"
                    size="lg"
                    rounded="md"
                    mb={{ base: 2, sm: 0 }}
                    zIndex={5}
                    lineHeight={1}
                    bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                    _hover={{
                      bgGradient: "linear(to-l, #0ea5e9,#2563eb)",
                      opacity: 0.9,
                    }}
                  >
                    <a
                      href="https://grabway.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Explore Grabway Commercial
                    </a>
                    <Icon as={MdBolt} h={4} w={4} ml={1} />
                  </chakra.button>
                  <Box
                    d="flex"
                    justifyContent="center"
                    alignItems="center" // Center both horizontally and vertically
                    w={{ base: "100%", sm: "auto" }}
                    border="1px solid"
                    borderColor="gray.300"
                    p={3}
                    lineHeight={1.18}
                    rounded="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() =>
                      window.open("/", "_blank", "noopener noreferrer")
                    }
                    zIndex={55555555}
                  >
                    Dwonload App <Icon as={FcDownload} h={4} w={4} ml={1} />
                  </Box>
                </HStack>
              </Stack>
              <Box ml={{ base: 0, md: 5 }} pos="relative">
                <DottedBox />
                <Image
                  w="100%"
                  h="100%"
                  minW={{ base: "auto", md: "30rem" }}
                  objectFit="cover"
                  src={`https://media4.giphy.com/media/HwukO9Ia7E3YQMEIHu/giphy.gif?cid=ecf05e47urbk1rnwu2bm0hzuxpi57suuk6sv91cxrk4443ko&ep=v1_gifs_related&rid=giphy.gif&ct=s`}
                  rounded="md"
                  fallback={<Skeleton />}
                />
              </Box>
            </Stack>
          </Container>
        </div>
        {loginState === false && (
          <>
            <Container maxW={"5xl"} py={2} px={{ base: 5, md: 10 }}>
              <Box
                maxW="90%"
                marginX="auto"
                py={{ base: "2rem", md: "1rem" }}
                px={{ base: "1rem", md: "0" }}
              >
                <Heading
                  as="h3"
                  fontSize="1.5rem"
                  fontWeight="bold"
                  textAlign="left"
                  mb={{ base: "4", md: "2" }}
                  pb={4}
                  borderBottom="1px solid"
                  borderColor="gray.300"
                >
                  Traveling with Grabway
                </Heading>
                <Flex
                  as="section"
                  alignItems="start"
                  justifyContent="between"
                  flexDirection={{ base: "column", md: "row" }}
                  my={{ base: "1.5rem", md: "2.5rem" }}
                  borderBottom="1px solid"
                  borderColor="gray.300"
                  pb={8}
                >
                  {featuresList.map((feature) => (
                    <Box
                      key={feature.id}
                      w={{ base: "100%", md: 1 / 3 }}
                      px={{ md: "0.5rem" }}
                      mb={{ base: "6", md: "0" }}
                    >
                      {feature.icon}
                      <Text textAlign="left" fontWeight="700" mt={3} mb={1}>
                        {feature.title}
                      </Text>
                      <Text
                        fontSize="1rem"
                        fontWeight="600"
                        textAlign="left"
                        mt={3}
                        mb={1}
                      >
                        {feature.desc}
                      </Text>
                    </Box>
                  ))}
                </Flex>
              </Box>
            </Container>
            {/*<div className="scroller">
               <TopSlider /> 
            </div>*/}
            <div className="info-section mt-[5%] flex flex-col justify-center items-center gap-10">
              <div className="flex flex-row justify-center items-center">
                <div>
                  <img
                    className="w-[30vw] h-[60vh]"
                    src="/assets/images/mission.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <Card
                    className="w-[50vw]"
                    sx={{ border: "none", boxShadow: "none" }}
                  >
                    <CardHeader>
                      <Heading>
                        <div className="flex justify-center items-center font-ubuntu">
                          <div className="mr-[1%]">
                            <PiMountainsDuotone fill="#E51B23" />
                          </div>
                          Our Mission
                        </div>
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        <div className="flex text-center justify-center items-center text-xl opacity-80">
                          We aim at reducing your travel time, socializing your
                          world of travel
                          <br />
                          and providing comfort at your doorstep.
                        </div>
                        <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#1b4ee5] text-center">
                          <AiOutlineThunderbolt className="mr-[1%]" />
                          JUST GRABWAY AND CHILL
                          <AiOutlineThunderbolt className="ml-[1%]" />
                        </div>
                      </Text>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center">
              <div>
                <Card
                  className="w-[50vw]"
                  sx={{ border: "none", boxShadow: "none" }}
                >
                  <CardHeader>
                    <Heading>
                      <div className="flex justify-center items-center font-ubuntu">
                        <div className="mr-[1%]">
                          <BiLeaf fill="#E51B23" />
                        </div>
                        Our Vission
                      </div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex text-center justify-center items-center text-xl opacity-80">
                        Grabway is commited to reducing Carbon prints from our
                        planet by providing a public yet personal mode of
                        transport.
                      </div>
                      <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#4ee51b] text-center">
                        <AiFillHeart className="mr-[1%]" />
                        LET US CONTRIBUTE TO A GREENER EARTH
                        <AiFillHeart className="ml-[1%]" />
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
              <div>
                <img
                  className="w-[30vw] h-[60vh]"
                  src="/assets/images/vission.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="flex flex-row justify-center items-center">
              <div>
                <img
                  className="w-[37vw] h-[60vh]"
                  src="/assets/images/goal.jpg"
                  alt=""
                />
              </div>
              <div>
                <Card
                  className="w-[50vw] mt-[4%]"
                  sx={{ border: "none", boxShadow: "none" }}
                >
                  <CardHeader>
                    <Heading>
                      <div className="flex justify-center items-center font-ubuntu">
                        <div className="mr-[1%]">
                          <GiGlassBall fill="#E51B23" />
                        </div>
                        Our Goal
                      </div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex text-center justify-center items-center text-xl opacity-80">
                        We plan to become India's most trusted platform for
                        shuttle service,providing completely a new dimension to
                        your daily Life
                      </div>
                      <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#1b4ee5] text-center">
                        <FaRoad className="mr-[1%]" />
                        REDEFINING INDIA'S TRANSPORT ASPIRATIONS
                        <FaRoad className="ml-[1%]" />
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
            </div>
          </>
        
        )}
      </div>

      <div className="mobile-view">
        {/* <div>
          <img
            className="h-[20vh]"
            src="/assets/images/loginImage.jpg"
            alt=""
          />
        </div> */}
        {/* <div className="flex justify-center items-center">
          <Card variant="filled" sx={{ boxShadow: "0px 0px 0px 10px white" }}>
            <CardHeader>
              <Heading size="lg">
                <div className="font-ubuntu">FROM</div>
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>
                <div className="flex flex-row">
                  <div className="flex justify-center items-center">
                    <InputGroup>
                      <InputLeftElement
                        sx={{
                          marginTop: "3px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        pointerEvents="none"
                      >
                        <FaCircleDot fill="green" />
                      </InputLeftElement>
                      <Autocomplete className="font-ubuntu text-center">
                        <Input
                          className="card"
                          variant="filled"
                          sx={{
                            border: "2px solid grey",
                            padding: "15px",
                            paddingLeft: "40px",
                          }}
                          type="text"
                          placeholder="Where to ?"
                          ref={sourceMob}
                        />
                      </Autocomplete>
                    </InputGroup>
                  </div>
                </div>
              </Text>
            </CardBody>
          </Card>
        </div> */}
        {/* <div className="flex justify-center items-center">
          <Card variant="filled" sx={{ boxShadow: "0px 0px 0px 10px white" }}>
            <CardHeader>
              <Heading size="lg">
                <div className="font-ubuntu">DESTINATION</div>
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>
                <div className="flex flex-row">
                  <div className="flex justify-center items-center">
                    <InputGroup>
                      <InputLeftElement
                        sx={{
                          marginTop: "3px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        pointerEvents="none"
                      >
                        <FaCircleDot fill="red" />
                      </InputLeftElement>
                      <Autocomplete className="font-ubuntu text-center">
                        <Input
                          className="card"
                          variant="filled"
                          sx={{
                            border: "2px solid grey",
                            padding: "15px",
                            paddingLeft: "40px",
                          }}
                          type="text"
                          placeholder="Where to ?"
                          ref={destinationMob}
                        />
                      </Autocomplete>
                    </InputGroup>
                  </div>
                </div>
              </Text>
            </CardBody>
          </Card>
        </div>
        <div>
          <Button
            colorScheme="red"
            sx={{
              padding: "20px",
              backgroundColor: "#E51B23",
              color: "white",
              marginTop: "10%",
              borderRadius: "9px",
              boxShadow: "5px 5px #824244",
            }}
            onClick={handleSearchMob}
          >
            <div className="font-ubuntu text-2xl">Search GrabWay</div>
          </Button>
        </div> */}

        {/* Herosection mobile view code started */}
        <div>
          <Container maxW="6xl" px={{ base: 6, md: 3 }} py={20}>
            <Stack
              direction={{ base: "column", md: "row" }}
              justifyContent="center"
            >
              <Stack
                direction="column"
                spacing={6}
                justifyContent="center"
                maxW="480px"
              >
                <HStack
                  as={Link}
                  p={1}
                  rounded="full"
                  fontSize="sm"
                  w="max-content"
                  // bg={useColorModeValue("gray.300", "gray.700")}
                >
                  <Box
                    py={1}
                    px={2}
                    lineHeight={1}
                    rounded="full"
                    color="white"
                    bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                  >
                    What's new
                  </Box>
                  <HStack
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text lineHeight={1}>See our recent updates</Text>
                    <Icon as={GoChevronRight} w={4} h={4} />
                  </HStack>
                </HStack>
                {/* <chakra.h1
                  fontSize="5xl"
                  lineHeight={1}
                  fontWeight="bold"
                  textAlign="left"
                >
                  Grabway Promises <br />
                  <chakra.span color="teal">Effortless Scheduling</chakra.span>
                  <chakra.span color="teal">
                    Smart Routing for Efficient Rides
                  </chakra.span>
                  <chakra.span color="teal">Safety-First Approach</chakra.span>
                </chakra.h1> */}
                <chakra.h1
                  fontSize="5xl"
                  lineHeight={1}
                  fontWeight="bold"
                  textAlign="left"
                >
                  Grabway Promises <br />
                  {currentText.split("\n").map((item, index) => (
                    <chakra.span key={index} color="teal">
                      {item}
                      <br />
                    </chakra.span>
                  ))}
                </chakra.h1>
                <Text
                  fontSize="1.2rem"
                  textAlign="left"
                  lineHeight="1.375"
                  fontWeight="400"
                  color="gray.500"
                >
                  Elevating Campus Travel - Your go-to platform for hassle-free
                  rides, connecting students seamlessly while prioritizing
                  convenience and safety. Grab your ride, grab your way!
                </Text>
                <HStack
                  spacing={{ base: 0, sm: 2 }}
                  mb={{ base: "3rem !important", sm: 0 }}
                  flexWrap="wrap"
                >
                  <chakra.button
                    w={{ base: "100%", sm: "auto" }}
                    h={12}
                    px={6}
                    color="white"
                    size="lg"
                    rounded="md"
                    mb={{ base: 2, sm: 0 }}
                    zIndex={5}
                    lineHeight={1}
                    bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                    _hover={{
                      bgGradient: "linear(to-l, #0ea5e9,#2563eb)",
                      opacity: 0.9,
                    }}
                  >
                    <a
                      href="https://grabway.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Explore Grabway Commercial
                    </a>
                    <Icon as={MdBolt} h={4} w={4} ml={1} />
                  </chakra.button>
                  <Box
                    d="flex"
                    justifyContent="center"
                    alignItems="center" // Center both horizontally and vertically
                    w={{ base: "100%", sm: "auto" }}
                    border="1px solid"
                    borderColor="gray.300"
                    p={3}
                    lineHeight={1.18}
                    rounded="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() =>
                      window.open("/", "_blank", "noopener noreferrer")
                    }
                    zIndex={55555555}
                  >
                    Dwonload App <Icon as={FcDownload} h={4} w={4} ml={1} />
                  </Box>
                </HStack>
              </Stack>
              {/* <Box ml={{ base: 0, md: 5 }} pos="relative">
                <DottedBox />
                <Image
                  w="100%"
                  h="100%"
                  minW={{ base: "auto", md: "30rem" }}
                  objectFit="cover"
                  src={`https://media4.giphy.com/media/HwukO9Ia7E3YQMEIHu/giphy.gif?cid=ecf05e47urbk1rnwu2bm0hzuxpi57suuk6sv91cxrk4443ko&ep=v1_gifs_related&rid=giphy.gif&ct=s`}
                  rounded="md"
                  fallback={<Skeleton />}
                />
              </Box> */}
            </Stack>
          </Container>
        </div>
        {/* Herosection mobile view code ended*/}
        {loginState === false && (
          <div className="info-section mt-[5%] flex flex-col justify-center items-center gap-10">
            <div className="flex flex-col justify-center items-center">
              <div>
                <img
                  className="w-[60vw] h-[40vh]"
                  src="/assets/images/vission.jpg"
                  alt=""
                />
              </div>
              <div>
                <Card className="w-[90vw]" variant={"filled"}>
                  <CardHeader>
                    <Heading>
                      <div className="flex justify-center items-center font-ubuntu">
                        <div className="mr-[1%]">
                          <PiMountainsDuotone fill="#E51B23" />
                        </div>
                        Our Mission
                      </div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex text-center justify-center items-center text-xl opacity-80">
                        We aim at reducing your travel time, socializing your
                        world of travel
                        <br />
                        and providing comfort at your doorstep.
                      </div>
                      <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#1b4ee5] text-center">
                        <AiOutlineThunderbolt className="mr-[1%]" />
                        JUST GRABWAY AND CHILL
                        <AiOutlineThunderbolt className="ml-[1%]" />
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div>
                <Card className="w-[90vw]" variant={"filled"}>
                  <CardHeader>
                    <Heading>
                      <div className="flex justify-center items-center font-ubuntu">
                        <div className="mr-[1%]">
                          <BiLeaf fill="#E51B23" />
                        </div>
                        Our Vission
                      </div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>
                      <div className="flex text-center justify-center items-center text-xl opacity-80">
                        Grabway is commited to reducing Carbon prints from our
                        planet by providing a public yet personal mode of
                        transport.
                      </div>
                      <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#4ee51b] text-center">
                        <AiFillHeart className="mr-[1%]" />
                        LET US CONTRIBUTE TO A GREENER EARTH
                        <AiFillHeart className="ml-[1%]" />
                      </div>
                    </Text>
                  </CardBody>
                </Card>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div>
                  <Card className="w-[90vw] mt-[4%]" variant={"filled"}>
                    <CardHeader>
                      <Heading>
                        <div className="flex justify-center items-center font-ubuntu">
                          <div className="mr-[1%]">
                            <GiGlassBall fill="#E51B23" />
                          </div>
                          Our Goal
                        </div>
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>
                        <div className="flex text-center justify-center items-center text-xl opacity-80">
                          We plan to become India's most trusted platform for
                          shuttle service,providing completely a new dimension
                          to your daily Life
                        </div>
                        <div className="font-ubuntu mt-[3%] flex justify-center items-center text-2xl opacity-95 text-[#1b4ee5] text-center">
                          <FaRoad className="mr-[1%]" />
                          REDEFINING INDIA'S TRANSPORT ASPIRATIONS
                          <FaRoad className="ml-[1%]" />
                        </div>
                      </Text>
                    </CardBody>
                  </Card>
                </div>
                <div>
                  <img
                    className="w-70vw] h-[30vh]"
                    src="/assets/images/goal.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

/*Herosection function*/
function DottedBox() {
  return (
    <Box
      position="absolute"
      left="-45px"
      top="-30px"
      height="full"
      maxW="700px"
      zIndex={-1}
    >
      <svg
        color={useColorModeValue("rgba(55,65,81, 0.1)", "rgba(55,65,81, 0.7)")}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        ></rect>
      </svg>
    </Box>
  );
}

export default TopSection;

export const featuresList = [
  {
    id: 1,
    title: "24/7 customer support",
    desc: `Day or night, we're here for you. Talk to our support team from anywhere in the world,
    any hour of day.`,
    icon: (
      <svg
        style={{ width: "2rem", height: "2rem" }}
        viewBox="0 0 24 24"
        fill="#60B6B5"
        fillOpacity="0"
        stroke="#60B6B5"
        strokeWidth="1"
        focusable="false"
        aria-hidden="true"
        role="presentation"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="m17.5 2.9c-2.1 0-4.1 1.3-5.4 2.8-1.6-1.6-3.8-3.2-6.2-2.7-1.5.2-2.9 1.2-3.6 2.6-2.3 4.1 1 8.3 3.9 11.1 1.4 1.3 2.8 2.5 4.3 3.6.4.3 1.1.9 1.6.9s1.2-.6 1.6-.9c3.2-2.3 6.6-5.1 8.2-8.8 1.5-3.4 0-8.6-4.4-8.6"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Global hospitality standards",
    desc: `Guests review their hosts after each stay. All hosts must maintain a minimum rating
    and our hospitality standards to be on Airbnb.`,
    icon: (
      <svg
        style={{ width: "2rem", height: "2rem" }}
        viewBox="0 0 24 24"
        role="presentation"
        aria-hidden="true"
        focusable="false"
        fill="#60B6B5"
      >
        <path
          d="m23.57 11.4-1.75-1.76-3.85-3.87-1.78-1.79-2.7-2.71-.82-.83-.22-.23-.06-.06c-.22-.22-.53-.22-.73-.02l-1.75 1.76-3.85 3.87-3.85 3.87-1.75 1.76a1.49 1.49 0 0 0 -.44 1.05v.01c0 .38.15.77.44 1.06l.55.55a1.49 1.49 0 0 0 2.01.08v8.4c0 .81.68 1.45 1.5 1.45h15c .82 0 1.5-.65 1.5-1.45v-8.4c.59.49 1.45.47 2.01-.08l.55-.55c.29-.29.44-.68.44-1.06v-.01c0-.38-.14-.77-.44-1.06zm-3.57 11.16c0 .24-.22.45-.5.45h-15c-.28 0-.5-.21-.5-.45v-9.36l8-7.99 8 7.99zm2.85-9.74-.55.55c-.2.2-.52.2-.71.01l-9.24-9.22a.5.5 0 0 0 -.71 0l-9.24 9.22a.5.5 0 0 1 -.71-.01l-.55-.55a.5.5 0 0 1 -.01-.71l1.75-1.76 3.85-3.87 3.85-3.87 1.4-1.4.77.77 2.7 2.71 1.78 1.79 3.85 3.87 1.75 1.76a.51.51 0 0 1 -.01.71z"
          fillRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    id: 3,
    title: " 5-star hosts",
    desc: `From fresh-pressed sheets to tips on where to get the best brunch, our hosts are full
    of local hospitality.`,
    icon: (
      <svg
        style={{ width: "2rem", height: "2rem" }}
        viewBox="0 0 24 24"
        role="presentation"
        aria-hidden="true"
        focusable="false"
        fill="#60B6B5"
      >
        <path
          d="m15.37 13.54-.01.01a.53.53 0 0 0 .01-.01m-.37 9.46h-11.5c-.28 0-.9-.22-1.38-.58-.71-.52-1.12-1.31-1.12-2.42 0-.04 0-.07.01-.11.09-1.1 1.59-2.44 4.02-3.79a33.14 33.14 0 0 1 2.9-1.42 35.57 35.57 0 0 1 1.31-.54c.63-.26.71-.95.18-1.35a4.55 4.55 0 0 1 -.38-.31 7.1 7.1 0 0 1 -.84-.9c-.73-.92-1.17-1.96-1.2-3.09v-2.99c.07-2.36 2.38-4.5 5.04-4.5 2.67 0 4.96 2.14 4.96 4.5v3c0 1.13-.43 2.17-1.15 3.11a7.35 7.35 0 0 1 -1.09 1.13l-.08.07c-.02.02-.02.02-.05.05s-.03.03-.09.14c-.05.47-.05.47.46.7a.49.49 0 0 0 .36-.15l.06-.05a8.32 8.32 0 0 0 1.23-1.28c.84-1.1 1.35-2.35 1.35-3.72v-3c0-2.92-2.75-5.5-5.96-5.5-3.2 0-5.96 2.56-6.04 5.49v3.01c.03 1.38.56 2.62 1.42 3.71.31.39.63.73.96 1.03.06.05.1.08.15.12a34.28 34.28 0 0 0 -3.98 1.87c-2.73 1.51-4.41 3.02-4.54 4.58a2.41 2.41 0 0 0 -.01.19c0 2.55 1.91 3.99 3.5 4h11.5a.5.5 0 1 0 0-1m7.67-4.22c-.36.74-.97 1.55-1.78 2.38a20.33 20.33 0 0 1 -1.89 1.71 19.94 19.94 0 0 1 -1.89-1.71c-.81-.83-1.42-1.64-1.78-2.38-.22-.45-.33-.86-.33-1.23 0-.99.61-1.56 1.43-1.56.7 0 1.55.53 2.18 1.31a.5.5 0 0 0 .78 0c .63-.78 1.48-1.31 2.18-1.31.82 0 1.43.57 1.43 1.56 0 .36-.11.77-.33 1.23m-1.1-3.78c-.89 0-1.82.5-2.57 1.25-.75-.76-1.68-1.25-2.57-1.25-1.36 0-2.43 1.01-2.43 2.56 0 .53.15 1.08.43 1.66.41.85 1.09 1.74 1.96 2.64a21.09 21.09 0 0 0 2.31 2.05.5.5 0 0 0 .6 0 20.91 20.91 0 0 0 2.31-2.05c.87-.9 1.55-1.79 1.96-2.64.28-.58.43-1.13.43-1.66 0-1.55-1.07-2.56-2.43-2.56"
          fillRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    id: 4,
    title: "24/7 customer support",
    desc: `Day or night, we're here for you. Talk to our support team from anywhere in the world,
    any hour of day.`,
    icon: (
      <svg
        style={{ width: "2rem", height: "2rem" }}
        viewBox="0 0 24 24"
        fill="#60B6B5"
        fillOpacity="0"
        stroke="#60B6B5"
        strokeWidth="1"
        focusable="false"
        aria-hidden="true"
        role="presentation"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="m17.5 2.9c-2.1 0-4.1 1.3-5.4 2.8-1.6-1.6-3.8-3.2-6.2-2.7-1.5.2-2.9 1.2-3.6 2.6-2.3 4.1 1 8.3 3.9 11.1 1.4 1.3 2.8 2.5 4.3 3.6.4.3 1.1.9 1.6.9s1.2-.6 1.6-.9c3.2-2.3 6.6-5.1 8.2-8.8 1.5-3.4 0-8.6-4.4-8.6"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  },
  // {
  //   id: 4,
  //   title: "Global hospitality standards",
  //   desc: `Guests review their hosts after each stay. All hosts must maintain a minimum rating
  //   and our hospitality standards to be on Airbnb.`,
  //   icon: (
  //     <svg
  //       style={{ width: "2rem", height: "2rem" }}
  //       viewBox="0 0 24 24"
  //       role="presentation"
  //       aria-hidden="true"
  //       focusable="false"
  //       fill="#60B6B5"
  //     >
  //       <path
  //         d="m23.57 11.4-1.75-1.76-3.85-3.87-1.78-1.79-2.7-2.71-.82-.83-.22-.23-.06-.06c-.22-.22-.53-.22-.73-.02l-1.75 1.76-3.85 3.87-3.85 3.87-1.75 1.76a1.49 1.49 0 0 0 -.44 1.05v.01c0 .38.15.77.44 1.06l.55.55a1.49 1.49 0 0 0 2.01.08v8.4c0 .81.68 1.45 1.5 1.45h15c .82 0 1.5-.65 1.5-1.45v-8.4c.59.49 1.45.47 2.01-.08l.55-.55c.29-.29.44-.68.44-1.06v-.01c0-.38-.14-.77-.44-1.06zm-3.57 11.16c0 .24-.22.45-.5.45h-15c-.28 0-.5-.21-.5-.45v-9.36l8-7.99 8 7.99zm2.85-9.74-.55.55c-.2.2-.52.2-.71.01l-9.24-9.22a.5.5 0 0 0 -.71 0l-9.24 9.22a.5.5 0 0 1 -.71-.01l-.55-.55a.5.5 0 0 1 -.01-.71l1.75-1.76 3.85-3.87 3.85-3.87 1.4-1.4.77.77 2.7 2.71 1.78 1.79 3.85 3.87 1.75 1.76a.51.51 0 0 1 -.01.71z"
  //         fillRule="evenodd"
  //       ></path>
  //     </svg>
  //   ),
  // },
  // {
  //   id: 5,
  //   title: " 5-star hosts",
  //   desc: `From fresh-pressed sheets to tips on where to get the best brunch, our hosts are full
  //   of local hospitality.`,
  //   icon: (
  //     <svg
  //       style={{ width: "2rem", height: "2rem" }}
  //       viewBox="0 0 24 24"
  //       role="presentation"
  //       aria-hidden="true"
  //       focusable="false"
  //       fill="#60B6B5"
  //     >
  //       <path
  //         d="m15.37 13.54-.01.01a.53.53 0 0 0 .01-.01m-.37 9.46h-11.5c-.28 0-.9-.22-1.38-.58-.71-.52-1.12-1.31-1.12-2.42 0-.04 0-.07.01-.11.09-1.1 1.59-2.44 4.02-3.79a33.14 33.14 0 0 1 2.9-1.42 35.57 35.57 0 0 1 1.31-.54c.63-.26.71-.95.18-1.35a4.55 4.55 0 0 1 -.38-.31 7.1 7.1 0 0 1 -.84-.9c-.73-.92-1.17-1.96-1.2-3.09v-2.99c.07-2.36 2.38-4.5 5.04-4.5 2.67 0 4.96 2.14 4.96 4.5v3c0 1.13-.43 2.17-1.15 3.11a7.35 7.35 0 0 1 -1.09 1.13l-.08.07c-.02.02-.02.02-.05.05s-.03.03-.09.14c-.05.47-.05.47.46.7a.49.49 0 0 0 .36-.15l.06-.05a8.32 8.32 0 0 0 1.23-1.28c.84-1.1 1.35-2.35 1.35-3.72v-3c0-2.92-2.75-5.5-5.96-5.5-3.2 0-5.96 2.56-6.04 5.49v3.01c.03 1.38.56 2.62 1.42 3.71.31.39.63.73.96 1.03.06.05.1.08.15.12a34.28 34.28 0 0 0 -3.98 1.87c-2.73 1.51-4.41 3.02-4.54 4.58a2.41 2.41 0 0 0 -.01.19c0 2.55 1.91 3.99 3.5 4h11.5a.5.5 0 1 0 0-1m7.67-4.22c-.36.74-.97 1.55-1.78 2.38a20.33 20.33 0 0 1 -1.89 1.71 19.94 19.94 0 0 1 -1.89-1.71c-.81-.83-1.42-1.64-1.78-2.38-.22-.45-.33-.86-.33-1.23 0-.99.61-1.56 1.43-1.56.7 0 1.55.53 2.18 1.31a.5.5 0 0 0 .78 0c .63-.78 1.48-1.31 2.18-1.31.82 0 1.43.57 1.43 1.56 0 .36-.11.77-.33 1.23m-1.1-3.78c-.89 0-1.82.5-2.57 1.25-.75-.76-1.68-1.25-2.57-1.25-1.36 0-2.43 1.01-2.43 2.56 0 .53.15 1.08.43 1.66.41.85 1.09 1.74 1.96 2.64a21.09 21.09 0 0 0 2.31 2.05.5.5 0 0 0 .6 0 20.91 20.91 0 0 0 2.31-2.05c.87-.9 1.55-1.79 1.96-2.64.28-.58.43-1.13.43-1.66 0-1.55-1.07-2.56-2.43-2.56"
  //         fillRule="evenodd"
  //       ></path>
  //     </svg>
  //   ),
  // },
];
