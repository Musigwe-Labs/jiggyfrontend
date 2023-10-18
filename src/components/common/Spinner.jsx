
import spin from "../../assets/jiggy.png"

const Spinner = () => {

    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img 
                src={spin}
                alt="Loading..."
                className='animate_popping'
                style={{ width: '4rem', margin: '0px auto', display: 'block' }}
            />
        </div>
    )
}

export default Spinner