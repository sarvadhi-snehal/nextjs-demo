import MeetupDetails from "../../components/meetups/MeetupDetails";
import {MongoClient,ObjectId} from 'mongodb'
export default function MeetupDetail(props) {
  return (
    <MeetupDetails
      image={props.meetup.image}
      title={props.meetup.title}
      address={props.meetup.address}
    //   description={props.meetup.description}
    />
  );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://root:root123@cluster0.4wkwj.mongodb.net/meetps?retryWrites=true&w=majority')
    const db = client.db();
    const meeupCollection = db.collection("meetups");
    const meetups = await meeupCollection.find({},{_id:1}).toArray();
    client.close();
  return {
      fallback:false,
    paths:  meetups.map(meetup => ({params: {meetupid : meetup._id.toString()}})),
        
      
     
    
  };
}

export async function getStaticProps(context) {
  let meetupid = context.params.meetupid;

  const client = await MongoClient.connect('mongodb+srv://root:root123@cluster0.4wkwj.mongodb.net/meetps?retryWrites=true&w=majority')
  const db = client.db();
  const meeupCollection = db.collection("meetups");
  const selectedMeetup = await meeupCollection.findOne({_id: ObjectId(meetupid)});
  client.close();
  
  return {
    props: {
      meetup: {
          id: selectedMeetup._id.toString(),
          title: selectedMeetup.title,
          address:selectedMeetup.address,
          image: selectedMeetup.image,
        //   description: selectedMeetup.description
      }
    },
  };
}
