import { Company, Service } from "./types";

/**
 * Filter array of companies with search term
 */
export function filterName(searchTerm: string, list: Company[]) {
  const results = [];

  for (const company of list) {
    if (company.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
      results.push(company);
    }
  }
  return results;
}

/**
 * Filter array of companies with services
 */
export function filterService(services: string[], list: Company[]) {
  const results = [];

  for (const company of list) {
    if (company.services.filter((value) => services.includes(value)).length) {
      results.push(company);
    }
  }
  return results;
}

/**
 * Filter array of companies with search term and services
 */
export function filterResults(
  results: Company[],
  searchTerm: string,
  services: Service[]
) {
  let filteredResults = filterService(reduceServices(services), results);
  if (searchTerm !== "") {
    filteredResults = filterName(searchTerm, filteredResults);
  }
  return filteredResults;
}

/**
 * Reduce array of service objects to array identifier strings
 */
export function reduceServices(services: Service[]): string[] {
  return services.filter((s) => s.isChecked).map((s) => s.value);
}
