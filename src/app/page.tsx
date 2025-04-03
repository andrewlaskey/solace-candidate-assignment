"use client";

import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const limit = 5;

  const fetchAdvocates = async (queryOffset: number, search?: string) => {
    try {
      let url = `/api/advocates?offset=${queryOffset}&limit=${limit}`;

      if (search) {
        const queryString = encodeURIComponent(search);
        url += `&queryString=${queryString}`;
      }

      const response = await fetch(url);
      
      const jsonData = await response.json();

      if (jsonData.data.length === 0) {
        setHasMore(false);
      } else {
        if (jsonData.data.length < limit) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        if (queryOffset === 0) {
          setAdvocates(jsonData.data);
          setFilteredAdvocates(jsonData.data);
        } else {
          setAdvocates(prevAdvocates => [...prevAdvocates, ...jsonData.data]);
          setFilteredAdvocates(prevAdvocates => [...prevAdvocates, ...jsonData.data]);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const reset = () => {
    setOffset(0);
    fetchAdvocates(0);
  }

  useEffect(() => {
    console.log("fetching advocates...");
    fetchAdvocates(offset);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    setSearchTerm(searchTerm);

    if (searchTerm.length > 0) {
      fetchAdvocates(offset, searchTerm);
    } else {
      reset();
    }
  };

  const onClick = () => {
    reset();
  };

  const loadMore = () => {
    const nextOffset = offset + limit
    setOffset(nextOffset);
    fetchAdvocates(nextOffset);
  }

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {advocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      { hasMore && (<button onClick={loadMore}>Load More</button>)}
    </main>
  );
}
