import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Unstable_Grid2";
import { PAGE_NAMES } from "../constants/enums";
import { Divider } from "@mui/material";
import { COLORS } from "../constants/enums";
import Box from "@mui/material/Box";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        BorrowBuddy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footers() {
  const settings = PAGE_NAMES;

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: COLORS.SECONDARY,
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={1} sx={{ marginBottom: "10px" }}>
          {settings.map((setting) => (
            <Grid xs>
              <Typography
                component="a"
                href={setting.ROUTE}
                textAlign="center"
                color="primary"
                sx={{
                  textDecoration: "none",
                }}
              >
                {setting.NAME}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footers;
