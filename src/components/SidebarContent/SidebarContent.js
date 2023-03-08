import clsx from 'clsx';
import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
const SidebarContent = (props) => {
    const sidebar = useSelector((state) => state.auth.sidebarCollapse);
    const router = useRouter();
    const [dropdown, setDropedown] = useState(false);
    const {
        headerImg,
        header,
        first,
        second,
        firstImg,
        secondImg,
        home,
        video,
        audio,
        headUrl,
        firstUrl,
        secondUrl
    } = props;
    React.useEffect(() => {
        if (sidebar === false) {
            setDropedown(false);
        }
    }, [sidebar]);
    return (
        <div className="sidebar-content px-3">
            <div
                className="sidebar-header pointer position-relative"
                onClick={() => {
                    setDropedown((prev) => !prev);
                    router.push(headUrl);
                }}>
                {sidebar && (
                    <p
                        className={dropdown ? 'line active' : 'line'}
                        style={{
                            color:
                                dropdown && home
                                    ? '#90E40D'
                                    : dropdown && video
                                    ? '#00BFFF'
                                    : dropdown && audio
                                    ? ' #8855F3'
                                    : '#fff'
                        }}>
                        |
                    </p>
                )}
                <div
                    className={`${clsx({
                        'sidebar-content-title': sidebar
                    })} d-flex align-items-center`}
                    style={{
                        color:
                            dropdown && home
                                ? '#90E40D'
                                : dropdown && video
                                ? '#00BFFF'
                                : dropdown && audio
                                ? ' #8855F3'
                                : '#fff'
                    }}>
                    {headerImg}
                    {sidebar && (
                        <h5
                            className={dropdown ? 'px-3 active s-header' : 'px-3 s-header'}
                            style={{
                                color:
                                    dropdown && home
                                        ? '#90E40D'
                                        : dropdown && video
                                        ? '#00BFFF'
                                        : dropdown && audio
                                        ? ' #8855F3'
                                        : '#fff'
                            }}>
                            {header}
                        </h5>
                    )}
                </div>
                {sidebar && (
                    <BiChevronDown
                        style={{
                            transform: dropdown && 'rotate(180deg)',
                            color: dropdown && 'var(--active)'
                        }}
                    />
                )}
            </div>
            {dropdown && (
                <div
                    className="dropdown py-3 "
                    style={{
                        color: home ? '#90E40D' : video ? '#00BFFF' : audio ? ' #8855F3' : '#fff'
                    }}>
                    <div onClick={() => router.push(firstUrl)} className="d-flex pointer py-1 ">
                        <img src={firstImg} alt="#" className="img" />
                        <span className="px-2">{first}</span>
                    </div>

                    <div onClick={() => router.push(secondUrl)} className="d-flex pointer">
                        <img src={secondImg} alt="#" className="img" />
                        <span className="px-2">{second}</span>
                    </div>
                </div>
            )}
        </div>
    );
};
export default SidebarContent;
