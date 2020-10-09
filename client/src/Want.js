import React from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   display:flex;
// `

class Want extends React.Component {
  render() {
    const { goodsName, url, img, price} = this.props
        
    return(
      <div>
        <p>欲しいもの:{goodsName}</p>
        <p>URL・場所:{url}</p>
        <p>値段:{price}</p>
        <img src={img} height={100} width={100}/>
        <button onClick={this.handleClickEdit}>編集</button>
        <button onClick={this.handleClickDelete}>削除</button>
      </div>
    );
  }

      handleClickEdit = () => {
        const { onChange, id, editing }  = this.props;
        onChange(id, 'editing', !editing);
      };

      handleClickDelete = () => {
        const { onDelete, id } = this.props;
        onDelete(id);
      };
}

export default Want;