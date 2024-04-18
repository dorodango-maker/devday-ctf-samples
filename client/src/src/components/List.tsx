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

// window オブジェクトの型拡張
declare global {
  interface Window {
    hint?: () => void;
  }
}

const List: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [executeSearch, setExecuteSearch] = useState(false); // 新しい状態変数
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Item;
    direction: string;
  } | null>(null);

  const hint = () => {
    console.log("/admin画面が存在する");
  };

  // hint 関数を window オブジェクトに追加
  useEffect(() => {
    window.hint = hint;
    return () => {
      delete window.hint; // コンポーネントのアンマウント時に関数を削除
    };
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      navigate("/login");
    } else {
      fetchItems();
    }
  }, [navigate, searchTerm, executeSearch]); // executeSearchを依存関係に追加

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

  const handleSearch = () => {
    setExecuteSearch(true); // 検索を実行するために状態を更新
  };

  const useSimulateXSS = (htmlString: string) => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!divRef.current || !executeSearch) {
        return;
      }

      const fragment = document
        .createRange()
        .createContextualFragment(htmlString);
      divRef.current.appendChild(fragment);
      setExecuteSearch(false); // 実行後に状態をリセット
    }, [htmlString, executeSearch]);

    return (
      <div ref={divRef} style={{ display: executeSearch ? "block" : "none" }} />
    );
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
        {useSimulateXSS(searchTerm)}
      </SearchContainer>
      <Table>
        <TableHeader>
          <HeaderItem>
            <FilterLink>
              Id{" "}
              {sortConfig?.key === "id"
                ? sortConfig.direction === "ascending"
                  ? "▲"
                  : "▼"
                : ""}
            </FilterLink>
          </HeaderItem>
          <HeaderItem>
            <FilterLink>
              Title{" "}
              {sortConfig?.key === "title"
                ? sortConfig.direction === "ascending"
                  ? "▲"
                  : "▼"
                : ""}
            </FilterLink>
          </HeaderItem>
          <HeaderItem>
            <FilterLink>
              Summary{" "}
              {sortConfig?.key === "summary"
                ? sortConfig.direction === "ascending"
                  ? "▲"
                  : "▼"
                : ""}
            </FilterLink>
          </HeaderItem>
          <HeaderItem>
            <FilterLink>
              User ID{" "}
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
