import React from 'react';
import JoinOurWaitlist from '../components/JoinOurWaitlist/JoinOurWaitlist';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button/Button';
import VideoPlayer from '../components/UI/VideoPlayer/VideoPlayer';

const FundingIntro = () =>{
    const [waitList,setWaitlist] = React.useState(false);
    return (
        <Layout>
            <div className="container">
                <JoinOurWaitlist open={waitList} handleClose={setWaitlist} />
                <div className="row">
                    <div className="col-12">
                    <VideoPlayer
                        src={
                            'https://gateway.pinata.cloud/ipfs/QmbjgQW8BD3wXEjvnW9ji7KBqEQmPJrvVCR1nG93KvjwL1'
                        }
                        poster={'/img/mainPageVideoThumbnail.png'}
                    />
                        </div>
                </div>
                <div className="d-flex justify-content-center my-2">
                     <Button className="btn btn-primary btn-inline" 
                     onClick={()=>setWaitlist(!waitList)}
                     >Join Our Waitlist</Button>
                </div>
            </div>
         </Layout>
    )
}

export default FundingIntro;