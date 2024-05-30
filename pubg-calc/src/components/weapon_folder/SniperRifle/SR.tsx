import FetchData from '../../fetchData/weaponsGrid'

function SR() {
    return(
        <FetchData url="http://localhost:3001/SniperRifles" />
    )
}

export default SR