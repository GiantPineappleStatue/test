import React from 'react';
import P1 from '../../components/UI/P1/P1';
import Input from '../../components/UI/Input/Input';
import Label from '../../components/UI/Label/Label';
import { inputChange } from '../../redux/actions/videoUpload';
import { connect } from 'react-redux';
import TrackPrice from '../../components/TrackPrice/TrackPrice';
import Layout from '../../components/LayoutV2/LayoutV2';
import { authInitialProps } from '../../utils/withAuth';
function AudioMonetization({ inputChange, price, albumAvailablity, audioTracks }) {
    return (
        <Layout>
            <div className="container-fluid monetization">
                <div className="row">
                    <div className="col-sm-4">
                        <P1 className="mb-1 sub-menu-bg px-3 py-2 rounded d-inline-block">
                            Downloads
                        </P1>
                        <div className="horizontal-line" />
                        <div className="video-monetization-price mt-2 ml-3 mb-5">
                            <P1 className="mb-0 text-white">Album Price</P1>
                            <Input
                                className="form-control text-white bg-transparent monetization-textfeild"
                                type="number"
                                value={price}
                                name="albumPrice"
                                onChange={inputChange}
                            />
                            {/** Album Price */}
                            <div className="mt-3">
                                <P1 className="mb-1 text-white">Track Price</P1>
                                <div className="horizontal-line" />
                                {audioTracks.map((k, i) => (
                                    <TrackPrice index={i + 1} />
                                ))}
                            </div>

                            <div className="mr-2 mt-2">
                                <Input
                                    type="checkbox"
                                    id="checkbo"
                                    checked={albumAvailablity}
                                    required={false}
                                    name="albumAvailablity"
                                    onChange={(e) =>
                                        inputChange({
                                            target: { name: e.target.name, value: e.target.checked }
                                        })
                                    }
                                />
                                <Label
                                    htmlFor="checkbo"
                                    className="text-white d-inline font-weight-light  ">
                                    Make Video only available through download
                                </Label>
                            </div>
                            <P1 className="mb-2 font-12 monetization__text ">
                                This makes your audio only accessable after purchase
                            </P1>
                            <div className="horizontal-line" />
                        </div>
                        {/** Subscritpions Section */}
                        <div className="video-subscriptions mb-5">
                            <P1 className="mb-2 rounded bg-primary-light text-white d-inline-block pointer px-3 py-2 ">
                                Subscriptions
                            </P1>
                            <div className="horizontal-line" />
                            <P1 className=" monetization-coming mt-2 ml-3">Coming soon</P1>
                        </div>
                        {/** Ad revenue Section */}
                        <div className="video-subscriptions ">
                            <P1 className="mb-2 rounded bg-primary-light text-white d-inline-block pointer px-3 py-2 ">
                                Ad Revenue
                            </P1>
                            <div className="horizontal-line" />
                            <P1 className=" monetization-coming  mt-2 ml-3">Coming soon</P1>
                        </div>
                    </div>
                    <div className="col-sm-4" />
                    <div className="col-sm-4" />
                </div>
            </div>
        </Layout>
    );
}
AudioMonetization.getInitialProps = authInitialProps('protected');
const mapStateToProps = (state) => ({
    price: state.videoUpload.albumPrice.value,
    albumAvailablity: state.videoUpload.albumAvailablity.value,
    audioTracks: state.videoUpload.audioTracks
});
export default connect(mapStateToProps, { inputChange })(AudioMonetization);
