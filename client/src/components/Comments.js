import React from "react";
import {
  CommentText,
  CommentMetadata,
  CommentGroup,
  CommentContent,
  CommentAvatar,
  CommentAuthor,
  FormTextArea,
  CommentAction,
  CommentActions,
  Comment,
  Form,
  Header,
  Button,
} from "semantic-ui-react";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function handleComment() {}

function Comments() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div style={{ width: "54%", margin: "3px" }}>
        <CommentGroup size="medium">
          <Comment>
            <CommentAvatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <CommentContent>
              <div style={{ display: "flex", justifyContent: "left" }}>
                <CommentAuthor as="a">Matt</CommentAuthor>
                <CommentMetadata>Today at 5:42PM</CommentMetadata>
              </div>
              <div style={{ display: "flex", justifyContent: "left" }}>
                <CommentText>
                  How artistic! sodfhsofhsdofhlsdhflsdhflkdsh
                </CommentText>
              </div>
            </CommentContent>
          </Comment>

          <Comment>
            <CommentAvatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
            <CommentContent>
              <div style={{ display: "flex", justifyContent: "left" }}>
                <CommentAuthor as="a">Elliot Fu</CommentAuthor>
                <CommentMetadata>Yesterday at 12:30AM</CommentMetadata>
              </div>
              <div style={{ display: "flex", justifyContent: "left" }}>
                <CommentText>
                  This has been very useful for my research. Thanks as well!
                </CommentText>
              </div>
            </CommentContent>
          </Comment>

          <Comment>
            <CommentAvatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
            <CommentContent>
              <div style={{ display: "flex", justifyContent: "left" }}>
                <CommentAuthor as="a">Joe Henderson</CommentAuthor>
                <CommentMetadata>5 days ago</CommentMetadata>
              </div>
              <div style={{ display: "flex", justifyContent: "left" }}>
                <CommentText>Dude, this is awesome. Thanks so much</CommentText>
              </div>
            </CommentContent>
          </Comment>
        </CommentGroup>
      </div>
      <div style={{ width: "44%", marginTop: "auto", marginBottom: "auto" }}>
        <Form reply>
          <FormTextArea />
          <Button
            content="Comment"
            labelPosition="left"
            icon="edit"
            primary
            onClick={handleComment}
          />
        </Form>
      </div>
    </div>
  );
}

export default Comments;
