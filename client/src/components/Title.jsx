import React from "react";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

const ListTitle = styled.p`
  margin: 8px 1em 8px 0;
`;

class Title extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <TitleWrap>
        <ListTitle>{title}</ListTitle>
        <EditIcon fontSize="small" onClick={this.clickEdit} />
      </TitleWrap>
    );
  }

  clickEdit = () => {
    const { onClickEditTitle, editing, listIndex } = this.props;
    onClickEditTitle(listIndex, !editing);
  };
}

export default Title;
