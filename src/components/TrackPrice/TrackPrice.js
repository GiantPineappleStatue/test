import React from 'react';
import { connect } from 'react-redux';
import P1 from '../UI/P1/P1';
import Input from '../UI/Input/Input';
import { trackPriceChange } from '../../redux/actions/videoUpload';

function TrackPrice({ index, audioTracksPrice, trackPriceChange }) {
    return (
        <div className="d-flex  align-items-stretch my-2 ">
            <P1
                style={{ paddingTop: '9px', paddingBottom: '9px' }}
                className="text-nowrap mb-0 py-auto align-self-stretch text-white px-2 ">
                Track-{index < 10 && '0'}
                {index}
            </P1>
            <Input
                className="form-control text-white ml-2 bg-transparent "
                type="number"
                value={audioTracksPrice[index - 1].value}
                name={`track-${index}`}
                onChange={(e) =>
                    trackPriceChange({
                        index: index - 1,
                        name: e.target.name,
                        value: e.target.value
                    })
                }
            />
        </div>
    );
}
const mapStateToProps = (state) => ({
    audioTracksPrice: state.videoUpload.audioTracksPrice
});

export default connect(mapStateToProps, { trackPriceChange })(TrackPrice);
