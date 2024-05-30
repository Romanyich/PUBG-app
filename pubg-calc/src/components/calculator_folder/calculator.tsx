import { useState, useEffect } from 'react';
import './calculator.css';

interface IItem {
  id: number;
  name: string;
  image: string;
  damage?: number;
  reduction?: number;
  category?: string; // Add category property to IItem
}

interface DamageValues {
  head: number;
  neck: number;
  chest: number;
  up_stomach: number;
  low_stomach: number;
  groin: number;
  shoulder: number;
  up_arm: number;
  low_arm: number;
  hand: number;
  thigh: number;
  calf: number;
  foot: number;
}

function Calculator() {
  const [figure, setFigure] = useState<IItem | null>(null);
  const [guns, setGuns] = useState<IItem[]>([]);
  const [helmets, setHelmets] = useState<IItem[]>([]);
  const [armors, setArmors] = useState<IItem[]>([]);
  const [selectedGun, setSelectedGun] = useState<IItem | null>(null);
  const [selectedHelmet, setSelectedHelmet] = useState<IItem | null>(null);
  const [selectedArmor, setSelectedArmor] = useState<IItem | null>(null);
  const [damageValues, setDamageValues] = useState<DamageValues>({
    head: 0,
    neck: 0,
    chest: 0,
    up_stomach: 0,
    low_stomach: 0,
    groin: 0,
    shoulder: 0,
    up_arm: 0,
    low_arm: 0,
    hand: 0,
    thigh: 0,
    calf: 0,
    foot: 0
  });

  useEffect(() => {
    const savedHelmet = localStorage.getItem('selectedHelmet');
    const savedArmor = localStorage.getItem('selectedArmor');
    const savedGun = localStorage.getItem('selectedGun');

    fetchData('http://localhost:3001/Calculator')
      .then(data => {
        const figureItem = data.find((item: IItem) => item.name === 'figure');
        setFigure(figureItem);
        setHelmets(data.filter((item: IItem) => item.name.startsWith('helmet')));
        setArmors(data.filter((item: IItem) => item.name.startsWith('armor')));

        if (savedHelmet) {
          setSelectedHelmet(JSON.parse(savedHelmet));
        } else {
          setSelectedHelmet(data.find((item: IItem) => item.name === 'helmet 0') || null);
        }

        if (savedArmor) {
          setSelectedArmor(JSON.parse(savedArmor));
        } else {
          setSelectedArmor(data.find((item: IItem) => item.name === 'armor 0') || null);
        }
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

    Promise.all(gunEndpoints.map(endpoint => fetchData(endpoint).then(data => ({
      data,
      category: endpoint.split('/').pop() || 'Unknown' // Extract category from endpoint
    }))))
      .then(results => {
        const gunsData = results.flatMap(result => result.data.map((gun: IItem) => ({
          ...gun,
          category: result.category
        })));
        setGuns(gunsData);

        if (savedGun) {
          setSelectedGun(JSON.parse(savedGun));
        } else {
          setSelectedGun(gunsData.find((gun: IItem) => gun.name === 'M416') || null);
        }
      })
      .catch(error => console.error('Error fetching guns:', error));
  }, []);

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const isShotgun = (gunName: string) => {
    const shotguns = ['S12K', 'S1897', 'S686', 'DBS', 'Sawed-Off'];
    return shotguns.includes(gunName);
  };

  const calculateDamage = (gun: IItem | null, helmet: IItem | null, armor: IItem | null): DamageValues => {
    if (!gun) {
      return {
        head: 0,
        neck: 0,
        chest: 0,
        up_stomach: 0,
        low_stomach: 0,
        groin: 0,
        shoulder: 0,
        up_arm: 0,
        low_arm: 0,
        hand: 0,
        thigh: 0,
        calf: 0,
        foot: 0
      };
    }

    const damage = gun.damage ? parseFloat(gun.damage.toString()) : 0;
    const helmetReduction = helmet ? (helmet.reduction || 0) / 100 : 0;
    const armorReduction = armor ? (armor.reduction || 0) / 100 : 0;

    let headMultiplier = 1, limbMultiplier = 1;

    switch (gun.category) {
      case 'AssaultRifles':
        headMultiplier = 2.3;
        limbMultiplier = 0.9;
        break;
      case 'DesignatedMarksmanRifle':
        headMultiplier = 2.3;
        limbMultiplier = 0.95;
        break;
      case 'SubMachineGuns':
        headMultiplier = 1.8;
        limbMultiplier = 1.2;
        break;
      case 'SniperRifles':
        headMultiplier = 2.5;
        limbMultiplier = 0.95;
        break;
      case 'Shotgun':
        headMultiplier = 1.5;
        limbMultiplier = 0.75;
        break;
      case 'Handgun':
        headMultiplier = 2.0;
        limbMultiplier = 1.0;
        break;
      default:
        headMultiplier = 1;
        limbMultiplier = 1;
        break;
    }

    return {
      head: damage * (1 - helmetReduction) * headMultiplier,
      neck: damage * (1 - helmetReduction) * 0.75 * headMultiplier,
      chest: damage * (1 - armorReduction) * 1.1,
      up_stomach: damage * (1 - armorReduction),
      low_stomach: damage * (1 - armorReduction) * 0.95,
      groin: damage * (1 - armorReduction),
      shoulder: damage * (1 - armorReduction),
      up_arm: damage * limbMultiplier * 0.6,
      low_arm: damage * limbMultiplier * 0.5,
      hand: damage * limbMultiplier * 0.3,
      thigh: damage * limbMultiplier * 0.6,
      calf: damage * limbMultiplier * 0.5,
      foot: damage * limbMultiplier * 0.3
    };
  };

  useEffect(() => {
    setDamageValues(calculateDamage(selectedGun, selectedHelmet, selectedArmor));

    if (selectedGun) {
      localStorage.setItem('selectedGun', JSON.stringify(selectedGun));
    }
    if (selectedHelmet) {
      localStorage.setItem('selectedHelmet', JSON.stringify(selectedHelmet));
    }
    if (selectedArmor) {
      localStorage.setItem('selectedArmor', JSON.stringify(selectedArmor));
    }
  }, [selectedGun, selectedHelmet, selectedArmor]);

  const renderDamageValue = (value: number, gun: IItem | null) => {
    if (gun && isShotgun(gun.name)) {
      return (
        <>
          {value.toFixed(1)}
          <sup>x9</sup>
        </>
      );
    }
    return value.toFixed(1);
  };

  return (
    <section className="calculator">
      <div className="figure">
        {figure && <img src={figure.image} alt="Figure" />}
        <span className="damage head">{renderDamageValue(damageValues.head, selectedGun)}</span>
        <span className="damage neck">{renderDamageValue(damageValues.neck, selectedGun)}</span>
        <span className="damage chest">{renderDamageValue(damageValues.chest, selectedGun)}</span>
        <span className="damage up_stomach">{renderDamageValue(damageValues.up_stomach, selectedGun)}</span>
        <span className="damage low_stomach">{renderDamageValue(damageValues.low_stomach, selectedGun)}</span>
        <span className="damage groin">{renderDamageValue(damageValues.groin, selectedGun)}</span>
        <span className="damage shoulder">{renderDamageValue(damageValues.shoulder, selectedGun)}</span>
        <span className="damage up_arm">{renderDamageValue(damageValues.up_arm, selectedGun)}</span>
        <span className="damage low_arm">{renderDamageValue(damageValues.low_arm, selectedGun)}</span>
        <span className="damage hand">{renderDamageValue(damageValues.hand, selectedGun)}</span>
        <span className="damage thigh">{renderDamageValue(damageValues.thigh, selectedGun)}</span>
        <span className="damage calf">{renderDamageValue(damageValues.calf, selectedGun)}</span>
        <span className="damage foot">{renderDamageValue(damageValues.foot, selectedGun)}</span>
      </div>
      <div className="calc_container">
        <div className="armor_container">
          <div className="helm_container">
            {helmets.map(helmet => (
              <img
                key={helmet.id}
                src={helmet.image}
                alt={helmet.name}
                onClick={() => setSelectedHelmet(helmet)}
                className={selectedHelmet?.id === helmet.id ? 'selected' : ''}
                tabIndex={0}
              />
            ))}
          </div>
          <div className="chest_container">
            {armors.map(armor => (
              <img
                key={armor.id}
                src={armor.image}
                alt={armor.name}
                onClick={() => setSelectedArmor(armor)}
                className={selectedArmor?.id === armor.id ? 'selected' : ''}
                tabIndex={0}
              />
            ))}
          </div>
        </div>
        <div className="guns">
          {guns.map(gun => (
            <div
              key={gun.id}
              className={`gun ${selectedGun?.id === gun.id ? 'selected' : ''}`}
              onClick={() => setSelectedGun(gun)}
              tabIndex={0}
            >
              <p>{gun.name}</p>
              <img src={gun.image} alt={gun.name} />
              <p>Damage: {gun.damage}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Calculator;
