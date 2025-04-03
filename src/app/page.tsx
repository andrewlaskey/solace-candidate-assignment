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
        <label htmlFor="search" className="text-lg font-bold text-zinc-800">Search</label>
        <div>
          <input id="search" onChange={onChange} className="rounded-md p-2 border-2 border-cyan-900 mr-4"/>
          <button onClick={onClick} className="bg-cyan-500 rounded-md p-2 text-white">Reset Search</button>
        </div>
      </div>
      <table className="w-full border-2 border-cyan-900">
        <thead>
          <tr className="bg-cyan-900 text-white">
            <th className="p-2 text-left">First Name</th>
            <th className="p-2 text-left">Last Name</th>
            <th className="p-2 text-left">City</th>
            <th className="p-2 text-left">Degree</th>
            <th className="p-2 text-left max-w-lg">Specialties</th>
            <th className="p-2 text-left">Years of Experience</th>
            <th className="p-2 text-left">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr className="odd:bg-white even:bg-gray-300 text-sm">
                <td className="p-2">{advocate.firstName}</td>
                <td className="p-2">{advocate.lastName}</td>
                <td className="p-2">{advocate.city}</td>
                <td className="p-2">{advocate.degree}</td>
                <td className="p-2 max-w-lg">
                  {advocate.specialties.map((s) => (
                    <div className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-indigo-500 text-white m-1">{s}</div>
                  ))}
                </td>
                <td className="p-2">{advocate.yearsOfExperience}</td>
                <td className="p-2">{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
