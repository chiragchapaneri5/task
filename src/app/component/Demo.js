"use client";
import React, { useEffect, useState } from "react";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  //   PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
import { Col, Row, Table } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

// Create table headers consisting of 4 columns.
const headers = [
  { title: "userId", prop: "userId" },
  { title: "id", prop: "id" },
  { title: "title", prop: "title" },
  { title: "body", prop: "body" },
];

// Randomize data of the table columns.
// Note that the fields are all using the `prop` field of the headers.
// const body = Array.from(new Array(57), () => {
//   const rd = (Math.random() * 10).toFixed(1);

//   if (rd > 0.5) {
//     return {
//       username: "i-am-billy",
//       realname: `Billy ${rd}`,
//       location: "Mars",
//     };
//   }

//   return {
//     username: "john-nhoj",
//     realname: `John ${rd}`,
//     location: "Saturn",
//   };
// });

// Then, use it in a component.
function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json(); // Parse JSON response

        setData(result); // Set data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  return (
    <>
      <button
        onClick={() =>
          setData(...data, {
            userId: 1000,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
          })
        }
      >
        on Click
      </button>
      <DatatableWrapper body={data} headers={headers}>
        <Row className="mb-4">
          <Col
            xs={12}
            lg={4}
            className="d-flex flex-col justify-content-end align-items-end"
          >
            <Filter />
          </Col>
          <Col
            xs={12}
            sm={6}
            lg={4}
            className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
          >
            {/* <PaginationOpts /> */}
            {/* <PaginationOptions /> */}
          </Col>
          <Col
            xs={12}
            sm={6}
            lg={4}
            className="d-flex flex-col justify-content-end align-items-end"
          >
            <Pagination />
          </Col>
        </Row>
        <Table>
          <TableHeader />
          <TableBody />
        </Table>
      </DatatableWrapper>
    </>
  );
}

export default Home;
