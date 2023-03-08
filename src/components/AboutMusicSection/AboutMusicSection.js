import React from 'react';
import AboutMusicCard from '../AboutMusicCard/AboutMusicCard';
export default () => (
    <div className="container  p-4 mt-3">
        <div className="d-md-flex b-secondary p-4  justify-content-between text-center ">
            <AboutMusicCard
                src={require('../../../img/animator-1.png')}
                title="Animator"
                description="25%"
                price="0.00"
                color="color-blue"
                backgroundColor="bg-color-blue"
            />
            <AboutMusicCard
                src={require('../../../img/writer-1.png')}
                title="Writer"
                description="10%"
                price="0.00"
                color="color-blue"
                backgroundColor="bg-color-blue"
            />
            <AboutMusicCard
                src={require('../../../img/voice-actor-1.png')}
                title="Voice Actor"
                description="25%"
                price="0.00"
                color="color-green"
                backgroundColor="bg-color-green"
            />
            <AboutMusicCard
                src={require('../../../img/director-1.png')}
                title="Director"
                description="20%"
                price="0.00"
                color="color-green"
                backgroundColor="bg-color-green"
            />
            <AboutMusicCard
                src={require('../../../img/Musician-1.png')}
                title="Musician"
                description="20%"
                price="0.00"
                color="color-purple"
                backgroundColor="bg-color-purple"
            />
        </div>
    </div>
);
