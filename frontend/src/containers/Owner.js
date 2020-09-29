import React, { Component } from "react";
import { connect } from "react-redux";
// Import actions
import fetchGetData from "../actions/fetchData";
import {
  FETCH_OWNER_PENDING,
  FETCH_OWNER_SUCCESS,
  FETCH_OWNER_ERROR,
  UPDATE_OWNER_STORED,
  updateOwnerStored,
} from "../actions/actionsOwner";
// Import getters state
import {
  getOwnerData,
  getOwnerPending,
  getOwnerError,
  getOwnerUpdate,
} from "../reducers/ownerReducer";
import { updateTypesStored } from "../actions/actionsShowcase";

class OwnerData extends Component {
  componentDidMount() {
    const { update, pending, error, storedKey } = this.props;
    const { updateInfo, fetchInfo } = this.props;
    // Check if data has to be fetching or updating from localStorage
    if (update && !error) {
      console.log("Update owner info from localStorage");
      updateInfo(storedKey);
    } else {
      if (!pending) fetchInfo();
      console.log("Fetch Owner Data");
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    data: getOwnerData(state),
    pending: getOwnerPending(state),
    error: getOwnerError(state),
    update: getOwnerUpdate(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchInfo: () =>
      fetchGetData(
        ownProps.url,
        FETCH_OWNER_PENDING,
        FETCH_OWNER_SUCCESS,
        FETCH_OWNER_ERROR,
        UPDATE_OWNER_STORED
      )(dispatch),
    updateInfo: (key) => dispatch(updateOwnerStored(key)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerData);
