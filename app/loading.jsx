'use client'
import ClipLoader from 'react-spinners/ClipLoader'

const Loading = () => {

    const override = {
        display : 'block',
        margin: '100px auto'
    }
    return (
        <div>
            <ClipLoader 
            cssOverride={override} 
            color="#3b82f6"
            size={150}
            aria-label = 'Loading Spinner'
            />
        </div>
    );
}

export default Loading;
