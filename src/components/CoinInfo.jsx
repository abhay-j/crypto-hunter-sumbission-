import React, { useState, useEffect } from "react";
import { CryptoState } from "../contexts/CryptoContext";
import { HistoricalChart } from "../config/api";
import axios from "axios";
import { Line } from "react-chartjs-2";
import SelectButton from "./SelectButton";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { chartDays } from "../config/data";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
  },
}));
const CoinInfo = ({ coin }) => {
  const classes = useStyles();
  const [historical, setHistorical] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const { data } = await axios.get(
        HistoricalChart(coin?.id, days, currency)
      );
      setHistorical(data.prices);
    };
    fetchHistoricalData();
  }, [currency, days, coin?.id]);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historical ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historical.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historical.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
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
          </>
        )}
        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => {
            return (
              <SelectButton
                onClick={() => {
                  setDays(day.value);
                }}
                key={day.value}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            );
          })}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
