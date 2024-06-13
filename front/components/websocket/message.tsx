"use client"
import { mokeMessages } from '@/utils/list'
import { messageType } from '@/utils/type'
import React, { useEffect } from 'react'

type propsMessageType = {
    messages: messageType[];
}

const Message: React.FC<propsMessageType> = ({ messages }) => {
    return (
        <div>
            {messages.map((item, index) => (
                <div key={index}>
                    <div className="chat chat-start">
                        <div className="chat-bubble">{item.message}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Message