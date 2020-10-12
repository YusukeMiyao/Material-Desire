import React from 'react';

class EditWant extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data : {
                goodsName:props.goodsName,
                url:props.url,
                place:props.place,
                price:props.price,
                img:props.img,
            }
        }
    }

    render() {
        return (
        <div>
            欲しいもの:
                <input type="text" name='goodsName' value={this.state.data.goodsName} onChange={this.handleChange}/>
            URL:
                <input type="url"  name='url' value={this.state.data.url} onChange={this.handleChange}/>
            場所:
                <input type='place' name='place' value={this.state.data.place} onChange={this.handleChange}/>
            値段:
                <input type='text' name='price' value={this.state.data.price} onChange={this.handleChange} placeholder='半角数字のみ'/>
            画像:
                <input type="file" name='img'   accept="image/*" multiple onChange={this.handleChange} onClick={(e)=>{e.target.value = null}}/>
                <img src={this.state.data.img} height={ 200 } width={ 200 }/>
                <button name='delete' onClick={this.handleChange}>画像リセット</button>
            <button onClick={this.handleClickCancel}>キャンセル</button>
            <button onClick={this.handleSubmit}>更新</button>
        </div>
        );
    }

    handleChange= e => {
        // ネストされたオブジェクトのdataまでアクセスしておく
        let data = this.state.data;

        // eventが発火したname属性名ごとに値を処理
        switch (e.target.name) {
            case 'goodsName':
                data.goodsName = e.target.value;
                break;
            case 'url':
                data.url = e.target.value;
                break;
            case 'place':
                data.place = e.target.value;
                break;
            case 'price':
                let price = e.target.value.replace(/,/g, '')
                if(Number(price) || price === '') {
                    if(price < 0) {
                        price.replace(/-/g,'')
                        return price;
                    }
                    price = Number(price).toLocaleString();
                        if (price === '0') {
                            price = '';
                        }
                    data.price = price;
                }
                else return
                break;
            case 'img':
                let files = e.target.files;
                if(files.length > 0){
                // ②createObjectURLで、files[0]を読み込む
                data.img = URL.createObjectURL(files[0]);
                }else {
                    data.img=null
                }
                break;
            case 'delete':
                data.img=null
                break;
        }
       // 状態を更新
        this.setState({
            data: data
        });
}

    imageDelete = () => {

    }
    handleClickCancel = () => {
        const { onCancel, id } = this.props
        onCancel(id, 'editing', false)
    };

    handleSubmit = () => {
        const { id } = this.props
        if (!this.state.data.goodsName) return
        this.props.onSubmit(id, this.state.data)
    }
}

export default EditWant;