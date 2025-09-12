'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";
import 'dotenv/config'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "fir-test-1ca13.firebaseapp.com",
  projectId: "fir-test-1ca13",
  storageBucket: "fir-test-1ca13.firebasestorage.app",
  messagingSenderId: "1018148176701",
  appId: "1:1018148176701:web:81368d76aee6de84273b54",
  measurementId: "G-VE2F8PH411"
};

console.log(process.env.NEXT_PUBLIC_API_KEY)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)


export default function List() {
    const [data, setData] = useState<DocumentData[]>([])

    useEffect(() => {
        async function getData() {
            const querySnapshot = await getDocs(collection(firestore, "users"));
            const newData: DocumentData[] = []

            querySnapshot.forEach((doc) => {
                newData.push(doc)
                console.log(`${doc.id} => ${doc.data()}`);
            });

            setData(newData)
        }

        getData()
    },[])

    return (
        <>
        <div className="h-screen w-screen flex items-center justify-center">
            {data.map((entry, index) => {
                return (
                    <div key={entry.data().id}>
                        {entry.data().name}
                    </div>
                )
            })}
        </div>
        {/* <div className="flex justify-center">
            <button className="w-32 bg-green-500" onClick={addPerson}>
                Add Person
            </button>
            <button className="w-32 bg-red-500" onClick={removePerson}>
                Remove Person
            </button>
        </div> */}
        </>
    )
}

// function Person({person} : {person: User}) {
//     return (
//         <div className="rounded-full bg-blue-500 size-16 place-content-center flex">
//             <Image
//                 className="dark:invert"
//                 src={person.icon}
//                 alt="Next.js logo"
//                 width={40}
//                 height={40}
//                 priority
//             />
//         </div>
//     )
// }