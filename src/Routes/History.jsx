import {
  Alert,
  Container,
  Input,
  LinearProgress,
  Pagination,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas } from "../utils/config.http";
import { setError } from "../utils/cryptoSlice";

const CustomRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#16171a",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#131111",
  },
  fontFamily: "Montserrat",
}));

const CustomPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "gold",
  },
}));

const History = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const coinList = useSelector((store) => store.crypto.coinList);
  const errorObj = useSelector((store) => store.crypto.errorObj);

  const dispatch = useDispatch();

  const handleSearch = () => {
    return coinList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <div>
      <Container style={{ textAlign: "center" }}>
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
          <>
            <Typography
              variant="h4"
              style={{ margin: 18, fontFamily: "Montserrat" }}
            >
              Cryptocurrency Prices by Market Cap
            </Typography>
            <Input
              style={{ margin: "15px 0px" }}
              placeholder="Search For a Crypto Currency.."
              color="warning"
              sx={{
                color: "white",
                width: "100%",
                backgroundColor: "black",
                padding: 1,
              }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />

            <TableContainer component={Paper}>
              {!coinList ? (
                <LinearProgress style={{ backgroundColor: "gold" }} />
              ) : (
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                    <TableRow>
                      {["Coin", "Price", "24H Change", "Market Cap"].map(
                        (head) => (
                          <TableCell
                            style={{
                              color: "black",
                              fontWeight: "700",
                              fontFamily: "Montserrat",
                            }}
                            key={head}
                            align={head === "Coin" ? "" : "right"}
                          >
                            {head}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>

                  <TableBody
                    style={{ backgroundColor: "#14161a", color: "red" }}
                  >
                    {handleSearch()
                      .slice((page - 1) * 10, (page - 1) * 10 + 10)
                      .map((row) => {
                        const profit24H = row?.price_change_percentage_24h > 0;
                        return (
                          <CustomRow key={row.name}>
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                display: "flex",
                                gap: 15,
                              }}
                            >
                              <img
                                src={row.image}
                                alt={row.name}
                                height="50"
                                style={{ marginBottom: 10 }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                    color: "white",
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: "darkgrey" }}>
                                  {row.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {"$"}{" "}
                              {numberWithCommas(
                                Number(row?.current_price)?.toFixed(2)
                              )}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{
                                color:
                                  profit24H > 0 ? "rgb(14, 203, 129)" : "red",
                                fontWeight: 500,
                              }}
                            >
                              {profit24H && "+"}
                              {Number(
                                row?.price_change_percentage_24h
                              )?.toFixed(2)}
                              %
                            </TableCell>
                            <TableCell align="right" style={{ color: "white" }}>
                              {"$"}{" "}
                              {numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}{" "}
                              M
                            </TableCell>
                          </CustomRow>
                        );
                      })}
                  </TableBody>
                </Table>
              )}
            </TableContainer>

            <CustomPagination
              count={(handleSearch()?.length / 10).toFixed(0)}
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 300);
              }}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default History;
