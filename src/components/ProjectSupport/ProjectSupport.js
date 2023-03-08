import React from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
import dynamic from 'next/dynamic';
import P1 from '../UI/P1/P1';
const StripeButton = dynamic(() => import('../StripeButton/StripeButton'), { ssr: false });
const ProjectSupport = ({ donateChange, donate, onSuccess, userId }) => {
    return (
        <div className="project-revenue w-100 mx-1 p-3 my-2">
            <Label>Donate Amount($)</Label>
            <Input
                className="form-control  bg-transparent form-input__feild mb-1"
                type="number"
                min="1"
                value={donate.value}
                onChange={donateChange}
            />
            {(userId && !donate.error  )? (
                <StripeButton amount={+donate?.value} onSuccess={onSuccess} />
            ) : (
                <P1 className="mb-0 text-danger">
                    {donate.error ? 'Please enter valid number' : 'Please Login Before Donation'}
                </P1>
            )}
        </div>
    );
};

export default React.memo(ProjectSupport);
