import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import Image from "next/image";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Progress,
  ProgressLabel,
  Slide,
  Tag,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";

const client = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Credentials": "true",
  },
});

function Main() {
  const [message, setMessage] = React.useState("No message found");
  const [progress, setProgress] = useState(0);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const {
    isOpen: isLoading,
    onOpen: onLoadingStart,
    onClose: onLoadingEnd,
  } = useDisclosure();

  React.useEffect(() => {
    window.ipc.on("message", (message) => {
      setMessage(message);
      console.log(message);
    });
  }, []);

  useEffect(() => {
    window.ipc.on("download progress", (progress) => {
      onLoadingEnd();
      // console.log(event, arg); // Progress in fraction, between 0 and 1
      const progressInPercentages = progress.percent * 100; // With decimal point and a bunch of numbers
      setProgress(progressInPercentages.toFixed(2));
      const cleanProgressInPercentages = Math.floor(progress * 100); // Without decimal point
      console.log(progressInPercentages, cleanProgressInPercentages);
    });

    return () => {};
  }, []);

  const downloadFile = (url) => {
    onLoadingStart();
    onOpen();
    // window.ipc.send("download", "Hello");
    // if (typeof window !== "undefined") {
    window.ipc.send("download", {
      url: "https://github.com/szalony9szymek/large/releases/download/free/large",
      properties: {
        directory: "%APPDATA%/DexCraft Launcher",
      },
    });
    // }

    // client
    //   .get(
    //     "https://github.com/szalony9szymek/large/releases/download/free/large",
    //     {
    //       responseType: "blob",
    //       onDownloadProgress: (event) => {
    //         onLoadingEnd();
    //         console.log(60, event);
    //         const downloadProgress = Math.round(
    //           (event.loaded * 100) / event.total
    //         );
    //         setProgress(downloadProgress);
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     setProgress(100);
    //     console.log(response.data);
    //   })
    //   .finally(() => {
    //     onClose();
    //   });
  };

  return (
    <>
      <Head>
        <title>Home - Nextron (CU)</title>
      </Head>
      <VStack bgImage="/images/dc-nostalgia-banner.jpg" bgSize="cover">
        <VStack
          bg="blackAlpha.500"
          w="full"
          minH="100Vh"
          p={4}
          alignContent="center"
          justifyContent="space-between"
        >
          <Flex justifyContent="center">
            <Heading color="purple.50">
              ⚡ Electron + Next.js ⚡ - <Link href="/next">Go to CU</Link>
            </Heading>
          </Flex>
          <VStack justifyContent="center">
            <Image
              src="/images/logo.png"
              alt="Logo image"
              width={256}
              height={256}
              _hover={{
                opacity: 0.3,
                transition: "all .2s ease-in-out",
                cursor: "pointer",
              }}
            />
            <Tooltip label="Hey, I'm here!" aria-label="A tooltip" hasArrow>
              <Tag variant="solid" borderRadius="full">
                Sample Tag
              </Tag>
            </Tooltip>
            <Tooltip label="Hey, I'm here!" aria-label="A tooltip" hasArrow>
              <IconButton
                as={FiUser}
                boxSize={8}
                colorScheme="purple"
                cursor="pointer"
                p={1}
                rounded="md"
              />
            </Tooltip>
          </VStack>
          <VStack>
            <Input />
            <HStack>
              <Button
                onClick={() => {
                  window.ipc.send("message", "Hello");
                }}
              >
                Test IPC
              </Button>
              <Button onClick={downloadFile}>Download</Button>
            </HStack>
            <p>{JSON.stringify(message)}</p>
          </VStack>
        </VStack>
      </VStack>
      <Slide
        direction="bottom"
        in={isOpen}
        // in
        style={{ zIndex: 10 }}
      >
        <Box
          // p="15px"
          color="white"
          p={4}
          bg="purple.500"
          rounded="md"
          shadow="md"
        >
          <Progress
            size="lg"
            hasStripe
            value={progress}
            rounded="md"
            colorScheme="green"
            isAnimated
            isIndeterminate={isLoading}
            sx={{
              "& > div:first-child": {
                transitionProperty: "width",
                transitionDuration: "2s",
                transitionTimingFunction: "ease-out",
              },
            }}
          >
            <ProgressLabel
              color={progress <= 50 ? "white" : "purple.400"}
              fontWeight="extrabold"
            >
              <Text
                fontSize="md"
                color={progress <= 50 ? "white" : "purple.400"}
                fontWeight="extrabold"
              >
                {isLoading ? "Iniciando Download..." : `${progress}%`}
              </Text>
            </ProgressLabel>
          </Progress>
        </Box>
      </Slide>
    </>
  );
}

Main.theme = "dark";
export default Main;
