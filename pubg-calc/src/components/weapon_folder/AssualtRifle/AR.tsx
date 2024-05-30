import FetchData from '../../fetchData/weaponsGrid'

function AR() {
    return(
        <>
            <FetchData url="http://localhost:3001/AssaultRifles" />
        </>
    )
}

export default AR