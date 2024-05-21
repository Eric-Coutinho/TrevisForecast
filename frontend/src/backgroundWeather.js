export function primary(condition) {
    return {
        backgroundColor: 
            condition.includes('day') ? '#00c1e9' :
            condition.includes('night') ? '#000' :
            '#989898',
        color:
            condition.includes('day') ? 'white' :
            condition.includes('night') ? 'white' :
            'black'
    }
}

export function secondary(condition) {
    return {
        backgroundColor: 
            condition.includes('snow') ? 'white' :
            condition.includes('sleet') ? '#7df4ff' :
            condition.includes('thunder') ? '#3c6770':
            condition.includes('hail') ? '#5290b6' :
            condition.includes('rain') ? '#507e93' :
            condition.includes('showers') ? '#9ae3fd' :
            condition.includes('cloudy') ? '#d8d8d8' :
            condition.includes('night') ? '#000' :
            condition.includes('clear') ? '#00c1e9' :
            '#a9a9a9',
        color:
            condition.includes('snow') ? 'black' :
            condition.includes('sleet') ? 'black' :
            condition.includes('thunder') ? 'white':
            condition.includes('hail') ? 'white' :
            condition.includes('rain') ? 'white' :
            condition.includes('showers') ? 'black' :
            condition.includes('cloudy') ? 'black' :
            condition.includes('night') ? 'white' :
            condition.includes('clear') ? 'white' :
            '#000'
    }
}