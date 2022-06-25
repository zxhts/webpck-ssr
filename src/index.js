/**
 * node端不支持import方式，所有引入需要采用require
 */
const React = require('react');
const logo = require("./assets/background.png");
require("./index.less");

class App extends React.Component{

    render(){
        return(
            <div>
                <p className="root">Hello, SSR</p>
                <div>
                    <img src={logo}></img>
                </div>
            </div>
        )
    }
}

module.exports = <App/>;