import { CircularProgress, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../utils/config.http";
import { useDispatch, useSelector } from "react-redux";
import { setChartData, setError } from "../utils/cryptoSlice";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { chartDays } from "../utils/constants";
import SelectButton from "./SelectButton";

const Container = styled("div")(({ theme }) => ({
  width: "75%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}));

const CoinChart = ({ coin = [] }) => {
  const dispatch = useDispatch();
  const historicData = useSelector((store) => store.crypto.chartData);

  const [days, setDays] = useState(7);
  const [loader, setLoader] = useState(false);

  const fetchHistoricData = async () => {
    try {
      setLoader(true);
      dispatch(setError({ error: false, msg: "" }));
      const resp = await HistoricalChart(coin.id, days, "usd");
      dispatch(setChartData(resp.prices));
    } catch (error) {
      dispatch(setError({ error: true, msg: error.message }));
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    coin.id && fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, coin]);

  return (
    <Container>
      {!historicData || loader ? (
        <CircularProgress style={{ color: "gold" }} size={150} thickness={1} />
      ) : (
        <>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in USD`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default CoinChart;
