import { Company } from "./types";

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
