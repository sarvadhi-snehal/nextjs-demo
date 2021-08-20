import { MongoClient } from 'mongodb';
import Head from 'next/head'

import {useState,useEffect} from 'react'
import MeetupList from '../components/meetups/MeetupList';
import Layout from '../components/layout/Layout';


export default function index(props) {

    return (
     <>
     <Head>
        <head>Meet Up</head>
        <meta name="description" content="meet up app" />
     </Head>
      <MeetupList meetups={props.meetups}/>
    </>
          
    )
}


export async function getStaticProps(){
    const client = await MongoClient.connect('mongodb+srv://root:root123@cluster0.4wkwj.mongodb.net/meetps?retryWrites=true&w=majority')
    const db = client.db();
    const meeupCollection = db.collection("meetups");
    const meetups = await meeupCollection.find().toArray();

    client.close()
    return{
        props: {
            meetups : meetups.map(meetup=>({
                title: meetup.title,
                address : meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
                // discription: meetup.discription,
            }))
        },
   
    }
}
// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
// return {
//     props: {
//         meetup: data
//     }
// }
// }