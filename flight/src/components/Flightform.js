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
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  onCheck(e) {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeDate(dates) {
    //    this.setState({ startDate: e[0], endDate: e[1] });
    //const [start, end] = dates;
    console.log(dates);
  }
  onSubmit(e) {
    e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body,
    };
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
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
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFrom">
              <Form.Label>From</Form.Label>
              <Form.Control
                onChange={this.onChange}
                as="select"
                defaultValue="Choose..."
              >
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridTo">
              <Form.Label>To</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridTo">
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
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Adults 12+</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Children 2-12</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Babies 0-2</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default FlightForm;
