import React, { useEffect, useState } from "react";

export default function Home() {
  const [siteName, setSiteName] = useState("github.com");
  const [htmlData, setHtmlData] = useState("");

  async function fetchData() {
    let response = await fetch(`/api/fetch?siteName=${siteName}`);
    const data = await response.text();
    setHtmlData(data);
  }

  const changeHandler = (event) => {
    setSiteName(event.target.value);
  };

  const handleButtonClick = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="container mx-auto py-8 bg-yellow-200">
      <h1 className="text-3xl font-bold mb-4 text-center text-black">
        Enter a domain you want to visit
      </h1>
      <div className="flex items-center justify-center mb-4">
        <input
          placeholder="github.com"
          className="border border-black rounded py-2 px-4 mr-2 w-1/4 focus:outline-none"
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
      <hr className="mb-4" />
      <div className="p-4 bg-black rounded shadow-lg">
        <iframe className="w-full h-screen" srcDoc={htmlData}></iframe>
      </div>
    </div>
  );
}
