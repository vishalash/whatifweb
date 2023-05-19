import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";

export default function Home() {
  const [siteName, setSiteName] = useState("github.com");
  const [htmlData, setHtmlData] = useState("");
  const iframe = useRef();

  async function fetchData() {
    iframe.current.classList.toggle("blur");
    let response = await fetch(`/api/fetch?siteName=${siteName}`);
    const data = await response.text();
    setHtmlData(data);
    iframe.current.classList.toggle("blur");
  }

  const changeHandler = (event) => {
    setSiteName(event.target.value);
  };

  const handleButtonClick = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>What If Web - Go to a domain for fun</title>
      </Head>
      <div className="container mx-auto py-2 bg-yellow-200">
        <h1 className="text-3xl font-bold mb-2 text-center text-black">
          Enter a domain you want to visit
        </h1>
        <div className="flex items-center justify-center mb-4">
          <input
            placeholder="github.com"
            className="border border-black rounded py-2 px-4 mr-2 w-1/2 focus:outline-none"
            value={siteName}
            onChange={changeHandler}
          />
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Fetch
          </button>
        </div>
        <div className="p-4 bg-black rounded shadow-lg">
          <iframe
            className="w-full h-screen"
            ref={iframe}
            srcDoc={htmlData}
          ></iframe>
        </div>
      </div>
    </>
  );
}
