import FetchData from '../../fetchData/weaponsGrid'

function DMR() {
    return(
        <FetchData url="http://localhost:3001/DesignatedMarksmanRifle" />
    )
}

export default DMR