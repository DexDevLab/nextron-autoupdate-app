import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    "*": {
      "&::-webkit-scrollbar": {
        width: "0px",
        backgroundColor: "rgb(255,255,255,0.0)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#A0AEC0",
        borderRadius: "10px",
        border: "px solid #F7FAFC",
      },
    },
    body: {
      bg: { base: "gray.50", _dark: "gray.900" },
      transitionDuration: ".5s",
      overscrollBehaviorY: "none",
      height: "100%",
      userSelect: "none",
      "*, *::after, *::before": {
        WebkitUserDrag: "none",
        WebkitAppRegion: "no-drag",
      },
    },
    html: {
      bg: { base: "gray.50", _dark: "gray.900" },
      height: "100%",
      colorPalette: "purple",
    },
    "#__next": {
      height: "100%",
    },
  },
  conditions: {
    off: "&:is([data-state=off])",
    on: "&:is([data-state=on])",
  },
  theme: {
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    sizes: {
      maxVh: "var(--vh)",
      maxVw: "var(--vw)",
    },
    tokens: {
      colors: {
        primary: {
          50: {
            value: "#ECF0F9",
          },
          100: {
            value: "#C9D6ED",
          },
          200: {
            value: "#A7BCE2",
          },
          300: {
            value: "#84A2D7",
          },
          400: {
            value: "#6188CC",
          },
          500: {
            value: "#3F6DC0",
          },
          600: {
            value: "#32579A",
          },
          700: {
            value: "#264273",
          },
          800: {
            value: "#192C4D",
          },
          900: {
            value: "#0D1626",
          },
        },
        purple: {
          50: {
            value: "#F2EAFB",
          },
          100: {
            value: "#DBC3F3",
          },
          200: {
            value: "#C49DEC",
          },
          300: {
            value: "#AD77E4",
          },
          400: {
            value: "#9650DC",
          },
          500: {
            value: "#7F2AD5",
          },
          600: {
            value: "#6622AA",
          },
          700: {
            value: "#4C1980",
          },
          800: {
            value: "#331155",
          },
          900: {
            value: "#19082B",
          },
        },
        green: {
          50: {
            value: "#E6FFEF",
          },
          100: {
            value: "#B9FED2",
          },
          200: {
            value: "#8CFDB6",
          },
          300: {
            value: "#5EFC99",
          },
          400: {
            value: "#31FC7C",
          },
          500: {
            value: "#04FB5F",
          },
          600: {
            value: "#03C94C",
          },
          700: {
            value: "#029739",
          },
          800: {
            value: "#026426",
          },
          900: {
            value: "#013213",
          },
        },
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: "{colors.red}" },
      },
    },
    fonts: {
      heading: {
        value: "'DM Sans', sans-serif",
      },
      body: {
        value: "'DM Sans', sans-serif",
      },
    },
    keyframes: {
      boxShadowPulse: {
        "0%": {
          boxShadow: "0px 0px 30px 0px #4C1980",
        },
        "15%": {
          boxShadow: "0px 0px 30px 5px #4C1980",
        },
        "30%": {
          boxShadow: "0px 0px 30px 10px #4C1980",
        },
        "45%": {
          boxShadow: "0px 0px 30px 16px #4C1980",
        },
        "60%": {
          boxShadow: "0px 0px 30px 12px #4C1980",
        },
        "75%": {
          boxShadow: "0px 0px 30px 10px #4C1980",
        },
        "90%": {
          boxShadow: "0px 0px 30px 5px #4C1980",
        },
        "100%": {
          boxShadow: "0px 0px 30px 0px #4C1980",
        },
      },
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
});

const theme = createSystem(defaultConfig, config);

export default theme;
