import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

import { numberToCurrencyString } from "../helpers";
import ListingLimit from "./common/ListingLimit";
import loader from "../loader.gif";

const CURRENCY_TYPE = "USD";

const MarketOverview = ({
  actions: { fetchLatestListing, limitLatestListing },
  cryptoReducer: { fetchingLatestListing, latestListing, listingLimit }
}) => {
  useEffect(() => {
    fetchLatestListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredListing =
    listingLimit === "All"
      ? latestListing
      : latestListing.slice(0, listingLimit);
  return (
    <div className="App">
      <ListingLimit
        title="Market Overview"
        limit={listingLimit}
        limitLatestListing={limitLatestListing}
      />
      {!fetchingLatestListing ? (
        latestListing.length ? (
          <div style={{ height: `${window.innerHeight - 200}px` }}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Price Change (24h)</th>
                  <th>Market Cap</th>
                  <th>Volume (24h)</th>
                </tr>
              </thead>
              <tbody>
                {filteredListing.map(item => (
                  <tr key={item.id}>
                    <td>{item.cmc_rank}</td>
                    <td>{item.name}</td>
                    <td>
                      ${numberToCurrencyString(item.quote[CURRENCY_TYPE].price)}
                    </td>
                    <td>{item.quote[CURRENCY_TYPE].percent_change_24h}</td>
                    <td>
                      $
                      {numberToCurrencyString(
                        item.quote[CURRENCY_TYPE].market_cap
                      )}
                    </td>
                    <td>
                      $
                      {numberToCurrencyString(
                        item.quote[CURRENCY_TYPE].volume_24h
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <h1>No Data Count</h1>
        )
      ) : (
        <div>
          <img alt="Fetching Data" src={loader} width="200" />
          <p style={{ paddingLeft: "30px" }}>Fetching Latest Listing</p>
        </div>
      )}
    </div>
  );
};

MarketOverview.propTypes = {
  actions: PropTypes.object.isRequired,
  cryptoReducer: PropTypes.object.isRequired
};

export default MarketOverview;
