import { Button, Card, CardContent } from "@mui/material";
import * as React from "react";
import Form from 'react-bootstrap/Form';
import { BsArrowRight, BsMic } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import inpimg from '../assets/images/profile.webp';
// import Button from 'react-bootstrap/Button';
import { addDoc, collection, doc, getDoc, getFirestore, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import moment from "moment";
import { useEffect, useState } from "react";
import presshopchatic from "../assets/images/chat-icons/presshoplogo.svg";
import { auth, storage } from "../firebase";
import { Get, Post } from "../services/user.services";
import Loader from "./Loader";
import { useDarkMode } from "../context/DarkModeContext";
// import io from "socket.io-client";
function ChatCard(props) {
    const [roomId, setRoomId] = useState(null);
    const [msg, setMsg] = useState("")
    const [messages, setMessages] = useState([]);
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState()
    const [profileImage, setProfileImage] = useState()
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [roomDetails, setRoomDetails] = useState()
    const [file, setFile] = useState(null);
    const [type, setType] = useState('')

    const { profileData } = useDarkMode();

    const userImage = profileData?.hasOwnProperty("admin_detail") ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image


    const Profile = async () => {
        setLoading(true)
        try {
            setLoading(false)
            const resp = await Get(`mediaHouse/getProfile`)
            setProfileImage(resp.data.profile.admin_detail.admin_profile)
            setName(resp.data.profile.full_name)
        }
        catch (error) {
            setLoading(false)
        }
    }

    const CreateRoom = async () => {
        if (localStorage.getItem('internal')) {
            setShow(false)
            const obj = {
                receiver_id: props.senderId,
                room_type: "MediahousetoAdmin",
                type: "external_content",
                content_id: localStorage.getItem('internal')
            }

            const resp = await Post(`mediaHouse/createRoom`, obj)
            setRoomDetails(resp.data.details)
        } else {
            setShow(true)
            const obj = {
                receiver_id: props.senderId,
                room_type: "MediahousetoAdmin",

            }
            const resp = await Post(`mediaHouse/createRoom`, obj)
            setRoomDetails(resp.data.details)
        }
    }

    const generateVideoThumbnail = (file) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement("canvas");
            const video = document.createElement("video");
            video.autoplay = true;
            video.muted = true;
            video.src = URL.createObjectURL(file);
            video.onloadeddata = () => {
                let ctx = canvas.getContext("2d");
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                    const storageRef = ref(getStorage(), 'thumbnails', file.name);
                    uploadBytes(storageRef, blob).then(() => {
                        getDownloadURL(storageRef).then((downloadURL) => {
                            resolve(downloadURL);
                        });
                    }).catch((error) => {
                        reject(error);
                    });
                }, 'image/jpeg');
            };
        });
    };

    const sendMessage = async (message, messageType, thumbnailURL = '') => {
        const { uid, email } = auth.currentUser || {};
        const messageRef = collection(getFirestore(), 'Chat', roomDetails.room_id && roomDetails.room_id, 'Messages')

        const newDoc = {
            messageId: new Date(),
            date: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
            senderId: roomDetails?.sender_id,
            senderName: roomDetails?.senderDetails?.first_name + " " + roomDetails?.senderDetails?.last_name,
            senderImage: userImage,
            receiverId: roomDetails?.receiver_id,
            receiverName: roomDetails?.receiverDetails?.name,
            receiverImage: roomDetails?.receiverDetails?.profile_image,
            roomId: roomDetails?.room_id,
            replyMessage: "Empty Comming Soon",
            messageType: messageType,
            message: message,
            videoThumbnail: "",
            uploadPercent: 0.0,
            readStatus: "unread",
            replyType: type,
            latitude: 0.0,
            longitude: 0.0,
            isReply: "",
            isLocal: 1,
            chat_with : "presshop and admin"
            // uid,
        }

        try {
            await addDoc(messageRef, {
                messageId: new Date(),
                date: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
                senderId: roomDetails?.sender_id,
                senderName: roomDetails?.senderDetails?.first_name + " " + roomDetails?.senderDetails?.last_name,
                senderImage: userImage,
                receiverId: roomDetails?.receiver_id,
                receiverName: roomDetails?.receiverDetails?.name,
                receiverImage: roomDetails?.receiverDetails?.profile_image,
                roomId: roomDetails?.room_id,
                replyMessage: "Empty Comming Soon",
                messageType: messageType,
                message: message,
                videoThumbnail: "",
                uploadPercent: 0.0,
                readStatus: "unread",
                replyType: type,
                latitude: 0.0,
                longitude: 0.0,
                isReply: "",
                isLocal: 1,
                // uid,
            });
            setMsg('');
            setFile(null)
            GetMessages()
            setLastMessage(message, messageType, thumbnailURL ,roomDetails?.room_id , newDoc)
        }
        catch (error) {
            // setLoading(false)
        }
    };

    const chatBoxRef = React.useRef(null);

    const scrollToBottom = () => {
        // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    };

    const GetMessages = () => {
        if (props?.roomDetails?.room_id) {
            const messageRef = collection(getFirestore(), 'Chat', props?.roomDetails?.room_id && props?.roomDetails?.room_id, 'Messages')
            const q = query(messageRef, orderBy('date'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const newMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setMessages(newMessages);
                scrollToBottom();
            });

            return unsubscribe;
        }

        else if (roomDetails?.room_id) {
            const messageRef = collection(getFirestore(), 'Chat', roomDetails?.room_id && roomDetails?.room_id, 'Messages')

            const q = query(messageRef, orderBy('date'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const newMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setMessages(newMessages);
                scrollToBottom();
            });

            return unsubscribe;
        }
    }

    const handleFileChange = (event) => {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleSend = async () => {
        if (file) {
            const storageRef = ref(storage, `chat/${file.name}`);
            try {
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);
                let messageType = '';
                let thumbnailURL = '';

                if (file.type.startsWith('image/')) {
                    messageType = 'image';
                } else if (file.type.startsWith('video/')) {
                    messageType = 'video';
                    // Generate the thumbnail and get the data URL
                    const thumbnailDataUrl = await generateVideoThumbnail(file);
                    thumbnailURL = thumbnailDataUrl;
                } else if (file.type.startsWith('audio/')) {
                    messageType = 'audio';
                }
                sendMessage(downloadURL, messageType, thumbnailURL);

                // setOpenModal(false);
            } catch (error) {
            } finally {
                setFile(null);
            }
        } else if (msg.trim() !== '') {
            sendMessage(msg, 'text');
        }

    };

    const setLastMessage = async (message, messageType, thumbnailURL = "" , roomId , newDoc) => {
        const firestore = getFirestore();
        const docRef = doc(firestore, "Chat", roomId);
        const updatedFields = {
          message: message,
          messageType: messageType,
          date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    
        }
        
        try {
          // Get the current data of the document
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            await updateDoc(docRef, updatedFields);
          } else {
           
            await setDoc(docRef, newDoc); 
          }
        } catch (error) {
          throw error;
        }
      }

    const handleSendClick = (event) => {
        event.preventDefault();
        if(roomDetails.room_id){
            handleSend();
        }
    };



    useEffect(() => {
        GetMessages()
    }, [roomDetails?.room_id])


    useEffect(() => {
        Profile()
    }, [])

    useEffect(() => {
        CreateRoom()
    }, [props.senderId])
    
    return (
        <>
            {loading && <Loader />}
            <div className="d-flex flex-row gap_20">
                <Card className="chatmain cht_ht">
                    <CardContent className="chatting">
                        <div className="chatting_header">
                            <p className="mb-0">
                                {/* Presshop chat */}
                                Presshop Chat
                            </p>
                        </div>

                        <div className="chat_msgs_scrl" ref={chatBoxRef}>
                            {messages && messages.map((curr, index) => {
                                const today = new Date()
                                const secondDate = new Date(curr.current_time);
                                return (
                                    <div className="chatting_itm d-flex align-items-start" >
                                        <img src={curr.senderImage} alt="User" className="usr_img" />
                                        <div className="cht_txt">
                                            <div className="d-flex align-items-center">
                                                <p className="usr_name mb-0">{curr.senderName}
                                                    {/* <img src={presshopchatic} alt="Presshop logo" className='ms-1' /> */}
                                                    </p>
                                                <p className="cht_time mb-0">{moment.utc(curr.date).local().format('hh:mm:A')}</p>
                                            </div>
                                            {curr.media !== null ? (
                                                curr.messageType === "text" ? (
                                                    <p className="mb-0 msg">{curr.message}</p>
                                                ) : curr.messageType === "image" ? (
                                                    <img
                                                        src={curr.message}
                                                        alt="User"
                                                        className="usr_img"
                                                        style={{ width: "100px" }}
                                                    />
                                                ) : curr.messageType === "video" ? (
                                                    <video src={curr.message} controls style={{ width: "50%" }}></video>
                                                ) : curr.messageType === "csv" ? (
                                                    <a href={curr.message} download>Download CSV</a>
                                                ) : curr.messageType === "audio" ? (
                                                    <audio src={curr.message} download>Download CSV</audio>
                                                ) : null
                                            ) : (
                                                <p className="mb-0 msg">{curr.message}</p>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>

                    <Form onSubmit={handleSendClick}
                    >
                        <div className="chatting_type position-relative">
                            <img src={userImage} alt="" className="typing_img" />
                            <input type="text" className="inp_msg" value={msg} placeholder="Type here…"
                                onChange={(e) => {
                                    setMsg(e.target.value);
                                    setType('text')
                                }}

                            />
                            <div className="chatIn-options">
                                <input type='file' id="cht_add_img" className="cht_file_inp" onChange={handleFileChange} />
                                <label htmlFor="cht_add_img" className="cht_fl_inp_lbl">
                                    <MdAdd className="d_flex file_add_icn" />
                                </label>
                                {/* <VscDeviceCameraVideo />
                                <IoCallOutline /> */}
                                <BsMic />

                                <Button type="submit" className='pe-0'>
                                    <span className='chatIn-send'>
                                        <BsArrowRight />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </Form >

                </Card >

                {/* {show ?
                    <Card className="chatmain participants">
                        <CardContent className="chatting">
                            <div className="chatting_header d-flex align-items-start justify-content-between">
                                <p className="mb-0">Participants</p>
                                <span className="add_icn"><MdAdd /></span>
                            </div>
                            <div className="d-flex justify-content-end mt-5">
                                <Link className="view_all_link">View all <BsArrowRight className='text-pink' /></Link>
                            </div>
                        </CardContent>
                    </Card> : ''} */}
            </div>
        </>
    );
}
export default React.memo(ChatCard);