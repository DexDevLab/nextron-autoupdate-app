import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function NextPage() {
  const [name, setName] = useState("CARALHO");
  const [email, setEmail] = useState("meucu@teucu.com");
  const [password, setPassword] = useState("Senh@123");
  const [message, setMessage] = useState("No message found");

  const createUser = () =>
    window.ipc.send("cadastrar", { name, email, password });
  
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.ipc.on("cadastrar", (message) => {
        setMessage(message);
        console.log(message);
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (basic-lang-javascript)</title>
      </Head>
     Box
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ - <Link href="/home">Go to home page</Link>
        </p>
        <label htmlFor="name">name</label>:
        <input
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="email">email</label>:
        <input
          type="text"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">password</label>:
        <input
          type="text"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={createUser}>Cadastrar</button>
        <p>{JSON.stringify(message)}</p>
      </div>
    </React.Fragment>
  );
}
