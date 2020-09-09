import React from 'react';

// 事件处理 state props 生命周期 父子组件传值
function Format(props){
    return <h1>it is {props.date.toLocaleTimeString()}</h1>
    }
    class Clock extends React.Component{
        constructor(props){
            super(props);
            this.state = {date: new Date()}
        }
        componentDidMount() { 
           this.timerID = setInterval(
               () => this.tick(),
               1000
           ) 
         }
        componentWillUnmount() { 
            clearInterval(this.timerID) ;
         }
         tick(){
             this.setState({date: new Date()})
         }
        render(){
            return (
                <div>
                    <h1>hello world</h1>
                    <Format date={this.state.date} />
                </div>
            );
        }
        
    }
    
    // 条件渲染
    function Greeting(props){
        const isLogin = props.isLogin;
        return (
            <div>
                {isLogin
                    ?<h1>welcom back!!!</h1>
                    :<h1>please sign up.</h1>
                }
            </div>
        )
        
    }
    function LoginButton(props){
        return <button onClick={props.onClick}>login</button>
    }
    function LogoutButton(props){
        return <button onClick={props.onClick}>logout</button>
    }
    class LoginControl extends React.Component {
        constructor(props){
            super(props);
            this.handleLoginClick = this.handleLoginClick.bind(this);
            this.handleLogoutClick = this.handleLogoutClick.bind(this);
            this.state = {isLogin: false};
        }
        handleLoginClick(){
            this.setState({isLogin: true})
        }
        handleLogoutClick(){
            this.setState({isLogin: false})
        }
        render(){
            const isLogin = this.state.isLogin;
            return (
                <div>
                    <Greeting isLogin={isLogin}/>
                    {   isLogin
                        ?<LoginButton onClick={this.handleLogoutClick} />
                        :<LogoutButton onClick={this.handleLoginClick} />
                    }
                   
                </div>
            )
        }
    }

    // 列表
function ListItem(props){
    return <li>{props.value}</li>
    }
    function NumList(props){
       
        return (
            <ul>
                {props.numbers.map((num)=>
                    <ListItem key={num.toString} value={num} />                
                )}
            </ul>
        )
    
    }
    const numbers= [1,2,3,4,5];
    // 表单 受控组件 多个input框
    class NameForm extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                isGoing:true,
                numOfGuests: 1
            };
            this.handleChange = this.handleChange.bind(this);
        }
        handleChange(event){
            const target = event.target;
            const value = target.name==='isGoing'?target.checked:target.value;
            const name = target.name;
            this.setState({[name]:value});
        }
       
        render(){
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        参与:
                       <input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleChange} />
                    </label>
                    <label>
                    <input name="numOfGuests" type="number" value="提交" value={this.state.numOfGuests} onChange={this.handleChange} />
                    </label>
                    
                </form>
            )
        }
    }

    // 状态提升
const scaleNames ={ c:'Celsius', f:'Fahrenheit'};
function toCelsius(fahrenheit){ // 华氏温度转换为摄氏温度
    return (fahrenheit-32)*5/9;
}
function toFahrenheit(celsius){ 
    return (celsius*9/5)+32;
}
function tryConvert(temperature, convert){
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){return '';}
    const output = convert(input);
    const rounded = Math.round(output*1000)/1000;
    return rounded.toString();
}
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
      return <p>The water would boil.</p>;  
    }
    return <p>The water would not boil.</p>;
}
class TemperatureInput extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }
    handleChange(e){
        this.props.onTemperatureChange(e.target.value)
        console.log('input---输入的数据',e.target.value,)
    }
    render(){
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        console.log(this.props.scale,'-----',temperature)
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        )
    }

}

class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state={temperature:'10',scale: 'c'};
    }
    handleCelsiusChange(temperature){
        this.setState({scale:'c',temperature})
    }
    handleFahrenheitChange(temperature){
        this.setState({scale:'f',temperature})
    }
    render(){
        const scale= this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f'? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput scale='c'
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput scale='f'
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
                <input type="text" />
                <BoilingVerdict
                celsius={parseFloat(celsius)} />
            </div>
        )
    }
}

function Demo(){
    return (
        <div>
       <Clock />
       <LoginControl />
       <NumList numbers={numbers} />
       <NameForm />
       <Calculator />
       
      
        
        
        </div>
    )
    }
    
    export default Demo;