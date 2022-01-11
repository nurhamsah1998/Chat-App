import Sidebar from '../component/Sidebar';
import ChatSCreen from '../ChatSCreen';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import getRecipientEmail from '../../util/getRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);

  return (
    <div className="flex">
      <title>chat with {getRecipientEmail(chat.users, user)}</title>
      <Sidebar />
      <ChatSCreen chat={chat} messages={messages} />
    </div>
  );
}

export default Chat;
export async function getServerSideProps(context) {
  const ref = db.collection('chats').doc(context.query.id);
  const messagesRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
