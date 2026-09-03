import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const RBPagination = () => {
  const [active, setActive] = useState(1);
  const totalPages = 10;

  const items = [];

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setActive(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <h1>Exercise of Pagination</h1>
      <br />

      <Pagination>
        <Pagination.First onClick={() => setActive(1)} />
        <Pagination.Prev
          onClick={() => setActive(active > 1 ? active - 1 : 1)}
        />

        {items}

        <Pagination.Next
          onClick={() =>
            setActive(active < totalPages ? active + 1 : totalPages)
          }
        />
        <Pagination.Last onClick={() => setActive(totalPages)} />
      </Pagination>
    </div>
  );
};

export default RBPagination;