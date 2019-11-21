import json
from more_itertools import locate

def find(key, keys):
    return list(locate(keys, lambda x: x == key))

def sort(dict_list, reverse = True):
    return sorted(dict_list.items(), key = lambda kv: kv[1], reverse=reverse)

def prepro_keys(dict_list):
    keys = list(dict_list.keys())
    keys_stripped = [x.replace(" ", "") for x in keys]
    found = []
    for i, key in enumerate(keys):
        finds = find(key.replace(" ", ""), keys_stripped)
        if len(finds) > 1:
            idx = finds.index(keys.index(key))
            finds.pop(idx)
            for f in finds:
                dict_list[key] += dict_list[keys[f]]
                del dict_list[keys[f]]
                del keys[f]
                del keys_stripped[f]

def count(dict_list):
    keys = list(dict_list.keys())
    res = 0
    for key in keys:
        res += dict_list[key]
    return res

def process(data_path, top_n = 0, last = True):
    with open(data_path) as json_file:
        data = json.load(json_file)
        crimes = []
        for dat in data:
            prepro_keys(dat['crimes'])
            crimes = list(set(crimes) | set(dat['crimes'].keys()))
            addition = (set(crimes) - set(dat['crimes'])) | (set(dat['crimes']) - set(crimes))
        for dat in data:
            keys = list(dat['crimes'].keys())
            diff = set(crimes) | set(keys)
            diff = list(diff - set(keys))
            for crim in diff:
                if crim not in keys:
                    dat['crimes'][crim] = 0
            prepro_keys(dat['crimes'])
            dat['crimes'] = dict(sort(dat['crimes']))
    if top_n > 0:
        res = []
        if last :
            dat = data.pop(-1)
            keys = list(dat['crimes'].keys())[:top_n]
        else:
            dat = data.pop()
            keys = list(dat['crimes'].keys())[:top_n]
        for dat in data:
            x = {   
                    'year'  : dat['year'],
                    'crimes' : {}
                }
            for key in keys:
                x['crimes'][key] = dat['crimes'][key]
            res.append(x)
        del data
        data = res
    return data

if __name__ == "__main__":
    data_path = 'crimes_all_per-year.json'
    data = process(data_path)
    print(data)
    filename = 'crimes_%s_%sv2.json'%('all', 'per-year')
    with open(filename, 'w') as d:
        json.dump(data, d)