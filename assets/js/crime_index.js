var crimes_statistic = crimes_statistic
var crimes_type = ['ARSON', 'ASSAULT', 'BATTERY', 'BURGLARY',
'CONCEALED CARRY LICENSE VIOLATION', 'CRIM SEXUAL ASSAULT',
'CRIMINAL DAMAGE', 'CRIMINAL TRESPASS', 'DECEPTIVE PRACTICE',
'GAMBLING', 'HOMICIDE', 'HUMAN TRAFFICKING',
'INTERFERENCE WITH PUBLIC OFFICER', 'INTIMIDATION', 'KIDNAPPING',
'LIQUOR LAW VIOLATION', 'MOTOR VEHICLE THEFT', 'NARCOTICS',
'NON-CRIMINAL', 'OBSCENITY', 'OFFENSE INVOLVING CHILDREN',
'OTHER OFFENSE', 'PROSTITUTION', 'PUBLIC PEACE VIOLATION',
'ROBBERY', 'SEX OFFENSE', 'STALKING', 'THEFT', 'WEAPONS VIOLATION']

function crimesType (index = 0) {
    return crimes_type[index]
}

function crimeIdx (crimeWeight = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]){
    var crimeIdx = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    for (crime in crimes_type){
        var crime_name = crimes_type[crime]
        var crime_statistic = crimes_statistic[crime_name]
        var crime_max = crime_statistic['max']
        var crime_min = crime_statistic['min']
        // console.log(crime_name, crime_max, crime_min)
        for (district in crime_statistic['crimes_per_district']){
            console.log(district)
            var crime_district = crime_statistic['crimes_per_district'][district]
            crimeIdx[district-1] += parseInt (crimeWeight[district-1] * (crime_district - crime_min) / (crime_max-crime_min)) || 0
        }
    }
    return crimeIdx 
}

function normalize(min, max) {
    var delta = max - min;
    return function (val) {
        return (val - min) / delta;
    };
}
