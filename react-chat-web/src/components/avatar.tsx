import React from 'react';

const Avatar: React.FC<any> = ({ currentUser }: any) => {
  const [avatarImage, setAvatarImage] = React.useState(undefined);
  React.useEffect(() => {
    if (currentUser) {
      setAvatarImage(currentUser.avatarImage);
    }
  }, [currentUser]);
  return (
    <div
      style={{
        height: '50px'
      }}
    >
      <img
        src={`data:image/svg+xml;base64,${avatarImage}`}
        alt="Avatar"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
      />
    </div>
  );
};

export default Avatar;
