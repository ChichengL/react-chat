import React from 'react';
import './sass/messages.scss';
import { v4 as uuidv4 } from 'uuid';

interface IMessagesProps {
  messages: any[];
  from: any;
  to: any;
}

export default function messages({ messages, from, to }: IMessagesProps) {
  // console.log(messages);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    console.log('messages改变了', ref);
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  }, [messages]);
  return (
    <div className="chat-messages" >
      {messages.map((message, index) => (
        <div key={uuidv4()}>
          <div
            className={`message ${message.senderId === from.id ? 'sender' : 'receiver'}`}
            key={message.id}
          >
            <div className="content">
              <p>{message.text}</p>
            </div>
          </div>
        </div>
      ))}
      <span ref={ref}></span>
    </div>
  );
}
