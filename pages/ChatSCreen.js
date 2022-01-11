import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import { db } from '../firebase';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';
import Message from './component/Message';
import ArticleIcon from '@mui/icons-material/Article';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import firebase from 'firebase';
import Timeago from 'timeago-react';
import { useRef } from 'react';
import getRecipientEmail from '../util/getRecipientEmail';

function ChatSCreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const end = useRef(null);
  const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'));
  const [input, setInput] = useState('');
  const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(chat.users, user)));

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => <Message key={message.id} user={message.user} message={message} />);
    }
  };
  const scroll = () => {
    end.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  function sendMessage(e) {
    e.preventDefault();
    db.collection('users').doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput('');
    scroll();
  }
  const recipient = recipientSnapshot?.doc?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);
  return (
    <Container>
      <Header>
        {recipient ? <Avatar src={recipient?.photoURL} /> : <Avatar>{recipientEmail[0]}</Avatar>}
        <HeaderInformation>
          <p className="font-bold text-white">{recipientEmail}</p>
          {recipientSnapshot ? (
            <p>last active : {recipient?.lastSeen?.toDate() ? <Timeago datetime={recipient?.lastSeen?.toDate()} /> : 'unavaileble '}</p>
          ) : (
            <p>loading last active . .. </p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <ArticleIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={end} />
      </MessageContainer>
      <InputContainer>
        <AppsIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Kirim
        </button>
      </InputContainer>
    </Container>
  );
}

export default ChatSCreen;
const Input = styled.input`
  flex: 1;
  align-items: center;
  border-radius: 10px;
  padding: 10px 10px;
  position: sticky;
  background-color: whitesmoke;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
const Container = styled.div`
  width: 100%;
`;
const Header = styled.div`
  position: sticky;
  background-color: #34b4eb;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
`;
const HeaderIcons = styled.div`
  display: flex;
`;
const EndOfMessage = styled.div``;
const IconButton = styled.div``;
const MessageContainer = styled.div`
  background-color: #e5ded8;
  height: 90vh;
  overflow: auto;
`;
