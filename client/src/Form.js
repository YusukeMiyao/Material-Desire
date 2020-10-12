import React from 'react';
import Icon from './Icon.png';

class Form extends React.Component {
    constructor(props) {
        super(props)

        this.state= {
            data : {
                goodsName:'',
                url:'',
                price:'',
                img:Icon,
                place:'',
            }
        };
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                欲しいもの:
                <input type="text" name='goodsName' value={this.state.data.goodsName} onChange={this.handleChange}/>
                URL:
                <input type="url"  name='url' value={this.state.data.url} onChange={this.handleChange}/>
                場所:
                <input type="text" name='place' value={this.state.data.place} onChange={this.handleChange}/>
                値段：
                <input type="tel"  name='price' value={this.state.data.price} onChange={this.handleChange} placeholder='半角数字のみ'/>
                <div className="error">整数のみ入力できます</div>
                画像:
                <input type="file" name='img'   accept="image/*" multiple onChange={this.handleChange} onClick={(e)=>{e.target.value = null}}/>
                <img src={this.state.data.img} height={ 100 } width={ 100 } alt='画像' />
                <button name='delete' onClick={this.handleChange}>画像リセット</button>
                <button onClick={this.handleSubmit}>追加</button>
            </form>
        );
    }

    handleChange= e => {
        // ネストされたオブジェクトのdataまでアクセスしておく
        let data = this.state.data;

        // eventが発火したname属性名ごとに値を処理
        switch (e.target.name) {
            case 'goodsName':
                data.goodsName = e.target.value
                // data.id = this.props.id
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
                break;
                }else {
                    data.img= Icon
                }
                break;
            case 'delete':
                e.preventDefault();
                data.img=Icon
                e.target.value = null;
                break;
        }
       // 状態を更新
        this.setState({
            data: data
        });
    }
    handleSubmit = e => {
        const data = this.state.data;
        e.preventDefault();
        if (data.goodsName === '' && data.url === '' && data.img === Icon ) return;
        this.props.onSubmit(data)
        this.setState({data:{ goodsName:'', url:'', place:'', price: 0, img:Icon, }})
    };
    
}

export default Form;