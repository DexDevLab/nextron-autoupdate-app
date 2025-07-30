import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import theme from "../theme";


export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider value={theme}>
      <ThemeProvider
        forcedTheme={Component.theme || null}
        attribute="class"
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </ChakraProvider>
  );
}
