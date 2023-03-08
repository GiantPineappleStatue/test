import React from 'react';
import P1 from '../UI/P1/P1';
import Icons from '../UI/ReactIcons/ReactIcons';
import Button from '../UI/Button/Button';
// import { ClickAwayListener, Grow, Paper, Popper, MenuList } from '@material-ui/core';
import PopperUi from '../UI/PopperUI/PopperUI';

export default function VideoUploadAdDetails() {
    const costRef = React.useRef();
    const TotalRef = React.useRef();
    const [open, setOpen] = React.useState(false);
    const [openTwo, setOpenTwo] = React.useState(false);

    return (
        <div className="video-upload-adDetails">
            <P1 className="mb-0 video-upload-adDetails__title text-white text-center ">
                Ad Cost Details
            </P1>
            <div className="my-3 mx-4">
                {/** ad cost */}
                <div className="mb-2  rounded  video-upload-adDetails__cost d-flex justify-content-between">
                    <P1 className="mb-0 text-white">Ad Cost Per View</P1>
                    <div className="video-upload-adDetails__cost-right d-flex align-items-center">
                        <P1 className="mb-0 text-white">50$</P1>
                        <div className="video-upload-adDetails__cost-right--line" />
                        <div ref={costRef} className="pointer" onClick={() => setOpen(!open)}>
                            <Icons.AiOutlineQuestion
                                size={15}
                                color={`#000`}
                                className="bg-white rounded-pill"
                            />
                        </div>
                        <PopperUi
                            className=" video-upload-adDetails__cost--dropdown w-75"
                            open={open}
                            anchorEl={costRef.current}
                            setOpen={() => setOpen(false)}
                            childClassName="p-2">
                            <div className="container">
                                <div className="video-upload-adDetails__cost--dropdown__caret" />
                                <div className="row">
                                    <div className="col-6">
                                        <P1 className="mb-0 text-white text-nowrap font-14">
                                            Video Length
                                        </P1>
                                        <P1 className="mb-0 text-white text-center video-upload-adDetails__cost--dropdown--bg">
                                            04:00
                                        </P1>
                                    </div>
                                    <div className="col-6">
                                        <P1 className="mb-0 text-white text-nowrap font-14">
                                            Video Length
                                        </P1>
                                        <P1 className="mb-0 text-white text-center video-upload-adDetails__cost--dropdown--bg">
                                            04:00
                                        </P1>
                                    </div>
                                </div>
                            </div>
                        </PopperUi>
                    </div>
                </div>
                {/** ad views */}
                <div className="mb-2  rounded  video-upload-adDetails__views d-flex justify-content-between">
                    <P1 className="mb-0 text-white"> Number of views</P1>
                    <P1 className="mb-0 text-white"> 500</P1>
                </div>
                {/** Total Cost */}
                <div className="mb-2  rounded  video-upload-adDetails__cost d-flex justify-content-between">
                    <P1 className="mb-0 text-white">Total Cost</P1>
                    <div className="video-upload-adDetails__cost-right d-flex align-items-center">
                        <P1 className="mb-0 text-white">50$</P1>
                        <div className="video-upload-adDetails__cost-right--line" />
                        <div
                            ref={TotalRef}
                            className="pointer"
                            onClick={() => setOpenTwo(!openTwo)}>
                            <Icons.AiOutlineQuestion
                                size={15}
                                color={`#000`}
                                className="bg-white rounded-pill"
                            />
                        </div>
                        <PopperUi
                            className=" video-upload-adDetails__cost--dropdown w-75"
                            open={openTwo}
                            anchorEl={TotalRef.current}
                            setOpen={() => setOpenTwo(false)}
                            childClassName="p-2">
                            <div className="container">
                                <div className="video-upload-adDetails__cost--dropdown__caret" />
                                <P1 className="mb-0 text-light">Minimum Ad buy is $20</P1>
                            </div>
                        </PopperUi>
                    </div>
                </div>
                <Button className="btn bg-color-blue rounded-10">Buy Ad Time</Button>
            </div>
        </div>
    );
}
