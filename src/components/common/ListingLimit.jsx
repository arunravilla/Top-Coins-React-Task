import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const ListingLimit = ({ title, limit, limitLatestListing }) => (
  <div className="listingFilter">
    <h4 className="listingFilter_title">{title}</h4>
    <Form className="listingFilter_select">
      <Form.Group>
        <Form.Label>No of Items to show: </Form.Label>
        <Form.Control
          as="select"
          value={limit}
          onChange={e => {
            limitLatestListing(
              e.target.value === "All" ? e.target.value : Number(e.target.value)
            );
          }}
        >
          <option>10</option>
          <option>50</option>
          <option>All</option>
        </Form.Control>
      </Form.Group>
    </Form>
  </div>
);

ListingLimit.propTypes = {
  title: PropTypes.string.isRequired,
  limit: PropTypes.oneOfType(PropTypes.string, PropTypes.number).isRequired,
  limitLatestListing: PropTypes.func.isRequired
};
export default ListingLimit;
