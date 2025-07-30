import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BSPulse,
  LauncherIcon,
  SplashProgressBar,
  WindowContainer,
} from "../components";
import { usePercentCounter } from "../hooks";
import { IPC, testElectronStore, testIpc, updateChecker } from "../services";
import { asyncDelay } from "../utils";

function Splash() {
  const [progress, run, reset, reach] = usePercentCounter();
  const [loadComplete, setLoadComplete] = useState(false);
  const [loadResults, setLoadResults] = useState({});
  const [label, setLabel] = useState({
    main: "Etapa 1 de 5",
    icon: "🔧",
    desc: "Carregando...",
  });

  const log = async (message) => {
    await IPC.LOG(message);
  };

  useEffect(() => {
    log("Splash Screen Loaded");
    run(true);
  }, []);

  useEffect(() => {
    if (!Object.values(loadResults).includes("Failed")) {
      if (Object.keys(loadResults).length < 5) {
        switch (progress) {
          case 15:
            setLabel({
              main: "Etapa 2 de 5",
              icon: "🔐",
              desc: "Inicializando o sistema Anti-Palles...",
            });
            // Connection Test
            const connectionTest = async () => {
              return await testIpc();
            };
            connectionTest().then(({ status, data }) => {
              if (data.length === 0 || status !== 200) {
                run(false);
                const message =
                  status !== 200 ? data : "Error: Database not found";
                log(`Splash Screen - ${message}`);
                setLoadResults({
                  database: "Failed",
                  message: message,
                });
              } else {
                setLoadResults({
                  database: "OK",
                });
              }
            });
            break;
          case 30:
            // Electron Store test
            const storeTest = async () => {
              return await testElectronStore();
            };
            storeTest().then(({ status, data }) => {
              const testResult = data.test;
              if (status === 200) {
                setLoadResults({
                  ...loadResults,
                  ...testResult,
                });
              } else {
                setLoadResults({
                  ...loadResults,
                  ...data,
                });
              }
            });
            break;
          default:
            break;
        }
      } else {
        switch (progress) {
          case 40:
            log({ tests: { ...loadResults } });
            log("All tests done");
            setLabel({
              main: "Etapa 3 de 5",
              icon: "⚙️",
              desc: "​Procurando atualizações...",
            });
            //TODO Update logic
            const updateCheck = async () => {
              return await updateChecker();
            };
            updateCheck().then(({ status, data }) => {
              console.log(101, status, data)
              // if (data.length === 0 || status !== 200) {
              //   run(false);
              //   const errorMsg =
              //     status !== 200 ? data : "Error: Database not found";
              //   log(`Splash Screen - ${errorMsg}`);
              //   setLoadResults({
              //     ...loadResults,
              //     update: "Failed",
              //     errorMsg: errorMsg,
              //   });
              // }
            });
            break;
          case 60:
            setLabel({
              main: "Etapa 4 de 5",
              icon: "👀",
              desc: "Escondendo baús onde Ryan não possa achar...",
            });
            //TODO Server list from database
            //TODO Download data assets (background, icon etc)
            break;
          case 80:
            setLabel({
              main: "Etapa 5 de 5",
              icon: "🧟",
              desc: "Spawnando zumbis possuídos...",
            });
            break;
          case 100:
            if (!loadComplete) {
              setLabel({
                main: "Etapa 5 de 5",
                icon: "✔️",
                desc: "Pronto!",
              });
              asyncDelay(async () => {
                setLoadComplete(true);
                setLabel({
                  main: " ",
                  icon: "📢​​",
                  desc: "Oin oin, patchorei, que a seta sita patchorei, oin oin...",
                });
              }, 2000);
              asyncDelay(async () => {
                log(`Login is loading...`);
                window.ipc.send("window-open", {
                  windowName: "login",
                  closeParent: true,
                });
              }, 2000);
            }
            break;
          default:
            break;
        }
      }
    } else {
      run(false);
      reset();
      log({ test: { ...loadResults } });
      log("O Launcher encontrou um erro e será fechado");
      setLabel({
        main: " ",
        icon: "❌​​​",
        desc: "O Launcher encontrou um erro e será fechado.",
      });
      asyncDelay(async () => {
        //window.ipc.send("window-close", true);
      }, 3000);
    }
  }, [progress, loadResults]);

  return (
    <WindowContainer
      css={{
        WebkitAppRegion: "drag",
      }}
    >
      <Flex
        flexDirection={"column"}
        py={3}
        height={"270px"}
        justifyContent={"space-between"}
      >
        <Box>
          <BSPulse>
            <LauncherIcon
              boxSize={"120px"}
              marginX={"auto"}
              borderRadius={"lg"}
            />
          </BSPulse>
          <Box pt={2}>
            {!loadComplete && (
              <SplashProgressBar
                mx={"auto"}
                textAlign={"center"}
                value={progress}
                label={label.main}
              />
            )}
          </Box>
        </Box>
        <Flex flexDirection={"column"} justifyContent={"space-between"}>
          <Heading
            letterSpacing="tight"
            mx={"auto"}
            width={"200px"}
            textAlign={"center"}
            lineHeight={"normal"}
            fontSize={"md"}
          >
            {label.icon}
          </Heading>
          <Heading
            lineHeight={"short"}
            letterSpacing="tight"
            mx={"auto"}
            width={"200px"}
            textAlign={"center"}
            fontSize={"sm"}
          >
            {label.desc}
          </Heading>
        </Flex>
      </Flex>
    </WindowContainer>
  );
}

Splash.theme = "dark";
export default Splash;
