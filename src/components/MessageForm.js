import React from "react";
import Attachment from "./svg/Attachment";

const MessageForm = ({handleSubmit, text, setText, setImg})=>{
    return (
        <form className='message_form' onSubmit={handleSubmit}>
            
            <input 
                onChange={(e)=> setImg(e.target.files[0])}
                type="file" 
                id="img" 
                accept="image/*" 
                style={{display:"none"}} 
            />

            
            <div>
                <input type="text" placeholder="Enter message" value={text} onChange={e=> setText(e.target.value)} />
            </div>
            <label htmlFor="img">
                <Attachment/>
            </label>
            <div>
                <button className="btn">
                    Send
                </button>
            </div>
        </form>
    )
}
export default MessageForm;