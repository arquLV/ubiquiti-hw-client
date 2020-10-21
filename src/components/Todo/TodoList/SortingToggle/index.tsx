import React from 'react';
import styled from 'styled-components';

import { ItemSortingMode } from '../../../../store/todo/types';

const SortingToggleContainer = styled.div`
    position: absolute;
    bottom: 16px;
    right: 0;

    text-transform: uppercase;
    font-size: 12px;
    color: ${props => props.theme.colors.black};
`;

const Selector = styled.select`
    width: 100px;

    font-size: inherit;
    font-family: inherit;
    text-transform: inherit;
    margin-left: 8px;

    border: none;
    appearance: none;

    cursor: pointer;

    &:hover {
        color: ${props => props.theme.colors.blue};
    }

    &:focus {
        outline: none;
    }

    option {
        color: ${props => props.theme.colors.black};
    }
`;

type SortingToggleProps = {
    onSelect?: (newValue: ItemSortingMode) => void,
}
const SortingToggle: React.FC<SortingToggleProps> = props => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onSelect?.(e.target.value as ItemSortingMode);
    }

    return (
        <SortingToggleContainer>
            <span>View:</span>
            <Selector onChange={handleChange}>
                <option value={ItemSortingMode.All}>All Items</option>
                <option value={ItemSortingMode.Pending}>Pending only</option>
                <option value={ItemSortingMode.Done}>Done only</option>
            </Selector>  
        </SortingToggleContainer>
    );
}

export default SortingToggle;