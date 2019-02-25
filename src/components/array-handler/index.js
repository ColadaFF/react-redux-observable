import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createDataRequest as cdr } from "./ducks";

class ArrayHandler extends Component {
  state = {
    user: ""
  };

  handleChangeUser = event => {
    const { createDataRequest } = this.props;
    const { value } = event.target;
    this.setState({ user: value }, () => {
      createDataRequest(value);
    });
  };

  render() {
    const { loading, error, data } = this.props;
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>Error in component {JSON.stringify(error, null, 2)}</p>;
    }
    return (
      <div>
        <pre>
          <code>{JSON.stringify(data, null, 3)}</code>
        </pre>
        <input
          type="text"
          onChange={this.handleChangeUser}
          value={this.state.user}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createDataRequest: cdr }, dispatch);
}

function mapStateToProps(state) {
  const { loading, error, data } = state.data;
  return {
    loading,
    error,
    data
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArrayHandler);
