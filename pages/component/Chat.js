import { Avatar } from '@mui/material';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import getRecipientEmail from '../../util/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import { useRouter } from 'next/router';

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipientEmail(users, user)));
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  const recipientEmail = getRecipientEmail(users, user);
  return (
    <div onClick={enterChat} className="flex  mt-3 items-center p-2 hover:bg-slate-400 cursor-pointer sticky duration-300">
      {recipient ? <UserAvatar src={recipient?.photoURL} /> : <UserAvatar>{recipientEmail[0]}</UserAvatar>}
      <div className=" ">
        <p className="ml-5">{recipientEmail}</p>
      </div>
    </div>
  );
}

export default Chat;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
`;
