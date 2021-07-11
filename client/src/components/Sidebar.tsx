import { Checkbox, Flex, Label, Themed, Input, Box, Grid } from "theme-ui";
import { Service } from "../types";

interface Props {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
  services: Service[];
  onServiceChange: (services: Service[]) => void;
  serverSide: boolean;
  onServerSideToggle: (checked: boolean) => void;
}

/**
 * Sidebar for search configuration
 */
export const Sidebar: React.FC<Props> = ({
  searchTerm,
  onSearchTermChange,
  services,
  onServiceChange,
  serverSide,
  onServerSideToggle,
}) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        borderColor: "primary",
        gap: 3,
        backgroundColor: "secondary",
        minWidth: "400px",
        pb: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "primary",
          px: 5,
          py: 3,
          color: "white",
          fontSize: "2em",
          textAlign: "center",
        }}
      >
        Cosuno Challenge
      </Box>
      <Flex
        sx={{
          flexDirection: "column",
          borderColor: "primary",
          gap: 3,
          backgroundColor: "secondary",
          px: 5,
        }}
      >
        <Themed.b>Search Term</Themed.b>

        <Input
          type="search"
          placeholder="Search for company name"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.currentTarget.value)}
        />
        <Grid sx={{ width: "100%" }} columns={[2, 2, 1]}>
          <div>
            <Themed.b>Service</Themed.b>

            {services.map((service) => (
              <Label key={service.value} className="service">
                <Checkbox
                  checked={service.isChecked}
                  value={service.value}
                  onChange={() => {
                    service.isChecked = !service.isChecked;
                    onServiceChange([...services]);
                  }}
                />{" "}
                {service.name}
              </Label>
            ))}
          </div>
          <div>
            <Themed.b>Advanced</Themed.b>

            <Label className="serverside-search">
              <Checkbox
                checked={serverSide}
                onChange={() => onServerSideToggle(!serverSide)}
              />{" "}
              Server side search
            </Label>
          </div>
        </Grid>
      </Flex>
    </Flex>
  );
};
