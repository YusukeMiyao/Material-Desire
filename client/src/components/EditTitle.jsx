import React from "react";

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
      <div>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          onBlur={this.checkBlankError}
        />
        <button onClick={this.clickCancel}>キャンセル</button>
        <button onClick={this.handleSubmit} onBlur={this.resetErrors}>
          更新
        </button>
        {this.state.blankError ? <p>何か入力してください。</p> : ""}
      </div>
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
