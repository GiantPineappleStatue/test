import React, { Suspense } from 'react';

const WaitingComponent = (Component) => {
    console.log('Waiting', C);
    return (props) => (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    );
};

export default WaitingComponent;
