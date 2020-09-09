import React, { useState, useEffect, useCallback } from 'react';
// import Img from './Img';
import './App.css';


function App () {
    const [curData, setCurData] = useState(null); // 存储当前拖拽的数据 
    useEffect(()=>{setCurData(curData)},[curData])//只有当curData的值发生变化时，才会重新执行{}这一句 
    const [idLists, setIdLists] = useState([]); // 拖拽到中央区域的数据id
    const [centerData, setCenterData] = useState([]); // 拖拽到中央区域的数据 
    const setData = [
        {
            "icon":"icon-image",
            "title": "img",
            "name":"图片",
            "src": "/Img",
            "style":{
                "width": "200px",
                "height": "200px",
                "left": "0px",
                "top": "0px",
            },
            "data":{
                "imgsrc":"https://image.pre-zuma.com/image/1260446859901519919.jpg" ,
                "setTitle": "图片设置",
                "setLink" :"/set/changeImg.vue" 
            }
        },{
            "icon":"icon-video",
            "title": "video",
            "name":"视频",
            "src": "/Video",
            "style":{
                "width": "200px",
                "height": "200px",
                "left": "0px",
                "top": "0px",
            },
            "data":{
                "videosrc":"https://www.runoob.com/try/demo_source/movie.mp4" ,
                "setTitle": "视频设置",
                "setLink" :"/set/changeVideo.vue" 
            }
        },{
            "icon":"icon-slide",
            "title": "slide",
            "name":"轮播",
            "src": "/Slide",
            "style":{
                "width": "200px",
                "height": "200px",
                "left": "0px",
                "top": "0px",
            }
        },{
            "icon":"icon-swiper",
            "title": "swiper",
            "name":"轮播",
            "style":{
                "width": "200px",
                "height": "200px",
                "left": "0px",
                "top": "0px",
            }
        },{
            "icon":"icon-swiper",
            "title": "swiper",
            "name":"轮播",
            "style":{
                "width": "200px",
                "height": "200px",
                "left": "0px",
                "top": "0px",
            }
        }
    
    
    
    ];
    // 挂载完成 挂载更细 清除挂载
    
    function getID(length){
        return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
    }
    function dragItem(val,e){
        let currentData = JSON.parse(JSON.stringify(val));
        currentData.id = getID(3);
        setCurData(currentData);
        // setCurData([...curData,currentData]);
        e.dataTransfer.setData('text',e.target.innerHTML)
    }
    function dragover(e){
        e.preventDefault(); // 阻止浏览器默认行为
    }
    function drop(e){
        // e.persist();
        e.dataTransfer.getData('text');
        e.preventDefault();       
        e.stopPropagation(); // 阻止火狐浏览器打开新窗口
        let currentData = curData;
        console.log('drop----放下的数据',curData,'0000',currentData, e, e.pageX)
        
        currentData.style.left =  e.pageX-100-400+'px';
        currentData.style.top =  e.pageY-100+'px';
        if(idLists.indexOf(curData.id) === -1){ // 非再次拖拽        
            setCenterData([...centerData , currentData]);
            setIdLists([...idLists,curData.id]);                 
        }
        
        setCurData([]);
    }
    function getCurData(data){ // 父组件传给子组件的方法
        setCurData(data);
    }
    
    const loadCom = useCallback((url)=>require(`./component${url}.jsx`),[]);
        
    
    const listItems = setData.map((val,i) => 
        <div key={i} className="dp-left-item" draggable="true" onDragStart={dragItem.bind(this,val)} >
            {val.name}
        </div>
    )
    const centerItems = <div className="center-content">
        {centerData.length > 0 &&
                centerData.map((val,i) => {
                    const ChildCom = loadCom(val.src);
                    return (
                        // <div className="center-item" >
                            // <ChildCom.default key={val.id} id={val.id} style={val.style} data={val.data}  value={val} onDragStart={getCurData}/>
                            <ChildCom.default key={val.id} value={val} onDragStartEvent={getCurData} />
                        // </div>
                        
                    )
                })

        }
    </div>
    
    
  
  
    return (
        <div className="App">
          <div className="App-left">
            {listItems}
          </div>
          <div className="App-center" onDrop={drop.bind(this)} onDragOver={dragover.bind(this)}>
            {centerItems}
          </div>
          <div className="App-right">
            
          </div>
        </div>
      );
  
  
}

export default App;
