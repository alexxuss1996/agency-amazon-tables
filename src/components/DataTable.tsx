import React, { useState } from "react";
import { Table, Pagination, Form } from "react-bootstrap";
import { Account, Campaign, Profile } from "../types";
import { useParams } from "react-router-dom";
interface DataTableProps {
  data: Account[] | Profile[] | Campaign[];
  columns: string[];
  onRowClick?: (id: number) => void;
}

export const DataTable = ({ data, columns, onRowClick }: DataTableProps) => {
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [filtered, setFiltered] = useState("");

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a] as string;
    const bValue = b[sortBy as keyof typeof b] as string;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      return 0;
    }
  });

  const filteredItems = sortedData?.filter((item) => {
    return columns.some((column) =>
      (item[column as keyof typeof item] as string)
        ?.toString()
        .includes(filtered)
    );
  });

  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (columnName: string) => {
    setSortBy(columnName);
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltered(event.target.value);
    setCurrentPage(1);
  };

  const getIdFromItem = (item: Account | Profile | Campaign): number => {
    if ("accountId" in item) {
      return item.accountId;
    } else if ("profileId" in item) {
      return item.profileId;
    } else if ("campaignId" in item) {
      return item.campaignId;
    }
    return 0;
  };

  const { campaignId } = useParams();
  return (
    <>
      <Form.Control
        className="mb-3"
        type="text"
        placeholder="Filter..."
        value={filtered}
        onChange={handleFilter}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns?.map((column) => (
              <th key={column}>
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort(column)}
                >
                  {column}
                  {sortBy === column ? (
                    <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                  ) : (
                    <span>{"▲"}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item, index) => (
            <tr
              className={campaignId ? "cursor-auto" : "cursor-pointer"}
              key={index}
              onClick={() => onRowClick?.(getIdFromItem(item))}
            >
              {columns.map((column) => (
                <td key={column}>{item[column as keyof typeof item]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="d-flex justify-content-center">
        {filteredItems?.length > 0 &&
          Array.from({
            length: Math.ceil(filteredItems?.length / itemsPerPage),
          })?.map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
      </Pagination>
    </>
  );
};
