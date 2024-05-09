import React, { useState, useEffect, useRef } from 'react';
import './sass/messages.scss';
import { v4 as uuidv4 } from 'uuid';

interface IMessage {
  id: string;
  senderId: string;
  text: string;
}

interface IMessagesProps {
  messages: IMessage[];
  from: any;
  to: any;
}

const DEFAULT_VISIBLE_RANGE = [0, 4];

const Messages: React.FC<IMessagesProps> = ({ messages, from, to }) => {
  const [visibleRange, setVisibleRange] = useState(DEFAULT_VISIBLE_RANGE);

  // 创建一个共享的IntersectionObserver实例
  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 只在组件挂载时创建一次IntersectionObserver实例
    if (!intersectionObserver.current) {
      intersectionObserver.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') as string, 10);
            const endIndex = Math.min(index + visibleRange[1] - visibleRange[0], messages.length - 1);
            setVisibleRange([index, endIndex]);
          }
        });
      }, {
        rootMargin: '0px',
        threshold: 1.0
      });
    }
  }, [messages, visibleRange]);

  const Row = ({ index }: { index: number }) => {
    const message = messages[index];
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // 添加观察器
      if (messageRef.current && intersectionObserver.current) {
        intersectionObserver.current.observe(messageRef.current);
      }

      // 清理函数：移除观察器
      return () => {
        if (messageRef.current && intersectionObserver.current) {
          intersectionObserver.current.unobserve(messageRef.current);
        }
      };
    }, [messageRef, intersectionObserver]);

    return (
      <div
        ref={messageRef}
        data-index={index}
        className={`message ${message.senderId === from.id ? 'sender' : 'receiver'}`}
      >
        <div className="content">
          <p>{message.text}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="chat-messages">
      {messages.slice(visibleRange[0], visibleRange[1] + 1).map((_, index) => (
        <Row key={messages[index].id} index={index} />
      ))}
    </div>
  );
};

export default Messages;