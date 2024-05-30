import FetchData from '../../fetchData/weaponsGrid'

function ShotGun() {
    return(
        <FetchData url="http://localhost:3001/Shotgun" />
    )
}

export default ShotGun