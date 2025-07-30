import { Image } from "@chakra-ui/react";

export default function LauncherIcon({ ...props }) {
  return (
    <Image
      src="/images/dcl-icon-512d.png"
      boxSize="150px"
      border={"4px"}
      borderColor={"black"}
      borderRadius={"20px"}
      fit="scale-down"
      alt="DexCraft-Launcher"
      {...props}
    />
  );
}
