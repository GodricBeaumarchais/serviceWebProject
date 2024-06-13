"use client"

import InputMessage from "./InputMessage"
import Message from "./message"
import { useState } from "react"

const Chatbox = () => {
    const [messages, setMessages] = useState([])

    return (
        <>
            <div className="w-[600px] h-[800px] flex flex-col justify-end relative rounded-lg border-primary border-4 bg-base-300 ">
                <div className="ml-3 overflow-y-auto">
                    <Message messages={messages} />
                </div>

                <div className="mt-3 bg-base-300">
                    <InputMessage setMessages={setMessages} messages={messages} />
                </div>

            </div>
        </>
    )
}

export default Chatbox