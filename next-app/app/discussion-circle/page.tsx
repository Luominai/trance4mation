'use client'

import Image from "next/image"
import { useState } from "react"

type User = {
    name: string,
    icon: string,
    id: number
}

type Message = {
    text: string,
    sender: User
}

const defaultPeople: User[] = [
    {name: "John", icon: "/vercel.svg", id: 0},
    {name: "Jane", icon: "/window.svg", id: 1},
    {name: "Jerry", icon: "/next.svg", id: 2},
    {name: "Joe", icon: "/vercel.svg", id: 3},
    {name: "Jill", icon: "/window.svg", id: 4},
]

const defaultMessages: Message[] = [
    {text: "i am john", sender: defaultPeople[0]},
    {text: "jane am i", sender: defaultPeople[1]},
    {text: "Donec efficitur mattis nibh nec gravida. Phasellus varius lorem vel turpis convallis scelerisque. Maecenas cursus, magna non pulvinar mattis, justo metus auctor diam, ut faucibus felis felis in augue. Phasellus consequat, justo id bibendum volutpat, orci urna finibus sapien, nec lacinia lacus est eu metus. Proin nunc nulla, luctus ac turpis eu, bibendum facilisis nisi. Proin dui mauris, euismod non neque quis, volutpat eleifend velit. Duis feugiat sapien dui, et lobortis ex iaculis non. Proin feugiat non sapien eget lacinia. Nunc cursus turpis magna, quis scelerisque ex tempus nec. Aenean ac placerat diam. Praesent eleifend dui mi, nec gravida ex lobortis id. ", 
        sender: defaultPeople[2]}
]


export default function DiscussionCircle() {
    const [people, setPeople] = useState<User[]>(defaultPeople)
    return (
        <div className="flex flex-row h-screen">
            {/* <Sidebar/> */}
            <div className="flex">
                {/* <div className="flex flex-col grow">
                    <RoomNavigation/>
                    <div className="flex grow">
                        <Circle/>
                    </div>
                </div> */}
                
                <div className="grow flex flex-col justify-end">
                    <DiscussionTopic topic={"Placeholder for topic"}/>
                    <ChatLog/>
                    <div style={{
                        height: "80px",
                        marginTop: "50px"
                        // marginBottom: "-40px"
                    }}>
                        <Carousel users={people}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Circle() {
    const [participants, setParticipants] = useState<User[]>(defaultPeople)
    const [speaker, setSpeaker] = useState<User | null>(defaultPeople[0])

    const radius = 100
    const rotationStep = (2 * Math.PI) / (participants.length - 1)
    let rotation = -Math.PI / 2

    const translations = participants.map((participant) => {
        if (participant === speaker) {
            return {x: 0, y: 0}
        }
        else {
            const x = Math.round(Math.cos(rotation) * radius)
            const y = Math.round(Math.sin(rotation) * radius)
            rotation += rotationStep
            return {x: x, y: y}
        }
    })

    return (
        <>
        <div className="flex items-center justify-center grow" style={{position: "relative"}}>
            {participants.map((participant, index) => {
                const translation = translations[index]
                
                return (
                    <div key={participant.id} style={{
                        position: "absolute",
                        top: `${20 * index}%`,
                    }}>
                        <div style={{transform: `translate(0%, -50%)`}}>
                            <Person person={participant}/>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}


function Carousel({users}: {users: User[]}) {    
    const radius = 100

    return (
        <div style={{
            perspective: "1000px",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            alignItems: "center"
        }}>
            {users.map((user, index) => {
                const zIndex = (index < users.length / 2) ? (-index) : -(users.length - index)
                return (
                    <div style={{
                        transformStyle: "preserve-3d",
                        zIndex: zIndex
                    }}>  
                        <div style={{
                            position: "absolute",
                            transformStyle: "preserve-3d",
                            zIndex: (index < users.length / 2) ? (-index) : -(users.length - index),
                            transform: `translate(-50%, ${(-150 / users.length) * -zIndex}%)`
                        }}>
                            <div style={{
                                transformStyle: "preserve-3d",
                                transform: `rotateY(${ (360 / users.length) * index}deg)`
                            }}>
                                    
                                <div style={{
                                    transformStyle: "preserve-3d",
                                    transform: `translateZ(${radius}px)`
                                }}>
                                    <div style={{
                                        transformStyle: "preserve-3d",
                                        transform: `rotateY(${ (-360 / users.length) * index}deg)`
                                    }}>
                                        <Person person={user}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function RoomNavigation() {
    return (
        <input
        type="text"
        placeholder="Room Id"
        className="bg-blue-200 rounded-full text-base p-1 px-2"
        >
        </input>
    )
}

function DiscussionTopic({topic}: {topic: string}) {
    return (
        <div className="font-bold text-xl text-center">
            {topic}
        </div>
    )
}

function ChatLog() {
    const [messages, setMessages] = useState<Message[]>(defaultMessages)
    return (
        <div className="flex flex-col gap-2 mx-2 bg-blue-100 p-2 grow justify-end">
            <div className="flex flex-col gap-2 items-start">
                {messages.map((message) => <ChatMessage message={message}/>)}
            </div>
            <ChatInput/>
        </div>
    )
}

function ChatMessage({message}: {message: Message}) {
    return (
        <div className="bg-blue-300 rounded-sm p-1 px-2">
            {message.text} - {message.sender.name}
        </div>
    )
}

function ChatInput() {
    return (
        <input
        type="text"
        placeholder="Message"
        className="bg-blue-200 rounded-full text-base p-1 px-2"
        >
        </input>
    )
}

function Person({person} : {person: User}) {
    return (
        <div className="rounded-full bg-blue-500 size-16 place-content-center flex">
            <Image
                className="dark:invert"
                src={person.icon}
                alt="Next.js logo"
                width={40}
                height={40}
                priority
            />
        </div>
    )
}