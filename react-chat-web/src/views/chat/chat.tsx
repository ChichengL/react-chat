import React from 'react';
import { Layout, message as AntdMessage } from 'antd';
const { Header, Content, Footer } = Layout;
import style from './index.module.scss';
import Avatar from '@/components/avatar';
import Logout from '@/components/logout';
import ChatInput from '@/components/chatInput';
import Messages from '@/components/messages';
import { useNavigate,useLocation } from 'react-router';
import axios from 'axios';
import { sendMessgaeRoute, getAllMessagesRoute } from '@/services/AllRoutes';

const chat = (): React.ReactElement => {
    const location = useLocation();
  const currentChat = location.state?.friend;
  const currentUser = JSON.parse(
    localStorage.getItem('chatRoomUser') as string
  );
  const navigate = useNavigate();
  const [messages, setMessages] = React.useState([]);
  const handleSendMsg = async (msg: string) => {
    const from = currentUser.id;
    const to = currentChat.id;
    const { data } = await axios.post(sendMessgaeRoute, {
      from,
      to,
      message: msg
    });
    if (data.code == 200) {
      AntdMessage.success(data.msg);
    } else {
      AntdMessage.error(data.msg);
    }
  };
  const getAllMessages = async () => {
    const { data } = await axios.post(getAllMessagesRoute, {
      from: currentUser.id,
      to: currentChat.id
    });
    setMessages(data.messages);
  };
  React.useEffect(() => {
    console.log('chat currentChat', currentChat);
    if (!currentChat) {
      navigate('/home');
    } else {
      getAllMessages();
    }
  }, [currentChat]);
  React.useEffect(() => {});
  return (
    <Layout className={style['layout']}>
      <Header className={style['chat-header']}>
        <span className={style['chat-header-title']}>
          <Avatar currentUser={currentChat} />
          <h3>{currentChat?.username}</h3>
        </span>
        <Logout />
      </Header>
      <Content className={style['chat-message']}>
        <Messages messages={messages} from={currentUser} to={currentChat} />
      </Content>
      <Footer className={style['chat-input']}>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Footer>
    </Layout>
  );
};

export default chat;
