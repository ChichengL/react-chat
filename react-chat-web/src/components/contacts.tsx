import React, { FC } from 'react';
import Avatar from './avatar';
import './sass/contacts.scss';

const Contacts: FC<any> = ({ friends, handleClickFriend }: any) => {
    const [currentSelected, setCurrentSelected] = React.useState<number>();
    const changeCurrentChat = (index: number, contact: any) => {
        setCurrentSelected(index);
        handleClickFriend(contact);
    };
    return (
        <>
            {friends &&
                friends.map((item: any, index: number) => (
                    <div
                        className={`contact-item ${currentSelected === index ? 'active' : ''}`}
                        key={item.id}
                        onClick={() => changeCurrentChat(index, item)}
                    >
                        <Avatar currentUser={item} />
                        <div className="contact-info">
                            <h3>{item.username}</h3>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default Contacts;
