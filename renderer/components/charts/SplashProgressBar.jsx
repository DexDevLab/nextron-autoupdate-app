import { Progress } from "@chakra-ui/react";
import React from "react";
import { InfoTip } from "..";

export const SplashProgressBar = React.forwardRef(
  function SplashProgressBar(props, ref) {
    const { value, showValueText, valueText, label, info, ...rest } = props;

    return (
      <Progress.Root
        width="150px"
        value={value}
        variant="outline"
        {...rest}
        ref={ref}
      >
        {label && (
          <Progress.Label pb={2} textAlign={"center"} fontSize={"14px"}>
            {label} {info && <InfoTip>{info}</InfoTip>}
          </Progress.Label>
        )}
        <Progress.Track
          height={"6px"}
          boxShadow={"none"}
          borderRadius={"20px"}
          backgroundColor={"transparent"}
        >
          {showValueText && (
            <Progress.ValueText
              fontSize={"10px"}
              position={"absolute"}
              bottom={"0.1px"}
              left={"40%"}
              right={"40%"}
            >
              {valueText}
            </Progress.ValueText>
          )}
          <Progress.Range backgroundColor={"green.700"} />
        </Progress.Track>
      </Progress.Root>
    );
  }
);
