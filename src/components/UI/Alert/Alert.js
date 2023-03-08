import React from 'react';

export default ({ type, children }) => {
    return (
        <div className={`alert mt-2 ${type} alert-dismissible fade show`} role="alert">
            {children}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};
