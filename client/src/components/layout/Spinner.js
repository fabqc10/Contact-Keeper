import React,{Fragment} from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img 
            src={spinner}
            style={{width:'150',margin:'auto',display:'block'}}
            alt={'Loading...'}
            />
        </Fragment>
    )
}

export default Spinner
