import React from "react";
import { Grid, Themed, Image } from "theme-ui";
import { initialServices } from "../data";
import { Company } from "../types";

interface Props {
  company: Company;
}

/**
 * Search result constructed with theme-ui grid layout
 */
export const Result: React.FC<Props> = ({ company }) => {
  return (
    <Grid
      key={company.id}
      className="result"
      sx={{
        py: 3,
        px: 5,
        alignItems: "center",
        maxWidth: 1000,
        mx: "auto",
        backgroundColor: "light",
        border: "1px solid",
        borderTop: "none",
        borderColor: "medium",
        "&:first-child": {
          borderTop: "1px solid",
          borderColor: "medium",
        },
      }}
      columns={3}
    >
      <div className="company-name-city">
        <Themed.b>{company.name}</Themed.b>
        <br />
        <small>{company.city}</small>
      </div>
      <div className="company-service">
        {company.services
          .map((s) => {
            //apply name mapping
            const service = initialServices.find(
              (service) => service.value === s
            );
            return service?.name || s;
          })
          .join(", ")}
      </div>
      <Image sx={{ height: "4em", m: "0 auto" }} src={company.image} />
    </Grid>
  );
};
