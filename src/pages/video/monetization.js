import React, { useState } from 'react';
import P1 from '../../components/UI/P1/P1';
import Input from '../../components/UI/Input/Input';
import Label from '../../components/UI/Label/Label';
import { inputChange } from '../../redux/actions/videoUpload';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../../components/LayoutV2/LayoutV2';
import { authInitialProps } from '../../utils/withAuth';
function VideoMonetization({ inputChange, price, albumAvailablity, history }) {
    const router = useRouter();
    const content_type = router.pathname.split('/')[1];
    return (
        <Layout>
            <div className="container-fluid  monetization">
                <div className="row">
                    <div className="col-10 col-xl-7">
                        <P1 className="mb-1 monetization-title px-3 py-2 rounded d-inline-block">
                            Downloads
                        </P1>
                        <div className="horizontal-line" />
                        <div className="video-monetization-price mt-2 ml-3 mb-5">
                            <P1 className="mb-0 text-white">Download Price</P1>
                            <Input
                                className="form-control text-white  bg-transparent monetization-textfeild"
                                type="number"
                                value={price.value}
                                name="albumPrice"
                                onChange={inputChange}
                            />
                            {price.value < 1 && price.touch && (
                                <span className="text-danger">
                                    Download price should be positive number
                                </span>
                            )}
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
                                    Make{' '}
                                    {content_type.charAt(0).toUpperCase() + content_type.slice(1)}{' '}
                                    only available through download
                                </Label>
                            </div>
                            <P1 className="mb-2 font-12  monetization__text">
                                This makes your {content_type} only accessable after purchase
                            </P1>

                            <div className="horizontal-line" />
                        </div>

                        {/** Ad revenue Section */}
                        {/* <div className="video-subscriptions ">
						<P1 className="mb-2 rounded monetization-title  text-white d-inline-block pointer px-3 py-2 ">
							Ad Revenue
						</P1>
						<div className="horizontal-line" />

						<P1 className="monetization-coming mt-2 ml-3">Coming soon</P1>
					</div> */}
                    </div>
                    <div className="col-sm-4" />
                    <div className="col-sm-4" />
                </div>
            </div>
        </Layout>
    );
}
VideoMonetization.getInitialProps = authInitialProps('protected');
const mapStateToProps = (state) => ({
    price: state.videoUpload.albumPrice,
    albumAvailablity: state.videoUpload.albumAvailablity.value
});
export default connect(mapStateToProps, { inputChange })(VideoMonetization);
