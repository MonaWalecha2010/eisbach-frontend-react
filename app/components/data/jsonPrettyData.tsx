import styles from '../../styles/styles.module.scss'
export const JsonPrettyColorCodes = {
    main: 'color: grey;',
    key: 'color:#00008b;',
    value: 'color:#21b721;',
    string: 'color:#21b721;',
    null: 'color: #0096FF;',
    boolean: 'color:#0096FF;'
}
export const JsonPrettyStyles = {
    mainStyle: `background:#ffffff; line-height:1.3; max-width:100%; overflow:auto;`,
    // keyStyle: `font-family:${styles.fontMenlo}; font-size:.938rem;`,
    // valueStyle: `font-family:${styles.fontMenlo}; font-size:.938rem;`,
    // booleanStyle: `font-family:${styles.fontMenlo}; font-size:.938rem;`,
    stringStyle: `white-space: pre-wrap;`,
    // errorStyle: `font-family:${styles.fontMenlo}; font-size:.938rem; overflow:wrap;`
}