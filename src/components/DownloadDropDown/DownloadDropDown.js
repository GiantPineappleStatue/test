import React, { useRef } from 'react';
import clsx from 'clsx';
import P1 from '../UI/P1/P1';
import Icons from '../UI/ReactIcons/ReactIcons';
import PaymentModel from '../PaymentModel/PaymentModel';
import Button from '../UI/Button/Button';
import PopperUI from '../UI/PopperUI/PopperUI';
import PaypalButton from '../PaypalButton/PaypalButton';

const DownloadDropDown = ({
    content_type,
    videoQuality,
    videoQualityHandler,
    downloadHandler,
    userId,
    subscriptionHandler,
    subscription,
    price,
    onSuccessDownload,
    onError
}) => {
    const dropdownRef = useRef();
    const [download, setDownload] = React.useState(false);

    return (
        <div className="flex-grow-1 d-flex flex-column">
            <div className="btn-group">
                <Button
                    className={`btn  download-dropdown__btn py-1 w-100 w-md-75 ${clsx({
                        subscription: subscription
                    })}  ${content_type === 'video' && 'bg-color-blue'} ${
                        content_type === 'audio' && 'bg-color-purple'
                    } ${
                        content_type === 'image' && 'bg-color-green '
                    }   video-info__btn px-3   px-xl-4  `}
                    onClick={() => setDownload(!download)}
                    refs={dropdownRef}>
                    Download
                </Button>
                <Button
                    onClick={() => subscriptionHandler(!subscription)}
                    type="button"
                    className={`btn  download-dropdown__btn--caret ${clsx({
                        'subscription--caret': subscription
                    })} btn-primary   ${content_type === 'video' && 'bg-color-blue'} ${
                        content_type === 'audio' && 'bg-color-purple'
                    } ${
                        content_type === 'image' &&
                        'bg-color-green border-top-0 border-right-0 border-bottom-0 '
                    }  dropdown-toggle-split   video-info__btn  `}>
                    &#9660;
                </Button>
            </div>
            {/* <SubscriptionDropdown subscription={subscription} content_type={content_type} /> */}
            <PopperUI
                className="download-dropdown"
                anchorEl={dropdownRef.current}
                open={download}
                setOpen={setDownload}>
                <div className="download-dropdown__caret" />

                <P1 className="mb-1 font-weight-bold text-white font-16">
                    Download <span className="text-capitalize">{content_type}</span>
                </P1>
                <P1 className="mb-1 text-white">Vide Title</P1>
                <div className="download-dropdown__line" />
                <div className="d-flex justify-content-between">
                    <div
                        onClick={() => videoQualityHandler('360')}
                        className={`text-center ${clsx({
                            blue: videoQuality === '360' && content_type === 'video',
                            purple: videoQuality === '360' && content_type === 'audio',
                            green: videoQuality === '360' && content_type === 'image'
                        })} px-3 py-1 rounded download-dropdown__item m-2 `}>
                        <Icons.AiOutlineDownload className="mx-auto text-white" size={20} />
                        <P1 className="mb-0 text-white">360P</P1>
                        <P1 className="mb-0">20.2mb</P1>
                    </div>
                    <div
                        onClick={() => videoQualityHandler('480')}
                        className={`text-center ${clsx({
                            blue: videoQuality === '480' && content_type === 'video',
                            purple: videoQuality === '480' && content_type === 'audio',
                            green: videoQuality === '480' && content_type === 'image'
                        })} px-3 py-1 rounded download-dropdown__item m-2 `}>
                        <Icons.AiOutlineDownload className="mx-auto text-white" size={20} />
                        <P1 className="mb-0 text-white">480P</P1>
                        <P1 className="mb-0">20.2mb</P1>
                    </div>
                    <div
                        onClick={() => videoQualityHandler('720')}
                        className={`text-center ${clsx({
                            blue: videoQuality === '720' && content_type === 'video',
                            purple: videoQuality === '720' && content_type === 'audio',
                            green: videoQuality === '720' && content_type === 'image'
                        })} px-3 py-1 rounded download-dropdown__item m-2 `}>
                        <Icons.AiOutlineDownload className="mx-auto text-white" size={20} />
                        <P1 className="mb-0 text-white">720P</P1>
                        <P1 className="mb-0">20.2mb</P1>
                    </div>
                    <div
                        onClick={() => videoQualityHandler('1080')}
                        className={`text-center opacity-0 ${clsx({
                            blue: videoQuality === '1080' && content_type === 'video',
                            purple: videoQuality === '1080' && content_type === 'audio',
                            green: videoQuality === '1080' && content_type === 'image'
                        })} px-3 py-1 rounded download-dropdown__item m-2 `}>
                        <Icons.AiOutlineDownload className="mx-auto text-white" size={20} />
                        <P1 className="mb-0 text-white">1080P</P1>
                        <P1 className="mb-0">20.2mb</P1>
                    </div>
                </div>
                <P1 className="mb-1 text-white">Price</P1>
                <div className="download-dropdown__line my-2" />
                <P1
                    className={`btn ml-2 mb-0 ${content_type === 'video' && 'bg-color-blue'} ${
                        content_type === 'audio' && 'bg-color-purple'
                    } ${
                        content_type === 'image' && 'bg-color-green '
                    }   video-info__btn px-5 rounded p-1  `}>
                    {price}$
                </P1>
                <div className="download-dropdown__line my-2" />
                {/** Payment Model */}
                <PaypalButton onSuccess={onSuccessDownload} onError={onError} price={price} />
                {/* <PaymentModel content_type={content_type} /> */}
            </PopperUI>
        </div>
    );
};
export default DownloadDropDown;
