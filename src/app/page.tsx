"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e) => {
    const searchTerm = e.target.value;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchTerm) ||
        advocate.lastName.includes(searchTerm) ||
        advocate.city.includes(searchTerm) ||
        advocate.degree.includes(searchTerm) ||
        advocate.specialties.includes(searchTerm) ||
        advocate.yearsOfExperience.includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="text-3xl font-bold py-10 text-zinc-800">Solace Advocates</h1>
      <div className="flex flex-col py-4">
        <label htmlFor="search" className="text-2xl font-bold text-zinc-800">Search</label>
        <div>
          <input id="search" onChange={onChange} className="rounded-md p-2 border-2 border-cyan-900 mr-4"/>
          <button onClick={onClick} className="bg-cyan-500 rounded-md p-2 text-white hover:bg-cyan-700">Reset Search</button>
        </div>
      </div>
      <h2 className="text-2xl font-bold pt-10 pb-5 text-zinc-800">Results</h2>
      <div className="w-full border-2 border-cyan-900">
       {filteredAdvocates.map((advocate) => {
            return (
              <div className="flex flex-col md:flex-row p-4 odd:bg-white even:bg-gray-200 text-sm" key={advocate.id}>
                <div className="basis-1/3"> 
                  <h3 className="text-lg font-bold">{advocate.firstName} {advocate.lastName}, {advocate.degree}</h3>
                  <div>
                    <span className="font-bold mr-2">City:</span>
                    <span>{advocate.city}</span>
                  </div>
                  <div>
                    <span className="font-bold mr-2">Phone:</span>
                    <a href={`tel:${advocate.phoneNumber}`} className="text-cyan-600">{advocate.phoneNumber}</a>
                  </div>
                  <div>
                    <span className="font-bold mr-2">Years Experience:</span>
                    <span>{advocate.yearsOfExperience}</span>
                  </div>
                </div>
                <div className="basis-2/3">
                  <h4 className="font-bold mb-2">Specialties</h4>
                  <div>
                    {advocate.specialties.map((s) => (
                      <div className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-indigo-500 text-white m-1">{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
