import React from 'react';
import styles from './AccordionItem.module.css';

export interface Props {
    index: number;
    text: string;
    isOpen?: boolean;
    subItems?: string[];
    onTitleClick?: (index: number) => void;
    onSubItemClick?: () => void;
    onSubItemDblClick?: (item: string) => void;
}

const AccordionItem: React.FC<Props> = ({
    index,
    text,
    isOpen,
    subItems,
    onTitleClick,
    onSubItemClick,
    onSubItemDblClick,
}) => {
    return (
        <div className={styles.accordionItem}>
            <div
                className={styles.accordionTitle}
                onClick={() => onTitleClick && onTitleClick(index)}
            >
                <span>{ isOpen ? '\u25BC' : '\u25BA' }</span>
                { text }
            </div>
            { isOpen && subItems &&
            <ul className={styles.accordionSubList}>
                { subItems.map((item, idx) =>
                    <li
                        key={idx}
                        onClick={onSubItemClick}
                        onDoubleClick={() => onSubItemDblClick && onSubItemDblClick(item)}
                    >
                        {item}
                    </li>)
                }
            </ul> }
        </div>
    );
}

export default AccordionItem;