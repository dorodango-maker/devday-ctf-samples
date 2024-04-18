import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Item = {
  id: number;
  title: string;
  summary: string;
  user_id: number;
};

const List: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Item;
    direction: string;
  } | null>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      navigate("/login");
    } else {
      fetchItems();
    }
  }, [navigate, searchTerm]);

  const fetchItems = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333";
    try {
      const response = await fetch(
        `${apiUrl}/api/list?search=${encodeURIComponent(searchTerm)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setItems(data.data);
      } else {
        console.error("Failed to fetch items");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const sortItems = (key: keyof Item) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    const sortedItems = [...items].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setSortConfig({ key, direction });
    setItems(sortedItems);
  };

  const useSimulateXSS = (htmlString: string) => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!divRef.current) {
        return;
      }

      const fragment = document.createRange().createContextualFragment(htmlString);
      divRef.current.appendChild(fragment);
    }, [htmlString]);

    return <div ref={divRef} />;
  };

  return (
    <Container>
      <SearchContainer>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search items..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>
            <FaSearch />
          </Button>
        </InputGroup>
        {useSimulateXSS(searchTerm)}
      </SearchContainer>
      <Table>
        <TableHeader>
          <HeaderItem>
            <FilterLink onClick={() => sortItems("id")}>
              Id{" "}
              {sortConfig?.key === "id"
                ? sortConfig.direction === "ascending"
                  ? "▲"
                  : "▼"
                : ""}
            </FilterLink>
          </HeaderItem>
          <HeaderItem>
            <FilterLink onClick={() => sortItems("title")}>
              Title{" "}
              {sortConfig?.key === "title"
                ? sortConfig.direction === "ascending"
                  ? "▲"
                  : "▼"
                : ""}
            </FilterLink>
          </HeaderItem>
          <HeaderItem>
            <FilterLink onClick={() => sortItems("summary")}>
              Summary{" "}
              {sortConfig?.key === "summary"
                ? sortConfig.direction === "ascending"
                  ? "▲"
                  : "▼"
                : ""}
            </FilterLink>
          </HeaderItem>
          <HeaderItem>
            <FilterLink onClick={() => sortItems("user_id")}>
              user_id{" "}
              {sortConfig?.key === "user_id"
                ? sortConfig.direction === "ascending"
                  ? "▲"
                  : "▼"
                : ""}
            </FilterLink>
          </HeaderItem>
        </TableHeader>
        <TableContent>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableData>{item.id}</TableData>
              <TableData>{item.title}</TableData>
              <TableData>{item.summary}</TableData>
              <TableData>{item.user_id}</TableData>
            </TableRow>
          ))}
        </TableContent>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const SearchContainer = styled.div`
  width: 100%;
  margin: 50px auto;
`;

const InputGroup = styled.div`
  display: flex;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  padding-left: 2.375rem;
  padding: 10px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: #333;
  color: white;
  cursor: pointer;
`;

const Icon = styled.i`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
`;

const Table = styled.div`
  width: 100%;
  border: 1px solid #ccc;
`;

const TableHeader = styled.div`
  display: flex;
  width: 100%;
  background: #333;
  color: #fff;
  padding: 12px 0;
`;

const TableRow = styled.div`
  display: flex;
  width: 100%;
  background: #fff;
  padding: 12px 0;

  &:nth-of-type(odd) {
    background: #f8f8f8;
  }
`;

const TableData = styled.div`
  flex: 1;
  text-align: center;
  padding: 0 10px;
`;

const HeaderItem = styled.div`
  flex: 1;
  text-align: center;
  padding: 0 10px;
  text-transform: uppercase;
`;

const FilterLink = styled.a`
  color: white;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const TableContent = styled.div`
  width: 100%;
`;

export default List;
