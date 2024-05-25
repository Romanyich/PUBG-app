import { useState, useEffect } from 'react'
import './calculator.css'

interface IItem {
  id: number;
  name: string;
  image: string;
  damage?: number;
  reduction?: number;
}

function Calculator() {
  const [figure, setFigure] = useState<IItem | null>(null);
  const [guns, setGuns] = useState<IItem[]>([]);
  const [helmets, setHelmets] = useState<IItem[]>([]);
  const [armors, setArmors] = useState<IItem[]>([]);

  useEffect(() => {
    fetchData('http://localhost:3001/Calculator')
      .then(data => {
        const figureItem = data.find((item: IItem) => item.name === 'figure');
        setFigure(figureItem);
        setHelmets(data.filter((item: IItem) => item.name.startsWith('helmet')));
        setArmors(data.filter((item: IItem) => item.name.startsWith('armor')));
      })
      .catch(error => console.error('Error fetching data:', error));

    const gunEndpoints = [
      'http://localhost:3001/AssaultRifles',
      'http://localhost:3001/DesignatedMarksmanRifle',
      'http://localhost:3001/SubMachineGuns',
      'http://localhost:3001/SniperRifles',
      'http://localhost:3001/Shotgun',
      'http://localhost:3001/Handgun'
    ];

    Promise.all(gunEndpoints.map(endpoint => fetchData(endpoint)))
      .then(results => setGuns(results.flat()))
      .catch(error => console.error('Error fetching guns:', error));
  }, []);

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  return (
    <section className="calculator">
      <div className="figure">
        {figure && <img src={figure.image} alt="Figure" />}
      </div>
      <div className="calc_container">
        <div className="armor_container">
          <div className="helm_container">
            {helmets.map(helmet => (
              <img key={helmet.id} src={helmet.image} alt={helmet.name} />
            ))}
          </div>
          <div className="chest_container">
            {armors.map(armor => (
              <img key={armor.id} src={armor.image} alt={armor.name} />
            ))}
          </div>
        </div>
        <div className="guns">
          {guns.map(gun => (
            <div key={gun.id} className="gun">
              <p>{gun.name}</p>
              <img src={gun.image} alt={gun.name} />
              <p>Damage: {gun.damage} </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Calculator