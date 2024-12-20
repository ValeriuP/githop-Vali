import { useState } from "react";

function Login(){
   const [form,setForm] =useState({email:'',password:''})
//    const [errors,setErrors] =useState({email:'',password:''})

   const handleChange= (e) =>{
    
    const{name,value}= e.target;
    console.log(name);
    console.log(value);
    setForm({...form,[name]:value});
   };

   const validateFields =(fieldName,inputValue) =>{
    let newErrors={...errors}
    const regex=/\S+@\S+\.\S+/;
    if(fieldName ==='email'){
        newErrors.email ='Email is required'
    }else if (emailRegex.test(inputValue)){
        newErrors.email = "Email is in the Wong format";
    }else{
        newErrors ="";
    }
   }
   if (fieldName ==="password"){
    if (!inputValue){
        newErrors.password = "password is requred";
    }else{
        newErrors.password="";
    }
   }
   setErrors


 const handSubmit= (e)=>{
    e.preventeDefender();
    console.log("Submitted form");
    console.log(form);
 };
    return(<form onSubmit={handSubmit}>
        <div className="login_input">
            <label>Email</label>
            <input 
            type="email" 
            name="email"
            value={form.email}
            onChange={handleChange}
             required></input>
            <span>{errors.email && <p>{errors.email}</p>}</span>
        </div>
            <div className="login_input">
                <label>Password</label>
                <input
                 type="password" 
                 name="password" 
                 onChange={handleChange}
                 value={form.password}
                 required></input>
                <span></span>
            </div>

       
        <button type="submit">Login</button>
    </form>
    )
}
export default Login