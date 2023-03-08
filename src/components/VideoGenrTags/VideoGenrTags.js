import React from 'react';
import P1 from '../UI/P1/P1';
import Link from 'next/link';
export default React.memo(({ gern, tags, uploaded_date, uploaded_by, id }) => {
    const uploadedDate = uploaded_date.split('T')[0].split('-');
    const [showTags, setShowTags] = React.useState(false);
    return (
        <div className="container-fluid video-genre-tags p-0 my-2">
            <div className="row no-gutters m-0 p-0">
                <div className="col-6 col-sm-3 px-4 py-4 bg-primary-light">
                    <P1 className="h6 text-center font-weight-normal text-white">Genre</P1>
                    <P1 className=" text-center video-genre-tags__genre text-white  mb-0">
                        {gern}
                    </P1>
                </div>
                <div className="col-6 col-sm-3 px-4 py-4 bg-primary-dark">
                    <P1 className="h6 text-center font-weight-normal text-white">Tags</P1>
                    <P1 className=" text-center video-genre-tags__tags  color-white-light mb-0">
                        {tags
                            .split(',')
                            .join(', ')
                            .substring(0, showTags ? tags.length : 37)}
                        {/* {tags.substring(0, 20)} */}
                    </P1>
                    {tags.length > 39 && (
                        <P1
                            onClick={() => setShowTags(!showTags)}
                            className="mb-0 pointer float-right font-14 video-genre-tags__tags  color-white-light">
                            {!showTags ? 'Show more' : 'Show less'}
                        </P1>
                    )}
                </div>
                <div className="col-6 col-sm-3 px-4 py-4 bg-primary-light">
                    <P1 className="h6 text-center font-weight-normal text-white">Uploaded On</P1>
                    <P1 className=" text-center video-genre-tags__uploadedOn  text-white mb-0">
                        {uploadedDate[2]}-{uploadedDate[1]}-{uploadedDate[0]}
                    </P1>
                </div>
                <div className="col-6 col-sm-3 px-4 py-4 bg-primary-dark">
                    <P1 className="h6 text-center font-weight-normal text-white">Uploaded By</P1>
                    <P1 className="text-center">
                        <Link
                            href={`/profile/${id}`}
                            className="d-block text-center video-genre-tags__uploadedBy  color-white-light mb-0">
                            {uploaded_by}
                        </Link>
                    </P1>
                </div>
            </div>
        </div>
    );
});
