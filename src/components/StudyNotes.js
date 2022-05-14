import React from 'react'

import { Component } from 'react'
import './StudyNotes.css'

import 'bootstrap/dist/css/bootstrap.css'
import { Container, Form, Button, Card } from 'react-bootstrap'

const { Configuration, OpenAIApi } = require("openai");
var ul = document.querySelector("ul");


class StudyNotes extends Component {

  constructor() {
    super()
    this.state = {
      heading: 'Your notes will be displayed here',
      response: 'generating ...'
    }
  }

  onFormSubmit = e => {
    e.preventDefault()

    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries())

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_MY_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    openai.createCompletion("text-curie-001", {
      prompt: `What are 5 key points I should know when studying ${formDataObj.topic}`,
      temperature: 0.3,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    .then((response) => {
      this.setState ({
        heading: `Notes for: ${formDataObj.topic}`,
        response: `${response.data.choices[0].text}`
      })
      var li = document.createElement("li");
      var h6 = document.createElement("h6");
      h6.appendChild(document.createTextNode("PROMPT: "));
      li.appendChild(
        h6
      );
      li.appendChild(
        document.createTextNode(formDataObj.topic)
      );
      var h7 = document.createElement("h6");
      h7.appendChild(document.createTextNode("RESPONSE: "));
      li.appendChild(
        h7
      );
      li.appendChild(
        document.createTextNode(response.data.choices[0].text)
      );
      ul.insertBefore(li, ul.firstChild);
    });
  }

  render() {
    return (
      <div> 


        <h1>Concise Study Notes</h1>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>For Quick Revision</Form.Label>
            <Form.Control type="text" name="topic" placeholder="Enter the topic you want to revise" />
          </Form.Group>

          <Button variant="success" type="submit">
            Generate Notes
          </Button>
        </Form>

        <br/>

        <Card>
          <Card.Header as="h5">{this.state.heading}</Card.Header>
          <Card.Body>
            <Card.Text>
              {this.state.response}
            </Card.Text>
          </Card.Body>
        </Card>

        <br/>

        <h2>History</h2>
        <hr/>

      </div>
    )
  }
}

export default StudyNotes