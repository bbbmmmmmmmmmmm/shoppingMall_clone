import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {
    const [searchTerms, setSearchTerms] = useState('');

    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setSearchTerms(value);
        props.refreshFunction(value);
    }

    return (
        <div>
            <Search
                value={searchTerms}
                onChange={onChange}
                placeholder='Search By Typing...'
            />
        </div>
    )
}

export default SearchFeature
