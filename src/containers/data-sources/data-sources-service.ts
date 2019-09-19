import _ from 'lodash';
//@ts-ignore
import randomWords from 'random-words';

/**
 * Generate n random words. 
 * @param n No of words to generate.
 */
const getNRandomWords = (n: number) => {
    let words = [];
    for(let i = 0; i < n; i++) {
        words.push(randomWords({exactly: 2, join: ' '}));
    }
    return words;
}

/**
 * Get Tables info.
 */
export function getTables(): Promise<any> {
    let tables: any[] = [];
    for(let i = 0; i < _.random(2, 3); i++) {
        tables.push({
            id: _.uniqueId(),
            name: randomWords({exactly: 2, join: ' '}),
            isOpen: false,
            columns: getNRandomWords(_.random(1, 7)),
        });
    }

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                tables
            )
        }, Math.random() * 1000);
    });
}