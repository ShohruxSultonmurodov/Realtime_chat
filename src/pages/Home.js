import React, {useEffect, useState} from 'react';
import {db, auth, storage} from "../firebase";
import {collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import {ref, getDownloadURL, uploadBytes} from "firebase/storage";
import User from '../components/User';
import MessageForm from '../components/MessageForm';
import Message from '../components/Message';
const Home =()=>{
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState(""); 
    const [text, setText] = useState('');
    const [img, setImg]= useState("");
    const [msgs, setMsgs] = useState([]);

    const user1 = auth.currentUser.uid;
    useEffect(()=>{
        const usersRef = collection(db, 'users')

        const q = query(usersRef, where('uid', 'not-in', [user1]));
        
        const unsub = onSnapshot(q, querySnapshot =>{
            let users = [];
            querySnapshot.forEach(doc =>{
                users.push(doc.data());
            })
            setUsers(users);
        })
        return ()=>unsub();
    }, []);
    const selectUser = async (user)=>{
        setChat(user);
        const user2 = user.uid;
        const id = user1 > user2 ? `${user1 + user2}`:`${user2 + user1}`;
        const msgsRef = collection(db, 'messages', id, 'chat');
        const q = query(msgsRef, orderBy('createAt', 'asc',));

        onSnapshot(q, querySnapshot =>{
            let msgs = [];
            querySnapshot.forEach(doc=>{
                msgs.push(doc.data());

            })
            setMsgs(msgs);
        });
        const docSnap = await getDoc(doc(db, "lastMsg", id))
        if(docSnap.data() && docSnap.data().from !== user1) {
            await updateDoc(doc(db, "lastMsg", id), {
                unRead: false
            })
        }
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const user2 = chat.uid;
        const id = user1 > user2 ? `${user1 + user2}`:`${user2 + user1}`;

        let url;
        if(img) {
            const imgRef = ref(storage, `images/${new Date().getTime()} - ${img.name}`);
            // await qo'yish kerak balkim
            const snap = await uploadBytes(imgRef, img)
            const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
            url = dlUrl;

        }

        // await qo'yish kerak balkim
        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            from: user1,
            to: user2,
            createAt: Timestamp.fromDate(new Date()),
            media: url || "",
        });
        await setDoc(doc(db, 'lastMsg', id), {
            text,
            from: user1,
            to: user2,
            createAt: Timestamp.fromDate(new Date()),
            media: url || "",
            unRead:true
        })
        setText('');
    }
    return (
        <div className="home_container">
            <div className="users_container">
                {users.map(user=> <User key={user.uid} user={user} selectUser={selectUser} user1={user1} chat={chat} />)}
            </div>
            <div className="messages_container">
                {chat ? (
                    <div>
                        <div className="messages_user">
                            <h3>{chat.name}</h3>
                        </div> 
                        <div className="messages">
                            {msgs.length? msgs.map((msg,i)=><Message key={i} msg={msg} user1={user1} />):null}
                        </div>
                        <MessageForm handleSubmit={handleSubmit} text={text} setText={setText} setImg={setImg} />
                    </div>
                ):(
                    <h3 className="no_conv">Select user to start</h3>
                )}
            </div>
        </div>
    )
}
export default Home;