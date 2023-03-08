import React from 'react';
import Radio from '@material-ui/core/Radio/Radio';
import { withStyles } from '@material-ui/core/styles';

const GreenRadio = withStyles({
    root: {
        color: '#fff',
        '&$checked': {
            color: '#90E40D'
        }
    },
    checked: {}
})((props) => <Radio color="default" {...props} />);

export default GreenRadio;
