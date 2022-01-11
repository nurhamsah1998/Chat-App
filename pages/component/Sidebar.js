import { Avatar, Button, IconButton } from '@mui/material';
import styled from 'styled-components';
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Btn from './Button';
import firebase from 'firebase';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Chat from './Chat';
import { useCollection } from 'react-firebase-hooks/firestore';
import ChatSCreen from '../ChatSCreen';
function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  function createChat() {
    const input = prompt('opo ?');
    if (!input) return null;
    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      db.collection('chats').add({
        users: [user.email, input],
      });
    }
  }

  function chatAlreadyExists(recipientEmail) {
    !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0);
  }
  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <MessageIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Wanna Search?" />
      </Search>
      <Btn o={createChat}></Btn>
      <div className=" overflow-hidden">
        {chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users}></Chat>
        ))}
      </div>
    </Container>
  );
}

export default Sidebar;
const Container = styled.div`
  overflow-y: scroll;
  min-width: 400px;
  height: 100vh;
  border-right: 5px solid #ffff;
`;
const SearchInput = styled.input`
  flex: 1;
  padding: 5px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  background-color: #34b4eb;
  top: 0px;
  height: 80px;
  z-index: 1;
  border-bottom: 1px solid whitesmoke;
  align-items: center;
  padding: 0px 15px;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
`;
const IconsContainer = styled.div``;
const Search = styled.div`
  display: flex;
  padding: 0px 15px;
  align-items: center;
`;
