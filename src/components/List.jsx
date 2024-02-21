import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const List = () => {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/interns")
      .then((response) => {
        setInterns(response.data);
      })
      .catch((error) => {
        console.error("Error fetching interns:", error);
      });
  }, []);

  return (
    <div>
      <h1>Interns List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Selection Status</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern) => (
            <tr key={intern.id}>
              <td>{intern.name}</td>
              <td>{intern.address}</td>
              <td>{intern.dob}</td>
              <td>{intern.selectionStatus ? "Selected" : "Not Selected"}</td>
              <td>
                <Link to={`/edit/${intern.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
