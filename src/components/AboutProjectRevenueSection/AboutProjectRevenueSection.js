import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Circle from 'react-circle';
import Img from '../UI/Img/Img';
import Span from '../UI/Span/Span';

export default () => (
    <div className="">
        {/** Revenue Details */}
        <div className="p-4 b-primary">
            <Typography variant="body1" component="p" className="text-center pb-4  text-white">
                Projected Revenue
            </Typography>
            <div className="row">
                <div className="col-5">
                    <div className="d-flex justify-content-around align-items-center">
                        <Img
                            src={require('../../../img/youtube-1.png')}
                            width="40"
                            height="40"
                            alt="logo"
                        />{' '}
                        <Typography variant="body2" component="p" className=" text-white">
                            Youtube
                        </Typography>
                    </div>
                    <div className="mt-3 mx-auto rounded-pill p-2 text-white text-center b-tertiary-light">
                        <Span className="red">USD 0</Span>
                    </div>
                </div>
                <div className="col-2   ">
                    <div className="d-flex justify-content-center align-items-center">
                        <div
                            style={{
                                borderLeft: '1px solid #eeeeee61',
                                height: '50px',
                                width: '5px',
                                left: '50%',
                                top: '50%'
                            }}
                        />
                    </div>
                </div>
                <div className="col-5">
                    <div className="d-flex justify-content-around align-items-center">
                        <Img
                            src={require('../../../img/artbot-1.png')}
                            width="40"
                            height="40"
                            alt="logo"
                        />{' '}
                        <Typography variant="body2" component="p" className=" text-white">
                            ArtBot
                        </Typography>
                    </div>
                    <div className="mt-3 mx-auto rounded-pill p-2 text-white text-center b-tertiary-light">
                        <Span>USD 0</Span>
                    </div>
                </div>
            </div>
        </div>
        <div className="b-secondary pt-2 pb-3 text-white px-3">
            <div className="d-flex  align-items-center">
                <Circle
                    progress={35}
                    size={50}
                    showPercentageSymbol={false}
                    textStyle={{
                        font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                    }}
                    lineWidth={40}
                    progressColor="#1ba8ff"
                    bgColor="#008cce"
                    textColor="#1ba8ff"
                />
                <Typography variant="body2" className="pl-3" component="p">
                    No of unique viewers
                </Typography>
            </div>
            <div className="d-flex py-2 align-items-center">
                <Circle
                    progress={80}
                    size={50}
                    showPercentageSymbol={false}
                    textStyle={{
                        font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                    }}
                    lineWidth={40}
                    progressColor="#5fbc13"
                    bgColor="#479f00"
                    textColor="#5fbc13"
                />
                <Typography variant="body2" className="pl-3" component="p">
                    Total mintues watched
                </Typography>
            </div>
            <div className="d-flex align-items-center">
                <Circle
                    progress={55}
                    size={50}
                    showPercentageSymbol={false}
                    textStyle={{
                        font: 'bold 5rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                    }}
                    progressColor="#8f5aff"
                    bgColor="#6c27ff"
                    textColor="#8f5aff"
                    lineWidth={40}
                />
                <Typography variant="body2" className="pl-3" component="p">
                    Total views
                </Typography>
            </div>
        </div>
    </div>
);
