import FetchData from '../../fetchData/weaponsGrid'

function HandGun() {
    return(
        <FetchData url="http://localhost:3001/Handgun" />
    )
}

export default HandGun