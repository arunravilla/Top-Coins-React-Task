import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Label
} from "recharts";

import { numberToCurrencyString } from "../helpers";
import ListingLimit from "./common/ListingLimit";
import loader from "../loader.gif";

const CURRENCY_TYPE = "USD";

const CustomTooltip = ({ payload }) => (
  <div className="customTooltip">
    {payload && payload[0] && payload[0].payload && (
      <h6>
        Name: <strong>{payload[0].payload.name}</strong>
      </h6>
    )}
    {payload.map((d, idx) => (
      <h6 key={idx}>
        {d.name}:
        <strong
          className={
            d.dataKey === "z"
              ? "customTooltip__positive"
              : "customTooltip_negative"
          }
        >
          {" "}
          {d.dataKey === "z"
            ? d.payload[d.dataKey]
            : `$${numberToCurrencyString(d.payload[d.dataKey])}`}
        </strong>
      </h6>
    ))}
  </div>
);

CustomTooltip.propTypes = {
  payload: PropTypes.array.isRequired
};

const LiquidityAnalysis = ({
  actions: { fetchLatestListing, limitLatestListing },
  cryptoReducer: { fetchingLatestListing, latestListing, listingLimit }
}) => {
  useEffect(() => {
    fetchLatestListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredListing = latestListing
    .slice(0, listingLimit === "All" ? latestListing.length : listingLimit)
    .map(item => {
      return {
        x: item.quote[CURRENCY_TYPE].market_cap,
        y: item.quote[CURRENCY_TYPE].volume_24h,
        z: item.quote[CURRENCY_TYPE].percent_change_24h,
        name: item.name
      };
    });

  return (
    <div className="App">
      <header className="App-header">
        <ListingLimit
          title="Liquidity Analysis"
          limit={listingLimit}
          limitLatestListing={limitLatestListing}
        />
        {!fetchingLatestListing ? (
          latestListing.length ? (
            <ScatterChart
              width={800}
              height={400}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis
                type="number"
                dataKey={"x"}
                name="Market Capitalization"
                width={200}
                dx={-5}
              >
                <Label value="Market Capitalization" position="bottom" />
              </XAxis>
              <YAxis
                type="number"
                dataKey={"y"}
                name="Volume (24h)"
                width={100}
              >
                <Label value="Volume (24h)" position="bottom" offset={30} />
              </YAxis>
              <ZAxis dataKey={"z"} name="Price Change (24h)" />
              <CartesianGrid />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ payload }) =>
                  payload.length ? <CustomTooltip payload={payload} /> : <div />
                }
              />
              <Scatter data={filteredListing} fill="#007bff" shape="star" />
            </ScatterChart>
          ) : (
            <h1>No Data Count</h1>
          )
        ) : (
          <div>
            <img alt="Fetching Data" src={loader} width="200" />
            <p style={{ paddingLeft: "30px" }}>Fetching Latest Listing</p>
          </div>
        )}
      </header>
    </div>
  );
};

LiquidityAnalysis.propTypes = {
  actions: PropTypes.object.isRequired,
  cryptoReducer: PropTypes.object.isRequired
};

export default LiquidityAnalysis;
