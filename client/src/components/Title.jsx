import React from "react";
// import styled from 'styled-components';

// const Container = styled.div`
//   display:flex;
// `

class Want extends React.Component {
  render() {
    const { title } = this.props;

    return (
      <div>
        <p>{title}</p>
        <button onClick={this.clickEdit}>編集</button>
      </div>
    );
  }

  clickEdit = () => {
    const { onClickEditTitle, editing, listIndex } = this.props;
    onClickEditTitle(listIndex, !editing);
  };
}

export default Want;
