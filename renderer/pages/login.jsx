import { useEffect } from "react";

function Login() {
  useEffect(() => {
    console.log("Login Loaded");
    const timeout = async () => {
      return setTimeout(() => {
        console.log("Main is loading...");
        window.ipc.send("window-open", {
          windowName: "main",
          closeParent: true,
        });
      }, 3000);
    };
    timeout();
  });

  return <>Login Screen</>;
}

Login.theme = "dark";
export default Login;

//TODO Recreate 'Main' based on mocks in order to test all functionalities
