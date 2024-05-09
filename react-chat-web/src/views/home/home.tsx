import React from 'react';
import { Layout, Menu, Input } from 'antd';
import style from './index.module.scss';
//@ts-ignore
import { menuItems } from '@/const/menu.tsx';
import { SearchOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router';
//@ts-ignore
import Avatar from '@/components/avatar.tsx';
import axios from '@/services/request';

import { allUsersRoute, host } from '@/services/AllRoutes';
import Contacts from '@/components/contacts';
import { io, Socket } from 'socket.io-client';

const { Content, Sider } = Layout;
export const CustomContext = React.createContext<{ socket: Socket | null }>({
  socket: null
});

export default (): React.ReactElement => {
  const [selectedKeys, setSelectedKeys] = React.useState(['/home/chat']);
  const [contacts, setContacts] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const navigate = useNavigate();
  const socketRef = React.useRef(null);
  React.useEffect(() => {
    if (!localStorage.getItem('chatRoomUser')) {
      navigate('/login');
    } else {
      setCurrentUser(
        JSON.parse(localStorage.getItem('chatRoomUser') as string)
      );
    }
  }, []);
  React.useEffect(() => {
    async function fetchConcats() {
      if (currentUser) {
        if (currentUser.isAvatarImage) {
          const { data } = await axios.get(
            `${allUsersRoute}/${currentUser.id}`
          );
          setContacts(data.users);
        } else {
          navigate('/setAvatar');
        }
        // 连接socket
        if (!socketRef.current) {
          socketRef.current = io(host) as any;
          (socketRef.current as any).emit('add-user', currentUser.id);
        }
      }
    }
    fetchConcats();
    return () => {
      if (socketRef.current) {
        (socketRef.current as any).disconnect();
      }
    };
  }, [currentUser]);
  const handleClickMenu = ({ key }: { key: string }) => {
    navigate(key);
    setSelectedKeys([key]);
  };
  const handleClickFriend = (item: any) => {
    navigate('/home/chat', {
      state: { friend: item }
    });
  };
  return (
    <Layout className={style['layout']}>
      <Sider width="8%" className={style['left-side']}>
        <Avatar currentUser={currentUser} />
        <Menu
          theme="light"
          mode="inline"
          className={style['menu']}
          onClick={handleClickMenu}
          items={menuItems}
          selectedKeys={selectedKeys}
        />
      </Sider>
      <Layout className={style['right-side']}>
        <Sider className={style['center-side']}>
          <div className={style['header']}>
            <Input
              addonBefore={<SearchOutlined className={style['search']} />}
              placeholder="搜索"
            ></Input>
          </div>
          <div className={style['content']}>
            <Contacts friends={contacts} handleClickFriend={handleClickFriend} />
          </div>
        </Sider>
        <Content className={style['content']}>
          {/* 根据路由展示*/}
          <CustomContext.Provider value={{ socket: socketRef.current }}>
            <Outlet />
          </CustomContext.Provider>
        </Content>
      </Layout>
    </Layout>
  );
};
