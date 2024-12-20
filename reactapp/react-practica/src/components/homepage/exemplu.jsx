import { useRef,useState} from "react";

function Homepage(){
    const [name, setName]=useState("");
   
    let inputRef= useRef(1)

    return(
        <>
        <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <div>Your name is:</div>
        <button onClick={()=>}></button>
        <div>Page rendered :{renderCount} times</div>
        </>
    )
}