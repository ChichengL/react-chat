import React from 'react';
import './sass/messages.scss';
interface IMessagesProps {
  messages: any[];
  from: any;
  to: any;
}

export default function messages({ messages, from, to }: IMessagesProps) {
  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div
          className={`message ${message.senderId === from.id ? 'sender' : 'receiver'}`}
          key={message.id}
        >
          <div className="content">
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
