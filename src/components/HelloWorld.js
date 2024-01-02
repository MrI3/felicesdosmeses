import React from "react";

function HelloWorld(props){
    const [text, setText] = React.useState("Hola mundo");
    function printInConsole(){
        setText(props.holaMundo);
    }
    return(
        <h1 onClick={printInConsole}>{text}</h1>
    );
}

export default HelloWorld;