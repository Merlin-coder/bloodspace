import SearchComponent from './search.component';

import React, { useState } from 'react';

const Search = () => {
    const [search, setSearch] = useState('');
    const [loader, setLoader] = useState(false);

    function searchData() {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }

    return <SearchComponent loader={loader} searchData={searchData} search={search} setSearch={setSearch} />;
};

export default Search;
