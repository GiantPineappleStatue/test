import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import clsx from 'clsx';
import Button from '../UI/Button/Button';
import { useRouter } from 'next/router';
import VideoPlayer from '../UI/VideoPlayer/VideoPlayer';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
export default function WelcomeAlert({show,setShow}) {
    
    const history = useRouter();
    const handleSign = (value) => {
        history.push('/signup');
    };
    return (
        <ClickAwayListener onClickAway={()=>setShow(false)}>
        <div
            style={{
                zIndex: 100,
                position: 'absolute',
                margin: 'auto',
                top: '12%',
                left: '20%',
                width: '70%'
            }}
            className={`mobile-alert d-none   ${clsx({
                'd-none': show === false,
                'd-md-block': show === true
            })} display-block `}
            tabIndex="10">
            <P1
                onClick={() => setShow(false)}
                className="text-white pointer mr-4 mt-2 close float-right">
                &times;
            </P1>
            <div className="container ">
                <div className="d-flex flex-column justify-content-center">
                    <div className="my-2" style={{ width: '250px', margin: 'auto' }}>
                        <Img
                            className="mx-auto"
                            style={{ width: '100%' }}
                            src={'/img/artbot-logo.png'}
                            alt="artbot"
                        />
                    </div>
                    <P1 className="h4 my-1 mx-5 text-white text-center">
                        A Better Home for Creators and Their Fans
                    </P1>
                    <div className="row my-2">
                        <div className="col-1" />
                        <div className="col-10">
                            <VideoPlayer
                                src={
                                    'https://gateway.pinata.cloud/ipfs/QmbjgQW8BD3wXEjvnW9ji7KBqEQmPJrvVCR1nG93KvjwL1'
                                }
                                poster={'/img/HD-1920-1080-min.jpg'}
                            />
                        </div>
                        <div className="col-1" />
                    </div>
                    <P1 className=" mt-2 mb-0 text-light font-weight-bold font-14 text-center">
                        Early adopters will receive 100% of their earned revenue
                    </P1>
                    <P1 className=" mb-2 text-light font-weight-bold font-14 text-center">
                        until at least October 2021. ArtBot will take 0%
                    </P1>
                    <div className="d-flex justify-content-center my-2">
                        <Button onClick={handleSign} className="btn btn-primary rounded-10 ">
                            Secure your 100%
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        </ClickAwayListener>
    );
}
