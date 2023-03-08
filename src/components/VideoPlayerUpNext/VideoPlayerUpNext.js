import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import React from 'react';
import Button from '../UI/Button/Button';
import P1 from '../UI/P1/P1';
let timer;
const VideoPlayerUpNext = () => {
    const [progress, setProgress] = React.useState(0);

    // React.useEffect(()=>{
    //      timer = setInterval(progressHandler,1000);
    //     return ()=>clearInterval(timer)
    // },[])
    const progressHandler = () => {
        setProgress((state) => {
            if (state === 100) {
                clearInterval(timer);
                return 100;
            }
            return state + 20;
        });
        console.log('End', progress);
    };
    return (
        <div className="position-absolute w-100 h-100 video-player-next text-center">
            <P1 className="text-center text-light  my-1 mt-md-5">Up Next</P1>
            <P1 className="text-center text-white mt-md-2 h3">
                Video Title Long Video Title Long Video Title Long
            </P1>
            <div>
                <CircularProgress
                    className="mt-md-3 mt-1 d-inline-block"
                    size={100}
                    variant="static"
                    value={progress}
                />
            </div>
            <Button
                type="button"
                className="btn mt-md-5 btn-outline-secondary d-inline-block text-light bg-transparent">
                Cancel
            </Button>
        </div>
    );
};
export default VideoPlayerUpNext;
