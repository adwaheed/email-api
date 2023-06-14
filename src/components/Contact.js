import React, { useState, useEffect } from "react";
import axios from "axios";

const Contact = () => {

    const YOUR_API_KEY = process.env.YOUR_API_KEY;

    

  const [inputData, setInputData] = useState({
    yourname: "",
    youremail: "",
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [msg,setMsg] = useState("");

  useEffect(() => {
    const timeId = setTimeout(() => {
        setMsg("")
    }, 3000)

    return () => {
      clearTimeout(timeId);
    }
  }, [msg]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  

  const handleSubmit = (e) => {
    
    e.preventDefault();
    const dataYourEmail = inputData.youremail;
    const dataYourName = inputData.yourname;
    const dataName = inputData.name;
    const dataEmail = inputData.email;
    const dataSubject = inputData.subject;
    const dataMessage = inputData.message;
      
      

      
      let data = JSON.stringify({
        "email": dataEmail,
        "name": dataName,
        "fromName": dataYourName,
        "fromEmail": dataYourEmail,
        "subject": dataSubject,
        "body": dataMessage
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://100085.pythonanywhere.com/api/v1/mail/${YOUR_API_KEY}/?type=send-email`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        
        if(JSON.stringify(response.data.success === 'true')){
  
          setMsg(JSON.stringify(response.data.message));
        }
      })
      .catch((error) => {
        
        if(error.code === "ERR_BAD_REQUEST"){
          setMsg("Something Went Wrong...!")
        }else {
          setMsg(error.message)
          
        }
        
      });
      
      setInputData({
        yourname: "",
        youremail: "",
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
  };

  return (
    <div className="flex flex-col items-center justify-center">
    
    <form
      onSubmit={handleSubmit}
      className="bg-slate-700 px-10 pt-5 pb-5  rounded-md flex flex-col items-center justify-center space-y-4 shadow-2xl z-[10]"
    >
      <h1 className="text-white text-[32px] font-bold">Send Email</h1>
      <input
        name="yourname"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Sender Name..."
        onChange={handleChange} required value={inputData.yourname}
      />
      <input
        name="youremail"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Sender Email..."
        onChange={handleChange} required value={inputData.youremail}
      />
      <input
        name="name"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Recipient Name..."
        onChange={handleChange} required value={inputData.name}
      />
      <input
        name="email"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Recipient Email..."
        onChange={handleChange}
        required value={inputData.email} />
      <input
        name="subject"
        className="w-[300px] h-10 rounded-md outline-none"
        type="text"
        placeholder="Subject..."
        onChange={handleChange}
        required value={inputData.subject} />
      <textarea
        name="message"
        className="w-[300px] rounded-md h-40 outline-none overflow-scroll-y resize-none"
        placeholder="Message..."
        onChange={handleChange}
        required value={inputData.message} />
      <button
        className="hover:bg-blue-600 rounded-md bg-blue-700 w-full px-10 py-2 text-white font-semibold"
        type="submit"
      >
        Send
      </button>
      {msg === '' ? "" : <p className="absolute left-0 text-white font-semibold py-2 bg-black w-full rounded-md text-center">{msg}</p> }
    </form>
     
    </div>
  );
};

export default Contact;
