import csv
import json

frm_req = ['ID', 'Primary Type','X Coordinate', 'Y Coordinate','Latitude', 'Longitude', 'Location']

frm = ['ID', 'Case Number', 'Date', 'Block', 'IUCR', 'Primary Type', 'Description', 'Location Description', 
'Arrest', 'Domestic', 'Beat', 'District', 'Ward', 'Community Area', 'FBI Code', 'X Coordinate',
'Y Coordinate', 'Year', 'Updated On', 'Latitude', 'Longitude', 'Location']

# function to compare 2 list --> return true if required field are not null
def matched(required, row):
    for attr in required:
        if len(row[frm.index(attr)]) > 0:
            pass
        else:
            return False
    return True

def crimes_per_year(filename, years, limit = 100, req = frm_req):
    crime_dic = []
    stop = len(years)
    total = {
        'null' : 0,
        'incomplete' : 0
    }
    for x in years:
        obj = {
            'year' : x,
            'data' : []
        }
        crime_dic.append(obj)
    with open(filename, "r") as csvfile:
        datareader = csv.reader(csvfile)
        next(datareader) # skip header~
        for row in datareader:
            if stop <= 0:
                break
            try :
                idx = years.index(int(row[17]))
                if len(crime_dic[idx]['data']) < limit:
                    if matched(req, row) :
                        crime_dic[idx]['data'].append(dict(zip(frm, row)))
                    if len(crime_dic[idx]['data']) >= limit :
                        stop -= 1
            except ValueError :
                pass
    return crime_dic

if __name__ == "__main__":
    years = [x for x in range(2001, 2019)] # range tahunnya, ini ku set 2001 ~ 2019
    limit = 20000 # diisi untuk banyak sampling per tahunnya
    dats = crimes_per_year('data/crimes_all.csv', years, limit, req = frm_req)
    for dat in dats:
        filename = 'crimes_%d_%d.json'%(dat['year'], limit)
        with open(filename, 'w') as d:
            json.dump(dat['data'], d)


