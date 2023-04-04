import CommentsList from "./CommentsList";
import AddComment from "./AddComment";
import { useEffect, useState } from "react";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJhYzMxMjY4MzQzMTAwMTRkZWE3NjEiLCJpYXQiOjE2ODA1MjQwNTAsImV4cCI6MTY4MTczMzY1MH0.LP8fehJyM-iPCgOwm4Qa_PyYUIVCO9giwhA8P8ogogQ";

const CommentArea = props => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
        headers: {
          Authorization: token,
        },
      });

      if (response.ok) {
        const commentsArr = await response.json();

        setComments(commentsArr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [props.asin]);

  return (
    <div>
      <AddComment asin={props.asin} fetchComments={fetchComments} />
      <CommentsList comments={comments} />
    </div>
  );
};

export default CommentArea;
