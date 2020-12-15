import React from "react";
import styled from "styled-components";

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

const ListTitle = styled.p`
  margin: 0 1em 0 0;
`;

const EditButton = styled.button``;

class Title extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <TitleWrap>
        <ListTitle>{title}</ListTitle>
        <EditButton onClick={this.clickEdit}>編集</EditButton>
      </TitleWrap>
    );
  }

  clickEdit = () => {
    const { onClickEditTitle, editing, listIndex } = this.props;
    onClickEditTitle(listIndex, !editing);
  };
}

export default Title;
