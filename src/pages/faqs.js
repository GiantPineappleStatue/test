import clsx from 'clsx';
import React from 'react';
import Footer from '../components/Footer/Footer';
import LetsMakeaMovieWrapper from '../components/LetsMakeaMovieWrapper/LetsMakeaMovieWrapper';
import P1 from '../components/UI/P1/P1';
import Icons from '../components/UI/ReactIcons/ReactIcons';

const Faqs = () => {
    const [faqs, setFaqs] = React.useState([
        {
            title: 'What is a royalty pool and how does it work',
            desc:
                'All of the profits from the movie will be placed into 3 royalty pools, A, B, and C.  60% of the profits will go to Royalty pool A, 20% to Royalty pool B, and 20% to Royalty pool C. '
        },
        {
            title: 'How do I get to be involved ',
            desc:
                'Back the movie and gain access to the polls that will determine the movie’s direction.  Also gain access to the private discord, join the discussion and help us make something amazing!'
        },
        {
            title: 'How do I make money',
            desc:
                'As the movie earns money, the profits will automatically be divided into the different royalty pools.  ArtBot can manage your wallet and make direct deposits to you through cryptocurrencies or Paypal.  Or cryptocurrency distributions can be made directly to your own NFT wallet.'
        },
        {
            title: 'What if I forget to vote ',
            desc: 'Your voice won’t be heard.'
        },
        {
            title: 'How can I help make the movie ',
            desc: 'Vote in the polls, join the discussions, and back the movie!'
        },
        {
            title: 'When can I see the movie ',
            desc:
                'All backers will be invited to the digital premiere, and some will receive a digital download.'
        },
        {
            title: 'How do I share it with my friends',
            desc: 'Get the word out and direct them to the ArtBot page.'
        },
        {
            title: 'Can I get a refund ',
            desc: 'No refunds on backing.'
        },
        {
            title: 'I can’t access the discord. How can I get help',
            desc: 'Contact us at support@artbot.tv'
        },
        {
            title: 'Can I move to a higher tier',
            desc: "Yes, please message an admin from the discord group and we'll get you sorted."
        },
        {
            title: 'When and where do I get my NFT ',
            desc:
                'You will receive your NFTs when the backing campaign finishes.  This will happen some time during production.'
        }
    ]);
    const [first, setFirst] = React.useState(false);
    React.useEffect(() => {
        setFirst(true);
    }, []);
    const [current, setCurrent] = React.useState(0);
    const onChangeHandler = (current, i) => {
        setCurrent(current === i ? null : i);
    };
    return (
        <LetsMakeaMovieWrapper>
            <React.Fragment>
                <div className="container my-sm-5">
                    <P1 className="mb-3 text-center crowdfunding-platform-title">
                        F<span className="lets-make-movie--fact">&nbsp;.&nbsp;</span>A
                        <span className="lets-make-movie--fact">&nbsp;.&nbsp;</span>Q
                        <span className="lets-make-movie--fact">&nbsp;.&nbsp;</span>
                    </P1>

                    <div id="accordion">
                        {faqs.map((item, i) => (
                            <div className="card custom-accordin" key={i}>
                                <div className="card-header" id={`heading-${i}`}>
                                    <h5 className="mb-0 pointer">
                                        <button
                                            className="btn btn-link w-100"
                                            data-toggle="collapse"
                                            data-target={`#collapse-${i}`}
                                            aria-expanded={i === 0 ? first : `false`}
                                            aria-controls={`collapse-${i}`}>
                                            <h4 className="text-left">
                                                {item.title}{' '}
                                                <span className="lets-make-movie--fact">?</span>{' '}
                                            </h4>
                                        </button>
                                    </h5>
                                </div>

                                <div
                                    id={`collapse-${i}`}
                                    className={`collapse ${clsx({ show: i === 0 })}`}
                                    aria-labelledby={`heading-${i}`}
                                    data-parent="#accordion">
                                    <div className="card-body">
                                        {item.desc}
                                        <div
                                            className={`desc-secord ${clsx({
                                                'd-none': i !== 0
                                            })}`}>
                                            Royalty pool A will be for everyone that backs this
                                            movie. Royalty pool B will be for all backers in the
                                            Producer and Executive tier. Royalty pool C will be for
                                            the cast and crew of the movie. NFTs will be serialized
                                            and distributed to backers in order of who backed first
                                            and in an amount proportional to the amount backed .
                                            These NFTs will be the sole method in which IP and
                                            royalty rights will be granted. Royalty distributions
                                            will automatically be made to NFT holders on regular
                                            intervals.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        </LetsMakeaMovieWrapper>
    );
};

export default Faqs;
