let provinces = [
    'AB',
    'BC',
    'MB',
    'NB',
    'NL',
    'NT',
    'NS',
    'NU',
    'ON',
    'PE',
    'QC',
    'SK',
    'YT'
]

function isValid(province){
    return provinces.includes(province)
}

exports.isValid = isValid