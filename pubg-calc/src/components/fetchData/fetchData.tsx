import { useState, useEffect } from 'react'
import './fetchData.css'
import Modal from '../modal/modal'

interface IWeapon {
    id: number;
    name: string;
    image: string;
}

interface FetchDataProps {
    url: string;
}

function FetchData({ url }: FetchDataProps) {
    const [records, setRecords] = useState<IWeapon[]>([])
    const [selectedWeapon, setSelectedWeapon] = useState<IWeapon | null>(null)

    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => setRecords(data))
        .catch(err => console.log(err))
    }, [url])

    function handleWeaponClick (weapon: IWeapon) {
        setSelectedWeapon(weapon)
    }

    function handleCloseModal () {
        setSelectedWeapon(null)
    }

    return (
        <>
            <div className='weapon_cell'>
                {records.map((el) =>(
                    <div key={el.id} onClick={() => handleWeaponClick(el)}>
                        <h1>{el.name}</h1>
                        <img src={el.image} alt={el.name}></img>
                    </div>
                ))}
            </div>
            {selectedWeapon && (
                <Modal show={!!selectedWeapon} onClose={handleCloseModal}>
                    <h1 className='modal-title'>{selectedWeapon.name}</h1>
                    <img src={selectedWeapon.image} alt={selectedWeapon.name} className='modal-image'/>
                </Modal>
            )}
        </>
    )
}

export default FetchData