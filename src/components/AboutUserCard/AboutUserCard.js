import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import PropTypes from 'prop-types';

const AboutUserCard = ({ line, rightLine, leftLine, src, src2, text, rightLineCss }) => (
    <div className="p-3 ">
        <span className={`left-semi-circle  ${leftLine ? 'd-none d-md-block' : 'd-none'}`} />
        <div className={`user-stories-abs-div ${line ? 'd-none d-md-block' : 'd-none'}  `} />

        <Img
            src={src}
            style={{ objectFit: 'scale-down' }}
            className="d-block mx-auto"
            width="30"
            height="40"
            alt="revenue"
        />
        <Img
            src={src2}
            style={{ objectFit: 'scale-down' }}
            className="d-block my-3 mx-auto"
            width="20"
            height="20"
            alt="black-dot"
        />
        <P1 className="text-center font-16 about-artbot__desc">{text}</P1>
        <span
            className={`semi-circle ${rightLine ? 'd-none d-md-block' : 'd-none'}  `}
            style={{ top: rightLineCss }}
        />
    </div>
);
AboutUserCard.propTypes = {
    line: PropTypes.bool,
    rightLine: PropTypes.bool,
    leftLine: PropTypes.bool,
    src: PropTypes.string.isRequired,
    src2: PropTypes.string,
    text: PropTypes.string.isRequired,
    rightLineCss: PropTypes.string
};
AboutUserCard.defaultProps = {
    line: true,
    rightLine: false,
    leftLine: false,
    src2: '/img/purple-black-dot-user-stories.png',
    rightLineCss: '34%'
};

export default AboutUserCard;
