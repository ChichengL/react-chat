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
    //虚拟列表进行优化,每个子项不定高,只渲染可见区域的子项,减少渲染压力
    const [visibledRange,setVisibledRange] = React.useState([0, 6]); //可见区域的起始索引和结束索引
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { 
                const index = parseInt(entry.target.getAttribute('data-index') as string, 10);
                if (index >= visibledRange[1]) {
                    // 加载更多
                    setVisibledRange([visibledRange[0]+6, visibledRange[1] + 6])                  
                } else {
                    // 继续加载
                    
                }
            }
        })
    })
    React.useEffect(() => { 
        
    },[])
  return (
    <div className="chat-messages" >
      {messages.map((message, index) => (
        <div key={uuidv4()} data-index={index}>
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

//虚拟列表优化
const HOC = (Component: any) => {
    
}