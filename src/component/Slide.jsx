import React  from 'react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'
class Slide extends React.Component{
    constructor(props){
        super(props);
        this.state={
            swiper: null
        }
        console.log('lunbo----jsx',props)
    }
    componentWillUnmount() {
        if(this.state.swiper){
            this.state.swiper.destroy();
        }
    }
    componentDidMount() {
        let slider = new Swiper('.swiper-container', {
            direction: 'horizontal',//横向轮播
            loop: true,//无缝轮播
            pagination: {//小圆点分页
                el: '.swiper-pagination',
            },
            navigation: {//左右分页
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {//下划线分页
                el: '.swiper-scrollbar',
            }
        })
        this.setState({swiper:slider})
    }
   
    render(){
        return(
        
            <div className="swiper-container">
        
                {/* <!-- Additional required wrapper --> */}
                <div className="swiper-wrapper">
        
                    {/* <!-- Slides --> */}
                    <div className="swiper-slide">Slide 1</div>
                    <div className="swiper-slide">Slide 2</div>
                    <div className="swiper-slide">Slide 3</div>
                </div>
        
                {/* <!-- If we need pagination --> */}
                <div className="swiper-pagination"></div>
        
                {/* <!-- If we need navigation buttons --> */}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              
            </div>
            ) 
    } 

}
export default Slide;