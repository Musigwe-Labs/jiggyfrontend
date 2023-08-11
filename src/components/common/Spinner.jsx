import React from 'react'

const Spinner = () => {

    return (
        <div className="w-full">
            <img 
                src={'/spinner2.png'}
                alt="Loading..."
                className='animate-spin'
                style={{ width: '135px', margin: '0px auto', display: 'block' }}
            />
        </div>
    )
}

export default Spinner