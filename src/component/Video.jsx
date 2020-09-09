import React  from 'react';
function Video(props){
    let style = props.value.style;
    let currentData = props.value;
    let videoStyle = {
        position:'absolute',
        width:style.width,
        height:style.height, 
        top:style.top,
        left:style.left,
    }
    let vStyle ={
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        // background: '#000',
    }
    function getDragData(currentData){
        props.onDragStartEvent(currentData)
    }
    return (
        <div data-title="视频" draggable="true"  id={currentData.id} style={videoStyle} onDragStart={getDragData.bind(this,currentData)}>
            <video className="dp-video" src={currentData.data.videosrc} style={vStyle} controls ></video>
        </div>
    )



}

export default Video;