import FetchData from '../../fetchData/weaponsGrid'

function SMG() {
    return(
        <FetchData url="http://localhost:3001/SubMachineGuns" />
    )
}

export default SMG