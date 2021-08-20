
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
export default function index() {
    const router = useRouter()
    async function addMeetupHandler(enteredData){
        const response = await fetch("/api/new-meetup",{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {'Content-Type' : 'application/json'}
        })
        try{
            const data = await response.json();
            console.log(data)
        }catch(err){
            console.log(err)
        }
      router.push('/')
    }
    return (
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    )
}
