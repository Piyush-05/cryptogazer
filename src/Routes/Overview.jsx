import { Container, styled, Alert, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Value } from "./Dashboard";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../utils/config.http";
import { setError } from "../utils/cryptoSlice";

const OverviewContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  alignItems: "center",
  padding: 30,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: 20,
    textAlign: "left",
  },
}));

const KeyDetail = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 20,
  alignItems: "center",
  padding: 15,
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    // textAlign: 'left'
  },
}));

const Key = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 8,
  alignItems: "baseline",
}));

const Column = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  alignItems: "center",
}));

const CoinImg = styled("img")(({ theme }) => ({
  height: 120,
  [theme.breakpoints.down("sm")]: {
    height: 100,
  },
}));

const Overview = () => {
  const coinOverview = useSelector((store) => store.crypto.coinOverview);
  const errorObj = useSelector((store) => store.crypto.errorObj);

  const dispatch = useDispatch();

  return (
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
        <OverviewContainer>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <CoinImg
              src={coinOverview?.image?.large}
              alt={coinOverview?.name}
            />
            <div>
              <Heading style={{ fontSize: 24, margin: 0 }}>
                {coinOverview?.name} ({coinOverview?.symbol?.toUpperCase()})
              </Heading>
              <Heading style={{ fontSize: 20, margin: 0 }}>
                Rank: {coinOverview?.market_cap_rank}
              </Heading>
            </div>
          </div>
          <div style={{}}>
            <span>
              {ReactHtmlParser(
                coinOverview?.description?.en.split(".").slice(0, 4).join(",")
              )}
              .
            </span>
          </div>
          <KeyDetail>
            <Column>
              <Key>
                <Heading variant="h5" style={{ margin: 0 }}>
                  Market Cap:
                </Heading>
                <Value variant="h6" style={{ margin: 0 }}>
                  {"$"}{" "}
                  {numberWithCommas(
                    coinOverview?.market_data?.market_cap?.usd
                      ?.toString()
                      .slice(0, -6)
                  )}{" "}
                  M
                </Value>
              </Key>
              <Key>
                <Heading variant="h5" style={{ margin: 0 }}>
                  All Time High:
                </Heading>
                <Value variant="h6" style={{ margin: 0 }}>
                  {"$"} {numberWithCommas(coinOverview?.market_data?.ath?.usd)}
                </Value>
              </Key>
              <Key>
                <Heading variant="h5" style={{ margin: 0 }}>
                  All Time Low:
                </Heading>
                <Value variant="h6" style={{ margin: 0 }}>
                  {"$"} {numberWithCommas(coinOverview?.market_data?.atl?.usd)}
                </Value>
              </Key>
            </Column>
            <Column>
              <Key>
                <Heading variant="h5" style={{ margin: 0 }}>
                  Total Supply:
                </Heading>
                <Value variant="h6" style={{ margin: 0 }}>
                  {coinOverview?.market_data?.total_supply}
                </Value>
              </Key>
              <Key>
                <Heading variant="h5" style={{ margin: 0 }}>
                  Circulating Supply:
                </Heading>
                <Value variant="h6" style={{ margin: 0 }}>
                  {coinOverview?.market_data?.circulating_supply}
                </Value>
              </Key>
              <Key>
                <Heading variant="h5" style={{ margin: 0 }}>
                  Market Cap:
                </Heading>
                <Value variant="h6" style={{ margin: 0 }}>
                  {"$"}{" "}
                  {numberWithCommas(
                    coinOverview?.market_data?.market_cap?.usd
                      ?.toString()
                      .slice(0, -6)
                  )}{" "}
                  M
                </Value>
              </Key>
            </Column>
          </KeyDetail>
        </OverviewContainer>
      )}
    </div>
  );
};

export default Overview;
