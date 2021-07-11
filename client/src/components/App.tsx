import React, { useState } from "react";
import { Flex } from "theme-ui";
import { initialServices } from "../data";
import { Service } from "../types";
import { Sidebar } from "./Sidebar";
import { ResultList } from "./ResultList";
/** @jsxImportSource theme-ui */

/**
 * Main App, wich mainly passes data from Sidebar to ResultList
 */
export const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>(initialServices);
  const [serverSide, setServerSide] = useState(true);

  return (
    <Flex sx={{ height: "100vh", flexDirection: ["column", "column", "row"] }}>
      <Sidebar
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        services={services}
        onServiceChange={setServices}
        serverSide={serverSide}
        onServerSideToggle={setServerSide}
      />
      <ResultList
        searchTerm={searchTerm}
        services={services}
        serverSide={serverSide}
      />
    </Flex>
  );
};
