'use client'

import Image from "next/image"
import { useState } from "react"

type User = {
    name: string,
    icon: string,
    id: number
}

const defaultPeople: User[] = [
    {name: "John", icon: "/vercel.svg", id: 0},
    {name: "Jane", icon: "/window.svg", id: 1},
    {name: "Jerry", icon: "/next.svg", id: 2}
]


export default function Circle() {
    const [people, setPeople] = useState<User[]>(defaultPeople)

    function addPerson() {
        
    }

    function removePerson() {
        
    }

    return (
        <>
        <div className="h-screen w-screen flex items-center justify-center">
            {people.map((person, index) => {
                const radius = 100
                const rotation = -Math.PI / 2 + (2 * Math.PI / people.length) * index 
                const x = Math.round(Math.cos(rotation) * radius)
                const y = Math.round(Math.sin(rotation) * radius)
                
                return (
                    <div style={{
                        transform: `translate(${x}px, ${y}px)`,
                        position: "absolute"
                    }}>
                        <Person person={person} key={person.id}/>
                    </div>
                )
            })}
        </div>
        <div className="flex justify-center">
            <button className="w-32 bg-green-500" onClick={addPerson}>
                Add Person
            </button>
            <button className="w-32 bg-red-500" onClick={removePerson}>
                Remove Person
            </button>
        </div>
        </>
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