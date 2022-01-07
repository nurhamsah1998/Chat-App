import { Avatar, Button, IconButton } from '@mui/material';
import styled from 'styled-components';
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Btn from './Button';
import * as EmailValidator from 'email-validator';

function Sidebar() {
  function createChat() {
    const input = prompt('opo ?');
    if (!input) return null;
    if (EmailValidator.validate(input)) {
    }
  }
  return (
    <Container>
      <Header>
        <UserAvatar />
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
    </Container>
  );
}

export default Sidebar;
const Container = styled.div`
  width: 300px;
`;
const SearchInput = styled.input`
  flex: 1;
  padding: 5px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
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
