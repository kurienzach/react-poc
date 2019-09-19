import React from 'react';

import AccordionItem from './AccordionItem';

export interface AccordionItemConfig {
    id?: number;
    text: string;
    isOpen?: boolean;
    subItems?: string[];
}

interface Props {
    items: AccordionItemConfig[];
    onTitleClick?: (item: AccordionItemConfig) => void;
    onSubItemClick?: () => void;
    onSubItemDblClick?: (item: string) => void;
}

const Accordion: React.FC<Props> = ({
    items,
    onTitleClick,
    onSubItemDblClick,
}) => {
    return (
        <div>
            { items.map((item, idx) =>
                <AccordionItem
                    key={item.id || idx}
                    index={idx}
                    text={item.text}
                    subItems={item.subItems}
                    isOpen={item.isOpen || false}
                    onTitleClick={() => onTitleClick && onTitleClick(item)}
                    onSubItemDblClick={onSubItemDblClick}
                />)
            }
        </div>
    );
}

export default Accordion;