import React,{ useState } from 'react';
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse;

const continents = [
    {
        '_id': 1,
        'name': 'Africa'
    },
    {
        '_id': 2,
        'name': 'Europe'
    },
    {
        '_id': 3,
        'name': 'Asia'
    },
    {
        '_id': 4,
        'name': 'North America'
    },
    {
        '_id': 5,
        'name': 'South America'
    },
    {
        '_id': 6,
        'name': 'Australia'
    },
    {
        '_id': 7,
        'name': 'Antarctica'
    },
]

function CheckBox(props) {
    const [checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        props.handleFilters(newChecked);
    }

    const renderCheckboxLists = () => continents.map((value, index) => (
        <div key={index}>
            <Checkbox
                onChange={() => handleToggle(value._id)}
                type='checkbox'
                checked={checked.indexOf(value._id) === -1 ? false : true}
            />
            <span>{value.name}</span>
        </div>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel key='1'>
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
