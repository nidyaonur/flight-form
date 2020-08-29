import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import RangedDate from "./Rangeddate";
import SingleDate from "./Singledate";
class FlightForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightType: "twoway",
      from: "",
      to: "",
      startDate: null,
      endDate: null,
      adults: "",
      children: "",
      babies: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  onCheck(e) {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeDate(dates) {
    if (this.state.flightType === "twoway")
      this.setState({ startDate: dates[0], endDate: dates[1] });
    else this.setState({ startDate: dates[0] });
    //const [start, end] = dates;
  }
  onSubmit(e) {
    e.preventDefault();
    const post = {
      from: this.state.from,
      to: this.state.to,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      adults: this.state.adults,
      children: this.state.children,
      babies: this.state.babies,
      flightType: this.state.flightType,
    };
    fetch("https://postman-echo.com/post", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  componentDidMount() {
    this.setState({ startDate: new Date() });
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Row>
            <fieldset>
              <Form.Group as={Col}>
                <Form.Check
                  onChange={this.onChange}
                  inline
                  type="radio"
                  label="Outbound flight + return flight"
                  name="flightType"
                  value="twoway"
                  checked
                />
                <Form.Check
                  onChange={this.onChange}
                  inline
                  type="radio"
                  label="Just Oneway Flight"
                  name="flightType"
                  value="oneway"
                />
              </Form.Group>
            </fieldset>
          </Form.Row>
          <Form.Row className="justify-content-md-center">
            <Form.Group as={Col} xs lg="2">
              <Form.Label>From</Form.Label>
              <Form.Control
                name="from"
                onChange={this.onChange}
                as="select"
                defaultValue="DusselDorf"
              >
                <option>DusselDorf</option>
                <option>Antalya</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} xs lg="2">
              <Form.Label>To</Form.Label>
              <Form.Control
                as="select"
                name="to"
                onChange={this.onChange}
                defaultValue="Antalya"
              >
                <option>Antalya</option>
                <option>DusselDorf</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} xs lg="2">
              <Form.Label>Date</Form.Label>
              <br />
              {this.state.flightType === "twoway" ? (
                <RangedDate onChangeDate={this.onChangeDate} />
              ) : (
                <SingleDate onChangeDate={this.onChangeDate} />
              )}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Adults 12+</Form.Label>
              <Form.Control
                name="adults"
                onChange={this.onChange}
                as="select"
                defaultValue="1"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Children 2-12</Form.Label>
              <Form.Control
                name="children"
                onChange={this.onChange}
                as="select"
                defaultValue="0"
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4th</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Babies 0-2</Form.Label>
              <Form.Control
                name="babies"
                onChange={this.onChange}
                as="select"
                defaultValue="0"
              >
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4th</option>
                <option>5</option>
                <option>6th</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <br />
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default FlightForm;
