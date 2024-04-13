import React, { FC } from 'react';
import Picker from '@emoji-mart/react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import './sass/chatInput.scss';
import data from '@emoji-mart/data';

interface IProps {
  handleSendMsg: (msg: string) => void;
}

/**
 * @author
 * @function @chatInput
 **/

const chatInput: FC<IProps> = (props) => {
  const { handleSendMsg } = props;
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const handleEmojiClickHiden = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (data: { native: string }) => {
    setMsg(msg + data.native);
    setShowEmojiPicker(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <div className="chatInput-container">
      <div className="button-container">
        <div className="emoji">
          {showEmojiPicker && (
            <Picker
              data={data}
              onEmojiSelect={handleEmojiClick}
              className="emoji-picker"
            />
          )}
          <BsEmojiSmileFill
            onClick={handleEmojiClickHiden}
            className={showEmojiPicker ? 'show' : ''}
          />
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          placeholder="请输入消息"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default chatInput;
