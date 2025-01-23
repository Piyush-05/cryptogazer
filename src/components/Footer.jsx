import React from "react";
import { useSelector } from "react-redux";
import { Value } from "../Routes/Dashboard";
import { Container } from "@mui/material";
import moment from "moment/moment";

const Footer = () => {
  const coinOverview = useSelector((store) => store.crypto.coinOverview);

  return (
    <Container style={{ textAlign: "center" }}>
      <Value style={{ color: "grey" }}>
        Last Updated By:{" "}
        {moment(coinOverview.last_updated).format("YYYY-MM-DD h:mm:ss A")}
      </Value>
    </Container>
  );
};

export default Footer;
