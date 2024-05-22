export function primary(condition) {
    return {
        backgroundColor: 
            condition.includes('day') ? '#ffb35b' :
            condition.includes('night') ? '#3d3d3d' :
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
            condition.includes('night') ? '#3d3d3d' :
            condition.includes('day') ? '#ffb35b' :
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
            '#black'
    }
}