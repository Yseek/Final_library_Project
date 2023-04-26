import styled from "styled-components";
import { useEffect, useState } from "react";

function Pagination({ total, limit, page, setPage}){
    const numPages = Math.ceil(total / limit);
    const startPage = Math.max(page - 1, 1);
    const endPage = Math.min(startPage + 2, numPages);
    const pages = [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
  
    return (
      <div>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {pages.map((p) => (
        <Button
          key={p}
          onClick={() => setPage(p)}
          aria-current={page === p ? "page" : null}
        >
          {p}
        </Button>
      ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </div>
    )
}

/* const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;  */

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: grey;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`; 

export default Pagination;