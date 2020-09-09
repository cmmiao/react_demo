import React from 'react';
// function img({style , id , data, value, onDragStart}){
//     let imgStyle = {
//         position:'absolute',
//         width:style.width,
//         height:style.height, 
//         top:style.top,
//         left:style.left,
//     }
//     let iStyle ={
//         width: '100%',
//         height: '100%',
//         objectFit: "cover",
//     }
//     function getDragData(value){
//         console.log('val---img', value)
//         onDragStart(value)
//     }
//     return (
//         <div data-title="图片" id={id} style={imgStyle} value={value} onDragStart={getDragData}>
//             <img className="dp-img" src={data.imgsrc} style={iStyle} alt="" />
//         </div>
//     )
// }
function Img(props){
    let style = props.value.style;
    let currentData = props.value;
    let imgStyle = {
        position:'absolute',
        width: style.width,
        height: style.height, 
        top: style.top,
        left: style.left,
    }
    let iStyle ={
        width: '100%',
        height: '100%',
        objectFit: "cover",
    }
    function getDragData(currentData){
        props.onDragStartEvent(currentData)
    }
    return (
        <div data-title="图片" draggable="true" id={currentData.id} style={imgStyle} onDragStart={getDragData.bind(this,currentData)}>
            <img className="dp-img" src={currentData.data.imgsrc} style={iStyle} alt="" />
        </div>
    )

}

export default Img;