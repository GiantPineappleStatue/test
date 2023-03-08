import React from 'react';
import { useRouter } from 'next/router';
import Img from '../UI/Img/Img';
import Span from '../UI/Span/Span';
import Dialog from '../UI/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import parses from 'html-react-parser';
import { terms, contact, privacy } from '../../utils/FooterText';
import ReportBug from '../ReportBug/ReportBug';
import { useSelector } from 'react-redux';
import Icons from '../UI/ReactIcons/ReactIcons';
import { createInviteCode } from '../../services/util';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import Alert from '../UI/Alert/Alert';

const Footer = ({ movie }) => {
    const router = useRouter();
    const [modelOpen, setModel] = React.useState(false);
    const [showTab, setTab] = React.useState('');
    const [foundBug, setFoundBug] = React.useState(false);
    const [referral, setReferral] = React.useState(false);
    const [code, setCode] = React.useState('');
    const [clipboard, setClipboard] = React.useState(false);
    const [showSnack, setShowSnack] = React.useState(false);
    const user = useSelector((state) => state.auth);

    React.useEffect(() => {
        if (referral && user.authToken) {
            generateLink();
        }
    }, [referral]);

    const generateLink = async () => {
        const data = await createInviteCode();
        if (data.code === 'ABT0000') {
            setCode(data.inviteCode);
            setClipboard(false);
        }
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://artbot.tv/signup?code=${code}`);
        setClipboard(true);
        setShowSnack(true);
    };
    return (
        <div className="w-100 footer1 ">
            {clipboard && (
                <Snackbar
                    open={showSnack}
                    onClose={() => setShowSnack(false)}
                    autoHideDuration={6000}>
                    <Alert type="alert-success">Link copied to clipboard</Alert>
                </Snackbar>
            )}
            {foundBug && <ReportBug open={foundBug} handleClose={setFoundBug} />}
            <Dialog
                className="custom-dialog "
                open={modelOpen}
                handleClose={() => setModel(!modelOpen)}
                scroll="body">
                <DialogTitle className="text-light">
                    {showTab === 'terms' && terms.title}
                    {showTab === 'privacy' && privacy.title}
                    {showTab === 'contact' && contact.title}
                    {referral && 'Invite Friends'}
                </DialogTitle>
                <DialogContent dividers={true}>
                    <div className="row col-12 text-light" tabIndex={-1}>
                        <p>{showTab === 'terms' && parses(terms.desc)}</p>
                        {showTab === 'privacy' && parses(privacy.desc)}
                        {showTab === 'contact' && contact.desc}
                        {referral && (
                            <div>
                                <p>Referral link </p>
                                {user.authToken && (
                                    <div className="d-flex justify-content-between">
                                        <p className="text-nowrap pointer">
                                            https://artbot.tv/signup?code={code}
                                        </p>
                                        <div className="d-flex">
                                            <Tooltip title="Copy to clipboard" placement="top">
                                                <p>
                                                    {clipboard ? (
                                                        <Icons.FaClipboardCheck
                                                            size={20}
                                                            color={'#fff'}
                                                            className="ml-2 pointer"
                                                            onClick={copyToClipboard}
                                                        />
                                                    ) : (
                                                        <Icons.FiClipboard
                                                            size={20}
                                                            color={'#fff'}
                                                            className="ml-2 pointer"
                                                            onClick={copyToClipboard}
                                                        />
                                                    )}
                                                </p>
                                            </Tooltip>
                                            <Tooltip title="Regenerate invite link" placement="top">
                                                <p>
                                                    <Icons.FiRefreshCcw
                                                        size={20}
                                                        color={'#fff'}
                                                        className="ml-2 pointer"
                                                        onClick={generateLink}
                                                    />
                                                </p>
                                            </Tooltip>
                                        </div>
                                    </div>
                                )}
                                {!user.authToken && (
                                    <p className="text-nowrap">
                                        Please{' '}
                                        <Span
                                            style={{ color: '#90e40d' }}
                                            onClick={() => router.push('/login')}
                                            className="much-donate-card-inner--active pointer">
                                            Login
                                        </Span>{' '}
                                        first to create link
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
            <div className="footer">
                <Img
                    onClick={() => router.push(movie ? '/letsmakeamovie' : '/')}
                    src={'/img/artbot-logo.png'}
                    alt="artbot logo"
                    style={{ width: '150px' }}
                    className="py-2"
                />
                <div className="d-flex align-items-center justify-content-center text-white footer-text py-3">
                    <Span
                        onClick={() => {
                            setModel(!modelOpen);
                            setTab('terms');
                        }}
                        className="pointer">
                        Term & Condition
                    </Span>
                    |
                    <Span
                        onClick={() => {
                            setModel(!modelOpen);
                            setTab('privacy');
                        }}
                        className="pointer">
                        Privacy Policy
                    </Span>
                    |
                    <Span
                        onClick={() => {
                            setModel(!modelOpen);
                            setTab('contact');
                        }}
                        className="pointer">
                        Contact Us
                    </Span>
                    |{' '}
                    <Span
                        onClick={() => {
                            setFoundBug(!foundBug);
                        }}
                        className="pointer">
                        Found a Bug
                    </Span>
                    |{' '}
                    <Span
                        onClick={() => {
                            router.push('/faqs');
                        }}
                        className="pointer">
                        FAQ
                    </Span>
                    |{' '}
                    <Span
                        onClick={() => {
                            setModel(!modelOpen);
                            setReferral(true);
                        }}
                        className="pointer">
                        Invite Friends
                    </Span>
                </div>
                <div className="d-flex align-items-center justify-content-center footer-img py-2">
                    <a target="_blank" href="https://www.facebook.com/ArtbotTv">
                        <img src={'/img/fb.svg'} width="50" height="50" alt="facebook" />
                    </a>
                    <a target="_blank" href="https://twitter.com/ArtBotTV">
                        <img src={'/img/twiter.svg'} width="50" height="50" alt="twitter" />
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/company/artbot/">
                        <img src={'/img/linkedin.svg'} width="50" height="50" alt="linkedin" />
                    </a>
                    <a target="_blank" href="https://www.reddit.com/r/ArtBotTV/">
                        <img src={'/img/reddit-2.svg'} width="50" height="50" alt="reddit" />
                    </a>
                </div>
            </div>
        </div>
    );
};

Footer.defaultProps = {
    movie: false
};

export default Footer;
