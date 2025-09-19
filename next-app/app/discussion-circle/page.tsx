'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

type User = {
    name: string,
    icon: string,
    id: number
}

type Message = {
    text: string,
    sender: User,
    id: number
}

type Room = {
    isAnonymous: boolean,
    numParticipants: number,
    maxParticipants: number,
    colorTheme: string,
    timeLimit: number,
    rounds: number,
    code: string,
    name: string,
    icon: string,
    description: string
}

const defaultPeople: User[] = [
    {name: "John", icon: "/vercel.svg", id: 0},
    {name: "Jane", icon: "/window.svg", id: 1},
    {name: "Jerry", icon: "/next.svg", id: 2},
    {name: "Joe", icon: "/vercel.svg", id: 3},
    {name: "Jill", icon: "/window.svg", id: 4},
]

const defaultMessages: Message[] = [
    {text: "i am john", sender: defaultPeople[0], id: 0},
    {text: "jane am i", sender: defaultPeople[1], id: 1},
    {text: "Donec efficitur mattis nibh nec gravida. Phasellus varius lorem vel turpis convallis scelerisque.", 
        sender: defaultPeople[2], id: 2}
]

const defaultRooms: Room[] = [
    {
        isAnonymous: false,
        numParticipants: 2,
        maxParticipants: 3,
        colorTheme: "idk",
        timeLimit: 10,
        rounds: 3,
        code: "ABCD",
        name: "counseling",
        icon: "/vercel.svg",
        description: "this is a room to talk about school"
    },
    {
        isAnonymous: true,
        numParticipants: 3,
        maxParticipants: 4,
        colorTheme: "idk",
        timeLimit: 5,
        rounds: 3,
        code: "EFGH",
        name: "philosophical cookies",
        icon: "/next.svg",
        description: "this is a room to talk about the meaning of life and also cookie recipes"
    },
    {
        isAnonymous: true,
        numParticipants: 3,
        maxParticipants: 4,
        colorTheme: "idk",
        timeLimit: 5,
        rounds: 3,
        code: "EFGH",
        name: "room 1",
        icon: "/window.svg",
        description: ""
    },
]


export default function DiscussionCircle() {
    const [roomListings, setRoomListings] = useState(defaultRooms)
    const [room, setRoom] = useState<string | null>(null)
    const [people, setPeople] = useState<User[]>(defaultPeople)
    const [collapsed, setCollapsed] = useState(false)
    useEffect(() => {
        function onResize() {
            if (window.innerWidth < 600) {
                setCollapsed(true)
            }
            else {
                setCollapsed(false)
            }
        }
        window.addEventListener("resize", onResize)
        onResize()

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    return (
        <div className="flex flex-row h-screen">
            {(!collapsed) 
            ? 
                <div className="bg-red-200 w-1/4 flex flex-col">
                    <Search/>
                    <div className="flex flex-col grow bg-blue-400 p-1 gap-1">
                        {roomListings.map((room) => <RoomListing room={room} key={room.code}/>)}
                    </div>
                </div> 
            : 
                <></>
            }
            <div className="flex flex-col bg-blue-200 w-3/4 grow">
                <Navbar/>
                <ChatLog/>
                <div style={{
                    height: "80px",
                    marginTop: "50px"
                }}>
                    <Carousel users={people}/>
                </div>
            </div>
        </div>
    )
}

function Navbar() {
    return (
        <div className="bg-blue-400" style={{
            position: "relative",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Image 
            src={"/chevron-right-regular-full.svg"}
            alt="Sidebar"
            width={30}
            height={30}
            priority
            style={{
                position: "absolute",
                left: 0
            }}
            />
            <div className="flex justify-center" style={{width: 0}}>
                <div style={{minWidth: "60vw", textAlign: "center"}}>
                    Room name
                </div>
            </div>
            <Image 
                src={"/right-from-bracket-regular-full.svg"}
                alt="Leave"
                width={30}
                height={30}
                priority
                style={{
                    position: "absolute",
                    right: 0
                }}
            />
        </div>
    )
}

function Search() {
    return (
        <div className="flex w-full bg-blue-300 p-2">
            <input
            type="text"
            placeholder="Room Code"
            className="bg-blue-200 rounded-full text-base p-1 px-2 w-full"
            >
            </input>
            <Image
            src={"/plus-regular-full.svg"}
            alt="Create Room"
            width={30}
            height={30}
            priority
            />
        </div>
    )
}

function RoomListing({room}: {room: Room}) {
    return (
        <div className="flex flex-col bg-blue-200 rounded-md">
            <div className="flex grow-2 bg-blue-100 m-1 rounded-md items-center px-1 gap-2">
                <Image 
                src={room.icon}
                alt="Sidebar"
                width={20}
                height={20}
                priority
                />
                <div className="flex flex-col">
                    <div className="text-base">
                        {room.name}
                    </div>
                    <div className="text-sm">
                        {room.description}
                    </div>
                </div>
            </div>

            <div className="flex grow-1 gap-4">
                <div className="flex items-center w-12">
                    <Image 
                    src={"/user-regular-full.svg"}
                    alt="participants"
                    width={20}
                    height={20}
                    priority
                    />
                    {room.numParticipants}
                    /
                    {room.maxParticipants}
                </div>
                <div className="flex items-center w-12">
                    <Image 
                    src={"/alarm-clock-regular-full.svg"}
                    alt="participants"
                    width={20}
                    height={20}
                    priority
                    />
                    {room.timeLimit}s
                </div>
                <div className="flex items-center w-12">
                    <Image 
                    src={"/rotate-left-regular-full.svg"}
                    alt="participants"
                    width={20}
                    height={20}
                    priority
                    />
                    {room.rounds}
                </div>
            </div>
        </div>
    )
}

function Carousel({users, radius = 100}: {users: User[], radius?: number}) {    
    return (
        <div style={{
            perspective: "1000px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            alignItems: "center"
        }}>
            {users.map((user, index) => {
                const zIndex = (index < users.length / 2) ? (-index) : -(users.length - index)
                return (
                    <div key={user.id} style={{
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

function ChatLog() {
    const [messages, setMessages] = useState<Message[]>(defaultMessages)
    return (
        <div className="flex flex-col gap-2 bg-blue-100 p-2 grow justify-end">
            <div className="flex flex-col gap-2 items-start">
                {messages.map((message) => <ChatMessage message={message} key={message.id}/>)}
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
    const [timerVisible, setTimerVisible] = useState(true)
    const [strokeOffset, setStrokeOffset] = useState(0)
    const [discussionTime, setDiscussionTime] = useState(5)

    useEffect(() => {
        setStrokeOffset(2 * Math.PI * 46)
    })

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
            {timerVisible 
            ?
                <svg 
                style={{
                    position: "absolute",
                    transition: `stroke-dashoffset ${discussionTime}s linear`,
                    transform: "rotateY(-180deg) rotateZ(-90deg)"
                }} 
                viewBox="0 0 100 100" 
                stroke="red" 
                fill="none" 
                strokeWidth={4}
                strokeDasharray={`${2 * Math.PI * 46}px`}
                strokeDashoffset={`${strokeOffset}px`}
                >
                    <circle r={46} cx={50} cy={50}/>
                </svg>
            :
                <></>
            }

        </div>
    )
}