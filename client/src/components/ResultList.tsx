import React, { useEffect, useState } from "react";
import { Card, Spinner, Alert } from "theme-ui";
import { Result } from "./Result";
import { Company, Service } from "../types";
import { filterResults, reduceServices } from "../utils";

interface Props {
  searchTerm: string;
  services: Service[];
  serverSide: boolean;
}

let controller: AbortController;

/**
 * Component to fetch search results.
 */
export const ResultList: React.FC<Props> = ({
  searchTerm,
  services,
  serverSide,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);

  useEffect(() => {
    //skip fetching, if we have already fetched all companies
    if (!serverSide && allCompanies.length) {
      return;
    }

    //build url for fetching
    let url: URL;
    if (!serverSide) {
      url = new URL(`${process.env.REACT_APP_API_URL}/companies`);
    } else {
      url = new URL(`${process.env.REACT_APP_API_URL}/companies/search`);
      url.searchParams.append("q", searchTerm);
      url.searchParams.append("services", reduceServices(services).join(","));
    }

    //kill pending requests, when new ones are created
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    const { signal } = controller;

    setLoading(true);
    //fetch!
    fetch(url.toString(), { signal })
      .then(async (res) => {
        if (serverSide) {
          setFilteredCompanies(await res.json());
        } else {
          setAllCompanies(await res.json());
        }
      })
      .catch((e) => {
        //Abort errors are ok due to abortcontroller is creating then
        if (e.name !== "AbortError") {
          setError(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm, services, serverSide, allCompanies]);

  const filteredResults: Company[] = serverSide
    ? filteredCompanies
    : filterResults(allCompanies, searchTerm, services);

  return (
    <Card
      sx={{ flexGrow: 1, overflowY: "scroll", pt: [0, 0, 5] }}
      className="result-list"
    >
      {error && (
        <Alert
          sx={{ maxWidth: 1000, mx: "auto", mt: 4, justifyContent: "center" }}
        >
          Error fetching results
        </Alert>
      )}
      {loading && <Spinner sx={{ position: "absolute", top: 0 }} />}
      {filteredResults.map((company) => {
        return <Result company={company} />;
      })}
    </Card>
  );
};
