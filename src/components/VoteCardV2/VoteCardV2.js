import clsx from 'clsx';
import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import P1 from '../UI/P1/P1';
import Button from '../UI/Button/Button';
import GreenRadio from '../GreenRadio/GreenRadio';
const VoteCardV2 = ({ handleChange, activeVote, title, description, index, first }) => {
    return (
        <div className="row my-2 make-movie-v2-vote-section-card">
            <div className="col-1">
                <div id={`heading-${index}`}>
                    <button
                        className={`btn btn-link w-100 ${clsx({
                            active: activeVote === index.toString()
                        })}`}
                        data-toggle="collapse"
                        data-target={`#collapse-${index}`}
                        aria-expanded={index === 0 ? first : `false`}
                        aria-controls={`collapse-${index}`}>
                        <FormControlLabel
                            className={''}
                            onClick={() => handleChange(index)}
                            value={index.toString()}
                            control={<GreenRadio />}
                            label=""
                        />
                    </button>
                </div>
            </div>
            <div className="col-11">
                <div
                    id={`collapse-${index}`}
                    className={`collapse mt-2 ${clsx({
                        show: activeVote === index.toString() && first,
                        'mt-2': activeVote !== index.toString()
                    })}`}
                    aria-labelledby={`heading-${index}`}
                    data-parent="#accordion">
                    <P1
                        className={`mb-1 pointer make-movie-v2-vote-section-card--title ${clsx({
                            'make-movie-v2-vote-section-card--title-active':
                                activeVote === index.toString()
                        })}`}
                        onClick={() => handleChange(index.toString())}>
                        {title}
                    </P1>
                    <div>
                        <P1 className="mb-0 make-movie-v2-vote-section-card--desc">
                            {description}
                        </P1>
                        <Button className="btn make-movie-v2-vote-section-card--btn">
                            <a
                                target="_blank"
                                href="https://discord.gg/STPtXjgYyA"
                                className="make-movie-top-bottom__btn btn text-dark">
                                Join our Discord {`>`}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoteCardV2;
