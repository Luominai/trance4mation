import Image from "next/image"

type User = {
    name: string,
    icon: string,
    id: number
}


export default function Circle() {
    const people: User[] = [
        {name: "John", icon: "/vercel.svg", id: 0},
        {name: "Jane", icon: "/window.svg", id: 1},
        {name: "Jerry", icon: "/next.svg", id: 2}
    ]
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            {people.map((person, index) => {
                const radius = 100
                const rotation = (2 * Math.PI / people.length) * index 
                const x = Math.round(Math.cos(rotation) * radius)
                const y = Math.round(Math.sin(rotation) * radius)
                
                // Hey Tailwind I need these classes please
                // translate-x-10 translate-y-10 -translate-x-10 -translate-y-10
                const translateX = (x > 0) ? `translate-x-${x}` : `-translate-x-${-x}` 
                const translateY = (y == 0) ? `translate-y-1` : (y > 0) ? `translate-y-${y}` : `-translate-y-${-y}` 
                
                return (
                    <div className={`transform rounded-full bg-blue-500 size-16 absolute ${translateX} ${translateY}`}>
                        {/* <Person person={person} key={person.id}/> */}
                    </div>
                )
            })}
        </div>
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