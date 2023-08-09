import React from 'react'
import spin from '../../assets/spinner2.png'

const Spinner = () => {

    return (
        <div className="w-full">
            <img 
                src={spin}
                alt="Loading..."
                className='animate-spin'
                style={{ width: '135px', margin: '0px auto', display: 'block' }}
            />
        </div>
    )
}

export default Spinner