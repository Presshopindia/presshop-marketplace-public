import * as React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { BsArrowRight, BsMic, BsPause, BsPlay } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import { Get, Post } from "../services/user.services";
import moment from "moment";
import socketInternal from "../InternalSocket";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { ReactMic } from "react-mic";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import { useDarkMode } from "../context/DarkModeContext";

function Chatinternal(props) {
    const [isRecording, setIsRecording] = useState(false)
    const [audioURL, setAudioURL] = useState("");
    const [msg, setMsg] = useState("");
    const [message, setMessage] = useState([]);

    const [mediaFile, setMediaFile] = useState({ path: '', type: '' })

    const [show, setShow] = useState(false);
    const target = useRef(null);
    const [show1, setShow1] = useState(false);
    const handleClose = () => setShow1(false);
    const [bigData, setBigData] = useState('')
    const handleShow = (curr) => { setBigData(curr?.message), setShow1(true); }
    const handleClosePreview = () => setPreview((pre) => ({ ...pre, modalOpen: false }))
    const [preview, setPreview] = useState({ type: '', path: "", modalOpen: false, })

    const { profileData } = useDarkMode();
    const userImage = profileData?.hasOwnProperty("admin_detail") ? profileData?.admin_detail?.admin_profile
    : profileData?.profile_image

    const onStartRecording = () => {
        setIsRecording(true);
    };


    const onStopRecording = async (recordedBlob) => {
        setIsRecording(false);
        try {
            const formData = new FormData();
            formData.append('path', 'profileImg');
            formData.append('media', recordedBlob?.blob);
            const filePath = await Post('mediaHouse/uploadUserMedia', formData);
            if (filePath) {
                // console.log(filePath, `<<<<<uploaded audio file path`);
                setMediaFile((prev) => ({
                    ...prev,
                    path: filePath?.data?.path,
                    type: 'audio'
                }));
            }
        } catch (error) {
            console.error("Error uploading audio:", error);
        }
    };

    const handleChange = async (event) => {
        const file = event.target.files[0];
        if (file.type.startsWith('video/')) {
            // console.log("video")
            setMediaFile((pre) => ({ ...pre, type: 'video' }))
            setPreview((pre) => ({ ...pre, type: 'video' }))
        } else if (file.type.startsWith('image/')) {
            // console.log("image")
            setMediaFile((pre) => ({ ...pre, type: 'image' }))
            setPreview((pre) => ({ ...pre, type: 'image' }))

        } else if (file.type.startsWith('audio/')) {
            setMediaFile((pre) => ({ ...pre, type: 'audio' }))
            setPreview((pre) => ({ ...pre, type: 'image' }))
        }
        const Formdata = new FormData()
        Formdata.append('path', 'profileImg')
        Formdata.append('media', file)
        const filePath = await Post('mediaHouse/uploadUserMedia', Formdata);
        if (filePath) {
            setMediaFile((pre) => ({ ...pre, path: filePath?.data?.path }))
            setPreview((pre) => ({ ...pre, path: filePath?.data?.path }))
            setPreview((pre) => ({ ...pre, modalOpen: true }))
        }
    }

    const chatBoxRef = React.useRef(null);

    const scrollToBottom = () => {
        // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    };

    useEffect(() => {
        socketInternal.emit('room join', { room_id: props?.room_id });
        socketInternal.on("internal group chat", (data) => {
            const newMessage = data;
            setMessage((prevMessages) => [...prevMessages, newMessage]);
            scrollToBottom();
        });
        return () => {
            socketInternal.emit('room leave', { room_id: props?.room_id });
            socketInternal.off("internal group chat");
        };
    }, [socketInternal, props?.room_id]);

    // chat messages list
    const handleButtonClick = (e) => {
        e.preventDefault();
        let messages = {
            sender_id: props.user_id,
            room_id: props?.room_id,
            message: mediaFile?.path ? mediaFile?.path : msg,
            type: mediaFile?.type ? mediaFile?.type : 'text',
            user_info: {
                profile_image: userImage,
                first_name: profileData?.first_name,
                last_name: profileData?.last_name,
            },
        };
        socketInternal.emit('internal group chat', messages);
        setMsg('');
        setMediaFile({
            path: '',
            type: ''
        })
        setPreview((pre) => ({ ...pre, modalOpen: false }))
    };
    const ChatList = async () => {
        try {
            const resp = await Get(`mediaHouse/openChatsMH?room_id=${props?.room_id}`);
            if (resp) {
                setMessage(resp?.data?.response?.data);
                scrollToBottom();
            }
        } catch (error) {
            // Handle errors
        }
    };

    useEffect(() => {
        ChatList();
    }, [props?.room_id]);


    return (
        <>
            {/* {console.log(mediaFile, `<<<<<<media file`)} */}
            <div className="d-flex flex-row gap_20">
                <Card className="chatmain cht_ht">
                    <CardContent className="chatting">
                        <div className="chatting_header">
                            <p className="mb-0">
                                {/* Presshop chat */}
                                Internal Chat
                            </p>
                        </div>
                        {/* {console.log("message121231", message)} */}
                        <div className="chat_msgs_scrl" ref={chatBoxRef}>
                            {
                                message && message?.filter((curr) => curr.type !== "add")?.map((curr) => {
                                    return (

                                        <div className="chatting_itm d-flex align-items-start" >
                                            {/* <img src={curr?.sender_id?.profile_image || inpimg} alt="User" className="usr_img" /> */}
                                            <img src={curr.user_info ? curr?.user_info?.profile_image : curr?.sender_id?.profile_image} alt="User" className="usr_img" />
                                            <div className="cht_txt">
                                                <div className="d-flex align-items-center">
                                                    <p className="usr_name mb-0">
                                                        {`${curr?.user_info ? curr?.user_info?.first_name : curr?.sender_id?.first_name} 
                                                    ${curr?.user_info ? curr?.user_info?.last_name : curr?.sender_id?.last_name}`}
                                                    </p>
                                                    <p className="cht_time mb-0">{moment(curr?.createdAt).format(`hh:mm A`)}</p>
                                                </div>
                                                {/* <img src={presshopchatic} alt="User" className="usr_img" /> */}
                                                <Typography className="comment_text">
                                                    {curr?.type === 'text' && curr?.message}
                                                </Typography>
                                                <div onClick={() => handleShow(curr)} className="exp">
                                                    {curr?.type === 'image' && <img src={curr?.message} className="msgContent" />}
                                                </div>
                                                <div>
                                                    {curr?.type === 'video' && <video src={curr?.message} className="msgContent" controls controlsList="nodownload"></video>}
                                                </div>
                                                <div>
                                                    {curr?.type === 'audio' && <audio src={curr?.message} controls controlsList="nodownload"></audio>}
                                                </div>
                                                {/* <div>
                                                    {curr?.type === "add" ? <p className="usrAddedTxt mb-4">
                                                        <span>You added {curr?.addedMsg}</span>
                                                    </p> : ""}
                                                </div> */}
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </CardContent>
                    <Form onSubmit={handleButtonClick}>
                        <div className="chatting_type position-relative">
                            <img src={userImage} alt="" className="typing_img" />
                            <input type="text" className="inp_msg" value={msg} placeholder="Type here..." onChange={(e) => { setMsg(e.target.value) }} />

                            <div className="chatIn-options">
                                <div className="uplod-mda" >
                                    <MdAdd />
                                    <input type="file" onChange={handleChange} />
                                </div>
                                <div>
                                    <Button ref={target} onClick={() => setShow(!show)}>
                                        <BsMic className="chatMicIcn" />
                                    </Button>
                                    <Overlay target={target.current} show={show} placement="top" className="">
                                        <Tooltip id="overlay-example">
                                            <div className="recordingPopup">
                                                <h5>Record Audio</h5>
                                                <div className="d-flex mt-3 justify-content-evenly">
                                                    <Button className="rec_aud_btn" onClick={onStartRecording} disabled={isRecording}> <BsPlay fontSize={"20px"} /> Start</Button>
                                                    <Button className="rec_aud_btn" onClick={onStopRecording} disabled={!isRecording}> <BsPause fontSize={"20px"} /> Stop</Button>
                                                </div>
                                                <div>
                                                    <ReactMic
                                                        record={isRecording}
                                                        className="sound-wave w-100 my-2"
                                                        onStop={onStopRecording}
                                                    />
                                                </div>
                                                <div className="text-end">
                                                    <button className="sendrecBtn" onClick={(e) => {
                                                        handleButtonClick(e);
                                                        setShow(!show)



                                                    }} >
                                                        Send
                                                    </button>
                                                </div>
                                            </div>
                                        </Tooltip>
                                    </Overlay>
                                </div>

                                <span className="chatIn-send" onClick={handleButtonClick}>
                                    <BsArrowRight />
                                </span>
                            </div>

                        </div>
                    </Form>
                </Card>
            </div>

            {/* Show Image in Chat */}
            <Modal show={show1} onHide={handleClose}
                aria-labelledby="contained-modal-title-hcenter profile_mdl"
                className="modal_wrapper"
                dialogClassName="my-modal adm_reg_mdl mdl_dsn">
                <Modal.Header
                    className="modal-header profile_mdl_hdr_wrap"
                    closeButton>
                    <Modal.Title className="modal-title profile_modal_ttl">
                        <p className="mb-0">Image Preview</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid modal-body border-0">
                    <Container>
                        <div>
                            <img className="mdlPrevImg" src={bigData} />
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer className="border-0 mb-4">
                    <Button
                        className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
                        variant="primary"
                        type="submit">
                        <div className="link_white" onClick={handleClose} >Close</div>
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Show Image in Chat */}
            <Modal show={preview?.modalOpen} onHide={handleClosePreview}
                aria-labelledby="contained-modal-title-hcenter profile_mdl"
                className="modal_wrapper"
                dialogClassName="my-modal adm_reg_mdl mdl_dsn">
                <Modal.Header
                    className="modal-header profile_mdl_hdr_wrap"
                    closeButton>
                    <Modal.Title className="modal-title profile_modal_ttl">
                        <p className="mb-0">Image Preview</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid modal-body border-0">
                    <Container>
                        <div>
                            {preview?.type === "image" ? <img className="mdlPrevImg" src={preview?.path} /> : preview?.type === 'video' ? <video src={preview?.path} className="msgContent" controls></video> : ''}
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer className="border-0 mb-4">
                    <Button
                        className="w-50 m-auto d-inline-block py-2 text-lowercase mdl_btn"
                        variant="primary"
                        type="submit">
                        <div className="link_white" onClick={handleButtonClick}>Send</div>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default React.memo(Chatinternal);
