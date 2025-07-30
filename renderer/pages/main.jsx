import { useEffect } from "react";

function Main() {

  useEffect(() => {
    console.log("Main Loaded");
  });

  return <>Main Screen</>;
}

Main.theme = "dark";
export default Main;

//TODO Recreate 'Main' based on mocks in order to test all functionalities
