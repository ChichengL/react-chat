import { Button, message } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRoute } from '@/services/AllRoutes';
import axios from 'axios';
import { setAvatarRoute } from '@/services/AllRoutes';
import { Buffer } from 'buffer';
import style from './index.module.scss';

const api = 'https://api.multiavatar.com/456789';

const getRandomUsername = () =>
  `${Math.round(Math.random() * 10000)}@example.com`;

export default () => {
  const navigate = useNavigate();
  const [avatars, setAvatars] = React.useState<Buffer[]>([]);
  const [selectedAvatar, setSelectedAvatar] = React.useState<number>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!localStorage.getItem('chatRoomUser')) {
      navigate('/login');
    }
  });
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      message.error('请选择头像');
      return;
    } else {
      const user = JSON.parse(localStorage.getItem('chatRoomUser') as string);
      console.log(user);
      const { data } = await axios.post(`${setAvatarRoute}/${user.id}`, {
        image: avatars[selectedAvatar]
      });
      if (data.code == 200) {
        user.avatarImage = avatars[selectedAvatar];
        user.isAvatarImage = true;
        localStorage.setItem('chatRoomUser', JSON.stringify(user));
        message.success('头像设置成功');
        navigate('/');
      } else {
        message.error('头像设置失败,请稍后再试');
      }
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const data: any[] = [];
      for (let i = 1; i <= 4; i++) {
        const image = await axios.get(`${api}/${getRandomUsername()}`);
        const buffer = Buffer.from(image.data, 'binary');

        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={style['container']}>
        <div className="title-container">
          <h1 className="title">挑选一个你喜欢的头像</h1>
        </div>
        <div className={style['avatars']}>
          {isLoading === false ? (
            avatars.map((avatar, index) => {
              return (
                <div
                  className={`${style['avatar']} ${selectedAvatar === index ? style['selected'] : ''}`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="头像"
                    onClick={() => setSelectedAvatar(index)}
                    className={style['img']}
                  />
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <Button
          className={style['submit-btn']}
          onClick={() => setProfilePicture()}
        >
          保存作为头像
        </Button>
      </div>
    </>
  );
};
