import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div id='current-count-txt' className='white f3'>
                {`${name}, your current entry count is...`}
            </div>
            <div id='entries-txt' className='white f1'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;