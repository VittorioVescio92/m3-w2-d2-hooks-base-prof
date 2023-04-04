import { useState } from "react";
import { Button, Form } from "react-bootstrap";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJhYzMxMjY4MzQzMTAwMTRkZWE3NjEiLCJpYXQiOjE2ODA1MjQwNTAsImV4cCI6MTY4MTczMzY1MH0.LP8fehJyM-iPCgOwm4Qa_PyYUIVCO9giwhA8P8ogogQ";

const AddComment = props => {
  const [commentObj, setCommentObj] = useState({
    comment: "",
    rate: "1",
    elementId: props.asin,
  });

  const sendComment = async e => {
    e.preventDefault();

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        body: JSON.stringify(commentObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.ok) {
        props.fetchComments();

        setCommentObj({
          comment: "",
          rate: "1",
          elementId: props.asin,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form onSubmit={sendComment}>
      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Commento</Form.Label>
        <Form.Control
          type="text"
          placeholder="Inserisci il commento"
          value={commentObj.comment}
          onChange={e => setCommentObj({ ...commentObj, comment: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Voto</Form.Label>
        <Form.Select
          value={commentObj.rate}
          onChange={e => {
            setCommentObj({
              ...commentObj,
              rate: e.target.value,
            });
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="primary">
        Invia commento
      </Button>
    </Form>
  );
};

export default AddComment;
