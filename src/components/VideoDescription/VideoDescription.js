import React from 'react';
import P1 from '../UI/P1/P1';
import ReactHtmlParser from 'react-html-parser';

const VideoDescription = ({ description, uploaded_date }) => {
    const [showMore, handleShowMore] = React.useState(false);
    return (
        <div className="container-fluid d-none d-sm-block my-2 bg-primary-light p-3">
            <div className="row">
                <div className="col-md-8">
                    <div className="color-white-light font-weight-light">
                        {!showMore && ReactHtmlParser(description.substring(0, 300))}
                        {showMore && ReactHtmlParser(description.substring(0, description.length))}
                    </div>
                </div>
                <div className="col-md-4" />
            </div>
            <div className="d-flex justify-content-end ">
                {description.length > 300 && (
                    <P1
                        className="text-white mb-0 pointer"
                        onClick={() => handleShowMore(!showMore)}>
                        {!showMore ? 'SHOW MORE' : 'SHOW LESS'}
                    </P1>
                )}
            </div>
        </div>
    );
};
export default React.memo(VideoDescription);
