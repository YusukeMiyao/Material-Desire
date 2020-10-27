import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
`;

const ListTitle = styled.p`
  margin: 0 1em 0 0;
`;

const EditButton = styled.button``;

class Title extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <Wrap>
        <ListTitle>{title}</ListTitle>
        <EditButton onClick={this.clickEdit}>編集</EditButton>
      </Wrap>
    );
  }

  clickEdit = () => {
    const { onClickEditTitle, editing, listIndex } = this.props;
    onClickEditTitle(listIndex, !editing);
  };
}

export default Title;
