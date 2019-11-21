import csv
import json

frm = ['ID', 'Case Number', 'Date', 'Block', 'IUCR', 'Primary Type', 'Description', 'Location Description', 
'Arrest', 'Domestic', 'Beat', 'District', 'Ward', 'Community Area', 'FBI Code', 'X Coordinate',
'Y Coordinate', 'Year', 'Updated On', 'Latitude', 'Longitude', 'Location']

def find(lst, key, value):
    for i, dic in enumerate(lst):
        if dic[key] == value:
            return i
    return -1

def crimes_per_year(filename, years, limit = 100):
    crime_dic = []
    y = years.copy()
    z = [0]*len(y)
    for x in y:  
        obj = {
                'year'   : x,
                'crimes' : [],
                'counts' : []
        }
        crime_dic.append(obj)
    # count = limit # delete diz

    with open(filename, "r") as csvfile:
        datareader = csv.reader(csvfile)
        next(datareader) # skip header~
        for row in datareader:
            # if count <= 0 : # delete diz
                # break       # delete diz
            if row[17] in y :
                idx = years.index(row[17])
                if row[5].lower() not in crime_dic[idx]['crimes']:
                    crime_dic[idx]['crimes'].append(row[5].lower())
                    crime_dic[idx]['counts'].append(1)
                else :
                    idy = crime_dic[idx]['crimes'].index(row[5].lower())
                    crime_dic[idx]['counts'][idy] += 1
                # count -= 1 # delete diz
            
    return crime_dic

if __name__ == "__main__":
    from tqdm import tqdm
    years = [str(x) for x in range(2001, 2019)]
    data = crimes_per_year('data/crimes_all.csv', years)
    dats = []
    for dat in tqdm(data):
        dats.append({
            'year' : dat['year'],
            'crimes' : dict(zip(dat['crimes'], dat['counts']))
        })
    filename = 'crimes_%s_%s.json'%('all', 'per-year')
    with open(filename, 'w') as d:
        json.dump(dats, d)
