import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";

const EditTitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;
const Title = styled(TextField)`
  margin-right: 0.5em;
`;

class EditTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      blankError: false,
    };
  }

  render() {
    return (
      <EditTitleWrap>
        <Title
          variant="outlined"
          size="small"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          onBlur={this.checkBlankError}
        />
        <ClearIcon onClick={this.clickCancel} />
        <AddIcon onClick={this.handleSubmit} onBlur={this.resetErrors} />
        {this.state.blankError ? <p>何か入力してください。</p> : ""}
      </EditTitleWrap>
    );
  }

  resetErrors = () => {
    this.setState({
      blankError: false,
    });
  };

  checkBlankError = () => {
    if (this.state.title !== "") {
      this.setState({ blankError: false });
      return;
    } else {
      this.setState({ blankError: true });
      return;
    }
  };

  handleChange = (e) => {
    let title = this.state.title;
    title = e.target.value;
    this.setState({
      title: title,
    });
  };

  clickCancel = () => {
    const { onCancel, listIndex } = this.props;
    onCancel(listIndex, false);
  };

  handleSubmit = () => {
    const { listIndex } = this.props;
    if (this.state.title === "") {
      this.setState({ blankError: true });
      return;
    } else if (this.state.blankError) {
      return;
    } else {
      this.setState({ blankError: false });
      this.props.onSubmit(listIndex, this.state.title);
    }
  };
}

export default EditTitle;
