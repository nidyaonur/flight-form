import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class FlightForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightType: "",
      from: "",
      to: "",
      startDate: null,
      endDate: null,
      Adults: "",
      Children: "",
      Babies: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeDate(e) {
    this.setState({ startDate: e[0], endDate: e[1] });
    console.log(e[0]);
  }
  onSubmit(e) {
    console.log("selamm");
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
                  inline
                  type="radio"
                  label="Outbound flight + return flight"
                  name="flightType"
                  id="flightType1"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Just Oneway Flight"
                  name="flightType"
                  id="flightType2"
                />
              </Form.Group>
            </fieldset>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFrom">
              <Form.Label>From</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
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
          </Form.Row>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.onChangeDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            selectsRange
          />

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
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
