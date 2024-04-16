import React, { useState } from "react";
import "../styles/List.css";

type Item = {
  id: number;
  title: string;
  summary: string;
  admin: string;
};

const initialItems: Item[] = [
  { id: 1, title: "Item 1", summary: "This is item 1", admin: "admin1" },
  { id: 2, title: "Item 2", summary: "This is item 2", admin: "admin2" },
  { id: 3, title: "Item 3", summary: "This is item 3", admin: "admin3" },
];

const List: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Item;
    direction: string;
  } | null>(null);

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

  return (
    <div className="container">
      <div className="table">
        <div className="table-header">
          <div className="header__item">
            <a
              href="#"
              onClick={() => sortItems("id")}
              className={`filter__link ${
                sortConfig?.key === "id" ? sortConfig.direction : ""
              }`}
            >
              Id
            </a>
          </div>
          <div className="header__item">
            <a
              href="#"
              onClick={() => sortItems("title")}
              className={`filter__link ${
                sortConfig?.key === "title" ? sortConfig.direction : ""
              }`}
            >
              Title
            </a>
          </div>
          <div className="header__item">
            <a
              href="#"
              onClick={() => sortItems("summary")}
              className={`filter__link ${
                sortConfig?.key === "summary" ? sortConfig.direction : ""
              }`}
            >
              Summary
            </a>
          </div>
          <div className="header__item">
            <a
              href="#"
              onClick={() => sortItems("admin")}
              className={`filter__link ${
                sortConfig?.key === "admin" ? sortConfig.direction : ""
              }`}
            >
              Admin
            </a>
          </div>
        </div>
        <div className="table-content">
          {items.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-data">{item.id}</div>
              <div className="table-data">{item.title}</div>
              <div className="table-data">{item.summary}</div>
              <div className="table-data">{item.admin}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
