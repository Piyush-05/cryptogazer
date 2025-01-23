/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Stack, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { getCurrentPrice, numberWithCommas } from "../utils/config.http";
import { useDispatch, useSelector } from "react-redux";
import CoinChart from "../components/CoinChart";
import { setError } from "../utils/cryptoSlice";

const DashboardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const SideBar = styled("div")(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    borderRight: "none",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRight: "2px solid grey",
  marginTop: 30,
}));

const CoinData = styled("div")(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    gap: 20,
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

const CoinName = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: 20,
  [theme.breakpoints.down("sm")]: {
    fontSize: 24,
  },
}));

export const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: 20,
  [theme.breakpoints.down("sm")]: {
    fontSize: 18,
  },
}));

export const Value = styled(Typography)(({ theme }) => ({
  marginBottom: 20,
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
}));

const Dashboard = () => {
  const selectedCoin = useSelector((store) => store.crypto.selectedCoin);
  const coinOverview = useSelector((store) => store.crypto.coinOverview);
  const errorObj = useSelector((store) => store.crypto.errorObj);

  const dispatch = useDispatch();

  const [{ price, color }, setPrice] = useState({
    price: coinOverview?.market_data?.current_price?.usd || "00.00",
    color: "grey",
  });

  useEffect(() => {
    const ws = getCurrentPrice(selectedCoin);
    ws.onopen = () => {
      console.log("Connection Established!");
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setPrice((prev) => {
        if (response[selectedCoin] > prev.price) {
          return { price: response[selectedCoin], color: "green" };
        } else if (response[selectedCoin] === prev.price) {
          return { price: response[selectedCoin], color: "grey" };
        } else {
          return { price: response[selectedCoin], color: "red" };
        }
      });

      //ws.close();
    };
    ws.onclose = () => {
      console.log("Connection Closed!");
      //initWebsocket();
    };
    ws.onerror = () => {
      console.log("WS Error");
    };
    return () => {
      ws.close();
    };
  }, [selectedCoin]);

  return (
    <>
      <div>
        {errorObj.error ? (
          <Stack sx={{ display: "flex", justifyItems: "center" }}>
            <Alert
              sx={{ color: "red", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
              severity="error"
              variant="outline"
              onClose={() => {
                dispatch(setError({ error: false, msg: "" }));
              }}
            >
              {errorObj.msg}
            </Alert>
          </Stack>
        ) : (
          <DashboardContainer>
            <SideBar>
              <div>
                <img
                  src={coinOverview?.image?.large}
                  alt={coinOverview?.name}
                  height="200"
                  style={{ marginBottom: 20 }}
                />
              </div>
              <CoinName variant="h3">{coinOverview?.name}</CoinName>
              <CoinData>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <Heading variant="h5">Current Price:</Heading>
                  &nbsp; &nbsp;
                  <Value variant="h5" style={{ color: color }}>
                    {numberWithCommas(price)}$
                  </Value>
                </span>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <Heading variant="h5">Percentage Change in 24H:</Heading>
                  &nbsp; &nbsp;
                  <Value variant="h5">
                    {coinOverview?.market_data?.price_change_percentage_24h_in_currency?.usd?.toFixed(
                      2
                    )}
                    %
                  </Value>
                </span>
              </CoinData>
            </SideBar>

            <CoinChart coin={coinOverview} />
          </DashboardContainer>
        )}
      </div>
    </>
  );
};

export default Dashboard;
