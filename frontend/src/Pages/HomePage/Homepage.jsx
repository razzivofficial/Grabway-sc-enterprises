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
        {/* <div className="flex justify-center items-center w-auto h-auto ml-14"> 
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
        <HomeInfo />
        {loginState === false && (
          <>
            <div className="scroller">
              <TopSlider />
            </div>
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
