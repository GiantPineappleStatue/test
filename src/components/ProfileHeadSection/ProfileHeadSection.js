import React, { useEffect, useState } from 'react';
import Img from '../UI/Img/Img';
import Label from '../UI/Label/Label';
import Icons from '../UI/ReactIcons/ReactIcons';
import Small from '../UI/Small/Small';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { paymentProfile, profileUser, selectSubscription } from '../../redux/actions/profile';
import { getProfile, updateProfile, ipfsAdd, paymentAdd } from '../../services/util';
import SubscriptionDropdownIndependent from '../SubscriptionDropDownIndependent/SubscriptionDropDownIndependent';

function ProfileHeadSection({ users, profileUser, user, subscrPrice, selectSubscription, id }) {
    const [update, setUpdate] = useState(false);
    const [edit, setEdit] = useState(false);
    //const [ user, setUser ] = useState({ user: { created_at: '' }, rating: 0 });
    const [coverArt, setCover] = useState('');
    const [profile, setProfile] = useState('');
    useEffect(() => {
        let mount = true;
        if (users && id === users._id) setUpdate(true);
        async function getUser() {
            let response = await getProfile({
                user_id: id
            });
            if (response.code === 'ABT0000' && mount) {
                const data = {
                    user: { ...response.data },
                    rating: response.rating
                };
                if (response.data.subscriptions?.length > 0) {
                    const updateSubscriptions = [...response.data.subscriptions].map((item) => {
                        const upItem = { ...item, edit: true };
                        return upItem;
                    });
                    data.user.subscriptions = updateSubscriptions;
                }
                profileUser(data);
            }
        }
        getUser();
        return () => {
            mount = false;
        };
    }, [profile, coverArt, id]);
    function _createRequest(file, holdTime, isVideo) {
        return new Promise((resolve, reject) => {
            let videoData = new FormData();
            videoData.append('file', file);
            // videoData.append('hold_time', holdTime);

            let uploadRequest = new XMLHttpRequest();
            uploadRequest.withCredentials = false;

            uploadRequest.addEventListener(
                'readystatechange',
                function () {
                    if (uploadRequest.readyState === 4) {
                        let result = JSON.parse(uploadRequest.responseText);
                        if (result.IpfsHash) {
                            resolve(result);
                        } else {
                            reject();
                        }
                    }
                }.bind(this)
            );

            uploadRequest.open('POST', 'https://api.pinata.cloud/pinning/pinFileToIPFS');
            // uploadRequest.setRequestHeader("Content-Type", `multipart/form-data`);

            uploadRequest.setRequestHeader(
                'pinata_api_key',
                process.env.NEXT_PUBLIC_PINATA_PUBLIC_KEY
            );
            uploadRequest.setRequestHeader(
                'pinata_secret_api_key',
                process.env.NEXT_PUBLIC_PINATA_PRIVATE_KEY
            );
            uploadRequest.send(videoData);
        });
    }
    const updateCover = async (cover) => {
        const response = await _createRequest(cover, 1, false);
        const update_response = await updateProfile({
            user_id: users._id,
            cover_photo: response.IpfsHash
        });
        setCover(cover);
        setEdit(false);
    };
    const profileHandler = async (profile) => {
        const response = await _createRequest(profile, 1, false);
        const update_response = await updateProfile({
            user_id: users._id,
            profile_photo: response.IpfsHash
        });
        setProfile(profile);
        setEdit(false);
    };
    const paymentonSuccessHandler = async (data) => {
        let reqData = { ...data };
        reqData.subscribe = user.user._id;
        reqData.planId = subscrPrice._id;
        const result = await paymentAdd(reqData);
        if (result.code === 'ABT0000') {
            selectSubscription(null);
            paymentProfile(true);
        }
    };
    const paymentonErrorHandler = (error) => {
        console.log(error);
    };
    let backgroundUrl =
        'https://edufolios.org/jsmithportfolio/wp-content/themes/edufolios/images/defaults/default-cover.gif';
    if (user.user.cover_photo) backgroundUrl = `https://artbot.mypinata.cloud/ipfs/${user.user.cover_photo}?img-width=1400`;
    let profileUrl =
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEhUTEw8VFRUVFQ8XFxYYDw8VFRYVFRUXFhUaGhUYIiggGxolHRUVITEnJSorLi4uFx8zODMtNygtLi0BCgoKDg0OGxAQGzclICUrLS0tLS01Ky0tLS8uLS0tKy0tLy03LS0tKy0tLS0tLS0tLy0rKy0tLS0tLS0tLy0tLf/AABEIAN4A4wMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUCBAYHA//EAEEQAAECBAMEBgcHAgUFAAAAAAEAAgMRMWEEIXEFEkFRBlOBkZKxExQiMlKhwSNCYnKC0fCy4QckNMLSM0Nzg6P/xAAaAQEAAgMBAAAAAAAAAAAAAAAABAUBAwYC/8QANREBAAIBAgQDBgYCAgIDAAAAAAECAwQREiExUQUTQSJxgaGx0TJhkcHh8DPxNEIjchRDUv/aAAwDAQACEQMRAD8A9wQROaBPkgT4BAJ4BAJ4BAJ4BAJ4cUAnvQCZaoE5aoE5IE+aALoAKADxKADxQAe5ABnogAz0QAZ6IE5oE+SBPgEAngEAngEAnggE96CZIIOaCLBAsECwQLBApkECmQqgU1QKXJQKaoPhiYsRvuQt913ta3SeZ+S82m3pDMRHrKmx52lIuMXCQG85xHkfqeA35KNf/wCR3rWPjP2ba+X2mXI7TxUX7+2g48oYjS/+Ykq7Je3rm/Tf9kmsR6U/vxc3i3TOcYxLkP8A9yh35+u/6/u3192zXDRyXjZ6buF2riIfuR4jZcBEdLw0WyubJX8NpeJpWesOj2V09xDCBHaIreYAY/5eye4aqbi8RvXleN/q0X01Z/Dyd7snasHFM34T5gVFHNPJw4fVWuLNTLXesol6TSdpbtdPNbXgrogVy4IFggWCBYIFggUyCBTIVQKaoMpIIPJBFggWCBYIFMggUyFUCmqBS5KBTVBER4aC5xAABJJIAAFzQLEzEc5HC7f6eSJZhgCaelcMv0N46nuVXn8R/wCuL9fsl49N63/RxGNxsWM7eixHPdzc4mWgoOxVl72yTvad0utYrHJ8F4ZEZEBAQbOzsfFgRBEhO3XDucOIcOIXvHktjtxV6vNqxaNperbD6SQMTC3y9sMtkHtc8CRsTVp5q/waqmSm/TursmK1Z2WMHaMCId1keG6zYrCewArdGSlukw8TW0dYbNgvbyWCBYIFggUyCBTIVQKaoFLkoMpIIPIIIsECwQKZBApkKoFNUClyUCmqCHvDQXOIEgSSTIADM9iTO3OR5V0u6TOxTixhIgtOQpvkfeNuQ+tKDV6uc08Nfw/VY4cMUjeernFDbhARkQEBARgQQjLJsMuyDSdATkm2/oxu6Lo50vjYchj3GJCoWkzewfhJ8jlopmn1t8U7WnePm05MEW6cpeo4TFMisa+E4Oa4TDhy/eyvaXi9YtXor5iYnaX1sF6YKZBApkKoFNUClyUCmqDJBBPAIIsECmQQKZCqBTVApclApqgUzNUHC/4i7bI/yzDmQHRSOAq1nbU9nNVXiGf/AOqvx+yXpsf/AHn4OEgQHvMmNLjyAmqndNXOH6LR3ZvLWanePcMvmvPFBs2onRqDDbvRcSWjRrfOcyscU+jOyoxPqg9z0z7l0Ng/pJ8l65sNJkMuPstJsAXH5LIzj4SIwTfDc0cy1wHeU3HxRh9/U4m7vhhLPiAmO0inam7L4IwIy+uFxL4Tw+G4tc0zDhUL1W01niidpYmImNpepbCx+H2jB+0gsMRshEaWgyPBzSc5H5Zq9wZKamntRG/rCvyVtityltbM2L6q8+gefRPM3QnEkNd8THHPUGvPKS2YsHlT7HSfT7PNsnHHtde64pkFIaimQqgU1QKXJQKaoFMzVBkggngEEUyCBTIVQKaoFLkoFNUCmZqg+GPxbYMN8V9GNLu6gFzReMl4pWbT6M1rxTtDzTZuwYuK38ViCWse4u/FEcTRs6NHPkMuaoLY7WpOa/r85+37LKLRFopV0mFwzIbZNaGgcB9TxKgb7t6u23tkQZNaN6K73W5mU6EgceQXqI3JlVQNgR459JiIhbPhV0tKNH8ks8URyhjbdcYTYGGZn6Peu873yp8l54pZ2WTGiUgAByAkFgSRPTzRlTbR6OQYsywejdzA9k6t/aS9RaYY2UWBjxcFG3YmTHS3pZgim802/svU84eXT43ZECNVgn8bcj3ivbNeImYetnN7S6MxGTMM+kaOEpPHZx7O5e4t3Y2URHBemFjsDarsLHbFFBk8c2H3hrxFwFuwZpxXi/6+5ryU467PZ2PBALTMEAg2PFdJE781WmmQqshTUoFLkoFNUCmZqgUzKDJBBPJBFMhVApqgUuSgU1QKZmqBTMoNLauzhHa1kT/p7wc9vxBubW6TkT+WXFasuOMkcM9PV7pbh5x1a22XS3W0AE5cBwH1VV4rk51xx7/2j90vSV62UuNjljZhs3HJjebjSdqk2BVTCY1tmbLEMmI878V2bnnmeXIJMkQsK6LDJXRArogV0QK6INHbOzxHhln3hm08nctDQrMTsxJsN5dAhzqG7ptukt78knqQ3rBYZU+3diNjAuYAIo48HWde69RbbqxMOIc0gkESImCDUEVWx4eudCcSX4KDxIDmeBxaPkAuh0VuLBX9P0VueNskrympUpqKXJQKaoFMzVApmUC5QZIIJ5VQRTVApclApqgUzNUCmZQLlAuUFFtYziGfAN/f6rnfEp3zzH5Qs9LH/jaW6CZnhOX87AoCQmuiBXRArogV0QK6IFggWCDFjAMmiWZPaTM/MlBlYIFgg5jpfsmTRiG0LtyJYyG67tzHYOak0xzOLj7Tt9mqbbX4fydZ/h6JYJl3xf6iPorvw/8AwR8fqgan/I6SlyVNaCmqBTM1QKZlAuUC5QZIIJ70EUuSgU1QKZmqBTMoFygXKBcoKLaw+0JPJp/ncud8SjbPPuhZ6X/G066KAkFdECuiBXRArogWCBYIFggWCBYIFNUG9h8E2Nh4sJ1IkxoZCR7DI9iufDscZMF6z0mf2QdTbhyRMPv0YwToGFhQ3CTw07w/E4lx81Y6bHOPFWso2W3FeZWlNVvaymZqgUzKBcoFygXKDKaCCZaoIpqgUzNUCmZQLlAuUC5QK5miCo22z2mu4EEdx/uqPxWu1627xt+n+0/Rz7Mwra6KqTCuiBXRArogWCBYIFggWCBYIFNUCmqC92Szdhjm4k/T6LovDacOCJ7zM/t+ys1U75G5TVT0cpmaoFMygXKBcoFygVzNEGU0EHLVBFMzVApmUC5QLlAuUCuZogV0QUO0MWYjvwgmV7rm9bqpzW2jpHRZ4MPBG/rLUrooSQV0QK6IFggWCBYIFggWCBTVApqgU1QXOycVMbpGYAlLiFfeHarjr5c+kcvcrtTi4Z4o9VhTM1VmilMygXKBcoFygVzNECuiDKaCDlmgimZQLlAuUC5QK5miBXRAOeiSOXc0zkeGXcuPms1naesLqJ35wiuiwyV0QLBAsECwQLBAsECmqBTVApqgU1QWGxmHfLuQl2mgVn4XSZyzb0iPqiau21NlzTMq+V5coFygXKBXM0QK6IFdPNBlNBByzQRcoFygXKBXM0QK6IFdPNArp5oNfEYKHEMyO0GU1GzaPFlnitHNtpmvSNolQPbmRyJHcuZtXhtMT6LWJ3jdjYLyyWCBYIFggWCBTVApqgU1QKaoNzZmGa9x3s5DnxJy+qnaDT1zXmLdIhH1GSaRG3VdwoTWDISsF0GPHTHXhpG0K61ptO8srle3kuUC5QK5miBXRArp5oFdPNBlNBB5lBFygXKBXM0QK6IFdPNArp5oFdECuQogodqQ5RDKhkf3+c1zfiGPgzzPfmtNPbixx+TUsFCbywQLBAsECmqBTVApqgU1QKaoLrY0OTC41cctBl5zV94Xj4cU27z9P7Ku1dt77dm/cqzRS5QLlArmaIFdECunmgV080CuiDJBB5lBFygVzNECuiBXTzQK6eaBXRArkKIFgg0NsQZtmPu10Nfoq3xPDxY+OOsfRK0t9rcPdS2CoFiWCBYIFNUCmqBTVApqgU1QZQ2EkDiTIL1Sk3tFa+rza0VjeXSwoYaAOQAH85rrMdIpWKx6Ki1ptMzLK5Xt5LlArmaIFdECunmgV080CuiBXIUQZIII4lBFczRArogV080CunmgV0QK5CiBYIFggOH3e9YmImNpInZzuMw5huLe0G37rl9TgnDkms9PT3LbFk467vhYKO2lNUCmqBTVApqgU1QLlBa7Hw0vtHaN+p+iufDNPt/5bfD7oOqy/wDSPitLlXCEXKBXM0QK6IFdPNArp5oFdECuQogWCDJBBHNBFdECunmgV080CuiBXIUQLBAsECwQLBB8MZhg9u7xqDyKj6nTVz04Z6+ktmLLOOd4c41wzkZmZB1C5e0TEzE+i2id4TTVYZKaoFNUCmqBcoPvs+E18TdcaAuIsCBLtmpWjwRmycM9OstOfJwV3h0QErSoOS6aIiI2hVTO5crIVzNECuiBXTzQK6eaBXRArkKIFggWCDIIII7kEV080CunmgV0QK5CiBYIFggWCBYIFMhVAplxQcDiC+HEeKO3nT7/ACXKZqzGS0T3lb0nesTDagY5v3sj8v7LVs97tsHjWawyU1QDlmUGliMcB7uZ58BpzKzswsOiUNxe+IaSlO5IPfkrbwuk8Vrem2yHq55RDprlXSCVzNECuiBXTzQK6eaBXRArkKIFggWCBYIMgggieiCK6eaBXRArkKIFggWCBYIFggUyFUCmQqgUuSgoek+zZj0rRNwHtDm3n2eWiq/EdNxR5tesdfd/CXpsu08MuXVInMmPLcwSNCg+oxkQfe+QTYfKJFcc3OJ/nJBlhoDnuDQMycrXK946WvaKV6yxa0VjeXd4DCNhMDRQfM8Sbrp8OKuKkUhVXvN7by+9czRbXgrogV080CunmgV0QK5CiBYIFggWCBYIMgEEET0QRXRArkKIFggWCBYIFgg18dj4MATiRGs/M4TPZU9i2Y8V8k7Ujdqy5seKN7zs5jH9PYLJiDCdEPxO9hv/AC+QVli8JyT+Odvn/Cry+M44/wAcb/KPv8nOYzpljX0e2GDwYwT8TplT8fhuCnWN/ercnimpv0naPy/nd1HQOLiYjHxY0Vzw4hrA4/D7x0nIdhVb4lXFS0UpG09Z/Za+FXzZKzkyW3jpH7uqpXMlVi2clt7Y5hExGCbDUD7h/wCKodbo5xzx0/D9P4WGDPxcrdVKq5JLlBkxhJAAmTQCqzETM7QTO3OXY7C2UILd5/vmv4RyXQaLSeTXe34p+X5K3Pm452jotK5minNDzXpHjMZhcS9rcTF3HHfZN5cN1xpJ06GY7Aui0mPBqMMTNY3jlPp9HM6zLqNNnmK3naecev17JwXTrFNyiNZFGm449rcvksZPC8NvwzMfP+/qY/F89PxxFvlP9+DpMB03wsSQfvQj+ITaf1NoNZKvy+GZq868/cssXi2C/K3sz+f3h0UGM2IA5jg5p4tcCDoQoFqzWdrRssq2raN6zvDOuQovL0WCBYIFggWCBTIVQZAIIOeiCK5CiBYIFggWCCv2ttvD4YfaRADwaPaef0j65Lfg02XNPsR8fRH1GrxYI3vPw9XEbW6cR3zbAb6JvxGToh7aD56q5weF46c785+Si1Hi+W/LH7MfP7Q5eNFc4lznFzjVznFxOpKs61isbVhVWtNp4rTv72Cyw3Nk7OfiIrYTKuqeDWirjYfstWbNXDSb2bsGC2fJGOv+vzewYPCsgw2w2DJoDQNP5NcnkvN7Ta3WXZY8dcdIpXpD7UzNV4eyXEoKfG9HYT/aaTDPIAFvh/ZV+bw7HfnXl9P0Saam1evNos6LunN0UAWaSfNRo8Ktvzt8m2dXHZc7O2VCg5gZ/Ecz/bsVhg0mPD+GOfeeqNkzWv1btczRSWorogoemGxvWoM2j7SHNzObvib2+YCnaDU+Tk9r8M9fur/EdL5+L2fxRzj7fH6vK103VynQQ6NjBY6LBdvQojmHjI5HUUPateTFTLG143hsxZb4p3pO0uw2R08OTcQz/wBjB5s/buVTn8K9cU/Cfv8A33rnT+MemaPjH2+36OzwWNhRmh0J7XN5g0sRwOqqMmO+OeG8bSuseWmSvFSd4fewXhsLBApkKoFNUGQCCDmgiwQLBB8cZi4cJhc94Y0VcT/Jmy948dsluGsby8ZMlMdeK87Q4PbnTeI+bMMNxvxkDfOgo3z0V3p/C6155ec9vT+VBqvFrW9nFyjv6/Dt/ejkXvJJJJJOZJJJJ5kmqtYiIjaFPMzad5YrLAgIOg6L9Im4TenAD98ibw6T5CgAOUu6qg6zRzn29rbb09FhoddGn3jh339fV3uyekOGxHuRPb+B3su0ANeyao8+jy4edo5d46Og0+tw5+VJ59p5T/fctaZlRUsuUC5QLlArmaIFdEEOIqTJo55fwJEbkzs5zavTTCw5tYTFI+D3fGcpaTVhh8NzZOdvZj8+v6KzP4rgx8q+1P5dP1+27z3a+NEeK6IIQh72Za0kifEz5lX+DFOOkU332c7qMsZck3iu2/o01taUoCDYwOOiwXb8KIWO5g5GxFCNVryYqZK8No3hsxZb4rcVJ2l3vR/ppDiShxpQ3nIO/wC27WfunXK/BUeq8NtT2sfOO3rH3dBpPFa5PZy8p7+k/Z1lgqtblNUClyUGQCCDyQRYIKbpD0ig4Ru770QjJgOerjwCl6XR3zzy5R3QtXrsenjnzt6R9+0PNNq7VjYh29EfPk0TDW6D61XR4cFMNeGkfdzGfUZM9uLJPw9Pg0luaEICAglDqICDqej/AEyiwiGx5xIdN6sRnb94a534Ks1XhtLxxY+U/KfstdJ4pfHMVyc47+sff6vQ8LiGRGiI1wc0ibSDlL91QXpaluG0bS6Ol63rFqzvEvrcry9lczRArogrNu7cg4Zm88zJ91g955+jblSdNpb57bV6esouq1ePT13t19I9Zea7b6QYjFH23SZwhtmG2n8Rufkuh0+kx4Y9mOff1/hzOp1uXPPtTy7R0/lVKUidBBKAgICCEHSdG+lkTDShxJxIXKrmflPEW7pKv1fh9MvtV5W+U+/7rPReJXw+zfnX5x7vs9IweLhxGB8N4eHUI+vKXJc9kx2x24bRtLpceWmSsWpO8S+1Lkrw9spIIPIIOW6V9Km4ecKDJ0Xiath683W7+RstFoJy+3flX6/wqtf4jGH2MfO30/l5xGiuc4uc4ucTMkmZJ5kroa1iscNXNWtNp4rTvLFZYQgICCUOogICAgveim3zhYknEmC4+0K7p+MDnz5jsULW6SM9d4/FHT7J+g1s6e+0/hnr+X5/d6m0hwnPKo5Ec1zExs6yJ3TXRBobb2ozDwnRX0GTW8XuNB/OAK36fBbNeKR/qEfU6iuDHN7fD85eS7QxsSPEdEiOm53cBwAHABdTixVx1ilejkMuW+W83vPOWstjX0EEoCAgICCEBBZ7C23Fwj95hm0+8wn2XfsbqNqdLTPXa3X0n++iVpdXk09t69PWO/8AL1LZG1YWIh+khmfAtPvNPIhc1nwXw24b/wC3VafUUz046f6b60t7Q29HczDxnMMnNhRCDyIaZHVbtNWLZq1npMw0aq00w3tXrET9HjZPaTU1K67pyhxfXnIghAQEEoCAgIIQSghB6J/h9tb0kMwHnOEJsvD5fpPyIVB4pp+G3mx0nr7/AOXR+EanipOK3WOnu/j7Ourp5qqXDy7prtf1iOWtP2cKbW8i777u/LQXXS+H6fysW89Z5/aHK+Jarzcu0dK8o9/rP7OeU9XdBBKAgICAghAQSgILvoXiHsxkINcQHlzXAUcN0mRGoCheIUidPaZ9Oif4be1dTWInlPX9JesBcw6xWdJT/lI//ii/0lSNJ/np74RtZ/x7/wDrP0ePrrHGoQEBBKAgICCEBBKAh0buxMeYEeHF4Nd7V2HJ3yPyC06jF52Oafp7/Rv02byMtb9uvu9Xp3SfafocM+I05kBrDzc7IEaCZ7Fzejwebmis9Os/D+7Oo12o8nBN469I98/3d5GF1XVyHQQSgICAgIIQEEoCAgt+iH+sgfmd/Q5RNd/x7+794TPD/wDk098/SXrgXLOvV3SJpOFjtaJkwouX6St+lmIzUme8I+riZwXiP/zP0eN7w5rrdnF7wneHNNjeCY5psbwbw5psbwbw5psbwbw5psbwbw5psbwTHNNjeDeHNNjeDeHNNjeDeHNNjeIN4c023N4hExzTbc3hd7Z2wYuHwsLe9xji7PiHGGyd91s/1KHp9NwZcl+8/wAz8/onanVeZhxUmekc/pHyj5qXeHNTNkHeDeHNNjeDeHNNjeDeHNNjeDeHNNjeDeHNNjeDeHNNjeDeHNNjeDeHNNjeDeHNNjeDeHNNjeDeHNNjeFx0P/1sH8zv6HKJr/8Aj33/ALzhN8OnfVU2/P6S9cXLOvEHx9Uh9Wyf5Gr35lu7zwV7IGDhdWzwNTzL9zgr2Bg4XVs8DU8y/c4K9gYOF1bPA1PMv3Y4K9gYOF1bPA1PMv3Z4K9gYOF1bPA1PMv3OCvYGDhdWzwNTzL9zgr2PU4XVs8DU8y/c4K9j1OF1bPA1PMv3OCvY9ThdWzwNTzL9zgr2Dg4XVs8DU8y/c4K9g4OF1bPA1PMv3OCvYODh9WzwNTzL9zgr2Dg4XVs8DU8y/c4K9g4OF1bPA1PMv3Y4K9g4OF1bPA1PMv3Z4K9j1OF1bPA1PMv3OCvY9ThdWzwNTzL92OCvY9ThdWzwNTzL9zgr2PU4XVs8DU8y/dngr2Bg4XVs8DU8y/djgr2Bg4XVs8DU8y/dngr2Bg4XVs8DU8y/c4K9gYOF1bPA1PMv3OCvYGDhdWzwNTzL9zgr2Bg4XVs8DU8y/c4K9mUPDsBmGNBs0BYm1p6yRWsdIfVeXp//9k=';
    if (user.user.profile_photo) profileUrl = `https://artbot.mypinata.cloud/ipfs/${user.user.profile_photo}?img-width=100`;
    return (
        <div className="w-100 mt-4 profile-head ">
            <div
                className="w-100"
                style={{
                    backgroundImage: `url(${backgroundUrl})`,
                    height: '17rem',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="d-flex  h-100 justify-content-between">
                    <div className="text-white  mt-3 ml-3 profile-head-left text-white">
                        {edit && (
                            <React.Fragment>
                                <Label
                                    htmlFor="profileCover"
                                    className="pointer profile-head-left__editCover ">
                                    <Icons.FaCamera />
                                    <input
                                        onChange={(e) => updateCover(e.target.files[0])}
                                        type="file"
                                        accept="image/*"
                                        id="profileCover"
                                        className="d-none"
                                    />
                                </Label>
                                <Small className="ml-1">UPLOAD COVER ART</Small>
                            </React.Fragment>
                        )}
                    </div>

                    <div className="profile-head-right d-flex flex-column justify-content-between">
                        <div className="profile-head-right__badge" />
                        <div className="profile-head-right__social p-3 mb-1 mr-3 text-white d-flex">
                            <a
                                href={user.user.twitter ? user.user.twitter : ''}
                                style={{ color: 'white' }}>
                                <Img
                                    width="20"
                                    height="20"
                                    src={'/img/twitter.png'}
                                    style={{ marginTop: '-4px' }}
                                    alt="twitter"
                                />{' '}
                                Twitter{' '}
                            </a>
                            <a
                                className="mx-2"
                                href={user.user.facebook ? user.user.facebook : ''}
                                style={{ color: 'white' }}>
                                <Img
                                    src={'/img/facebook.png'}
                                    width="20"
                                    height="20"
                                    style={{ marginTop: '-1px' }}
                                    alt="facebook"
                                />{' '}
                                FaceBook{' '}
                            </a>
                            <a
                                href={user.user.instagram ? user.user.instagram : ''}
                                style={{ color: 'white' }}>
                                <Img src={'/img/instagram.png'} alt="instagram" width="20" height="20" /> Instagram{' '}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-head-bottom d-flex">
                <span className="profile-head-bottom__img ">
                    <span>
                        <Img
                            src={profileUrl}
                            className={`rounded-pill ${clsx({ brightness: edit })}  `}
                            width="100"
                            height="100"
                            alt="profile_user"
                        />
                        {edit && (
                            <Label
                                htmlFor="profile"
                                className="pointer profile-head-bottom__img-overlay  rounded-pill d-block  w-100 h-100">
                                <Icons.FaCamera className="d-block mx-auto" color="white" />
                                <input
                                    onChange={(e) => profileHandler(e.target.files[0])}
                                    type="file"
                                    accept="image/*"
                                    id="profile"
                                    className="d-none"
                                />
                            </Label>
                        )}
                    </span>
                </span>
                <div className=" profile-head-bottom__text  ">
                    <span
                        className="text-white d-block "
                        style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            textTransform: 'initial'
                        }}>
                        {user.user.profile_name || user.user.username}{' '}
                        {update && (
                            <Icons.FaEdit className="pointer" onClick={() => setEdit(!edit)} />
                        )}
                    </span>
                    <span
                        className="profile-head-bottom__text-desc d-block"
                        style={{
                            fontSize: '14px',
                            fontWeight: '400',
                            textTransform: 'initial'
                        }}>
                        {user.user.username}
                    </span>
                </div>
            </div>
            <div className="profile-head-bottom__subscribe ">
                {user.user?._id && users?._id !== user.user?._id && (
                    <SubscriptionDropdownIndependent
                        userId={user.user._id}
                        subscriptions={user.user.subscriptions}
                        content_type="video"
                        onSuccess={paymentonSuccessHandler}
                        onError={paymentonErrorHandler}
                    />
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    users: state.auth.user,
    user: state.profile.profileUser,
    subscrPrice: state.profile.selectedSubscription
});

export default React.memo(
    connect(mapStateToProps, { profileUser, selectSubscription, paymentProfile })(
        ProfileHeadSection
    )
);
