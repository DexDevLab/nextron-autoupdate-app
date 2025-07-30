import { Box } from "@chakra-ui/react";


export default function BSPulse({ shape = "box", children, ...props }) {
  const borderRadius = () => {
    switch (shape) {
      case "box":
        return "20px";
      case "circle":
        return "50px";
      default:
        return 0;
    }
  };

  return (
    <Box
      animationName={"boxShadowPulse"}
      animationDuration={"2.5s"}
      animationFillMode={"both"}
      animationIterationCount={"infinite"}
      animationTimingFunction={"linear"}
      margin={"auto"}
      padding={0}
      borderRadius={borderRadius()}
      width={"fit-content"}
      height={"fit-content"}
      {...props}
    >
      {children}
    </Box>
  );
}
