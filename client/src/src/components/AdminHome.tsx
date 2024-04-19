import React, { useState, useEffect } from "react";
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
    direction: 'ascending' | 'descending';
  } | null>(null);

  useEffect(() => {
    if (!sessionStorage.getItem("adminUserId")) {
      navigate("/admin/login");
    } else {
      fetchItems();
    }
  }, [navigate, searchTerm]);

  const fetchItems = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3333";
    try {
      const response = await fetch(
        `${apiUrl}/api/admin/home?search=${encodeURIComponent(searchTerm)}`,
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

  const handleSearch = () => {
    fetchItems();
  };

  const handleSort = (key: keyof Item) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setItems(items.slice().sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    }));
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
          <Button onClick={handleSearch}>
            <FaSearch />
          </Button>
        </InputGroup>
      </SearchContainer>
      <Table>
        <TableHeader>
          <HeaderItem onClick={() => handleSort('id')}>
            <FilterLink>
              Id {sortConfig?.key === 'id' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
            </FilterLink>
          </HeaderItem>
          <HeaderItem onClick={() => handleSort('title')}>
            <FilterLink>
              Title {sortConfig?.key === 'title' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
            </FilterLink>
          </HeaderItem>
          <HeaderItem onClick={() => handleSort('summary')}>
            <FilterLink>
              Summary {sortConfig?.key === 'summary' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
            </FilterLink>
          </HeaderItem>
          <HeaderItem onClick={() => handleSort('user_id')}>
            <FilterLink>
              User ID {sortConfig?.key === 'user_id' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
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
  background-color: #f0f8ff;
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
