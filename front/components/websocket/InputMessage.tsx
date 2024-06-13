"use client"

import { messageType } from '@/utils/type';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { IoSend } from 'react-icons/io5';

type propsMessageType = {
    setMessages: React.Dispatch<React.SetStateAction<messageType[]>>;
    messages: messageType[];
}

const InputMessage: React.FC<propsMessageType> = ({ setMessages, messages }) => {
    const socket = useRef<WebSocket | null>(null);

    useEffect(() => {
        socket.current = new WebSocket('ws://localhost:8080');

        socket.current.addEventListener('open', () => {
            console.log('Connected to server');
        });

        socket.current.addEventListener('message', (event) => {
            const reader = new FileReader();
            reader.readAsText(event.data);

            reader.onload = () => {
                const message = { message: reader.result as string };
                setMessages((prevMessages: messageType[]) => [...prevMessages, message]);
            };

            reader.onerror = (error) => {
                console.error('Error reading message:', error);
            };
        });

        return () => {
            socket.current?.close();
        };
    }, [setMessages]); // Notez que messages n'est plus une dépendance ici

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<messageType>();

    const onSubmit = async (data: messageType) => {
        reset();
        if (socket.current) {
            socket.current.send(data.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full rounded-lg h-[40px] mb-4 flex justify-center items-center">
                <div className="w-full flex gap-3 mx-2">
                    <input type="text" placeholder="Ton message...." className="input input-bordered input-success w-full"  {...register("message", {
                        required: true,
                        maxLength: 200,
                    })} />
                    <button type="submit"><IoSend size={30} className="text-primary transition ease-in-out duration-150 active:scale-95" /></button>
                </div>
            </div>
        </form>
    )
}

export default InputMessage;
