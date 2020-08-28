import React, { Component } from "react";
import DatePicker from "react-datepicker";
class RangedDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    };

    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.setState({ startDate: new Date() });
  }

  onChange(dates) {
    const [start, end] = dates;
    this.setState({ startDate: start, endDate: end });
    this.props.onChangeDate(dates);
  }

  render() {
    return (
      <div>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.onChange}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          selectsRange
        />{" "}
      </div>
    );
  }
}
export default RangedDate;
