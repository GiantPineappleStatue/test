import React from 'react';
import P1 from '../UI/P1/P1';

export default function ProjectTeamCard({ index, name, position, bio, urls }) {
    return (
        <div className="row video-credit__item my-1">
            <div className="col-2 col-sm-1">
                <P1 className="mb-0 text-center text-light">{index}</P1>
            </div>
            <div className="col-10 row">
                <div className="col  ">
                    <P1 className="text-light video-credit__item--user rounded  text-center mb-0">
                        {name}
                    </P1>
                </div>
                <div className="col  ">
                    <P1 className="text-light video-credit__item--user rounded  text-center mb-0">
                        {position}
                    </P1>
                </div>
                <div className="col  ">
                    <P1 className="text-light video-credit__item--user rounded  text-center mb-0">
                        {bio}
                    </P1>
                </div>
                <div className="col  ">
                    <P1 className="text-light video-credit__item--user rounded  text-center mb-0">
                        {urls}
                    </P1>
                </div>
            </div>
            <div className="d-none d-sm-block col-sm-1" />
        </div>
    );
}
