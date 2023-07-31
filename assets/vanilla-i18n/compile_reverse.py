import csv
import json
from typing import List, Dict, Union

def flatten_dict(data, parent_key='', sep='.'):
    items = []
    for k, v in data.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

# Read input JSON file
with open("English.json", "r") as f:
    json_data = json.load(f)

# Flatten the nested dictionaries in the JSON data
flattened_data = flatten_dict(json_data)#[flatten_dict(lang_data) for lang_data in json_data.values()]


# Get all unique keys across all languages
all_keys = flattened_data.keys()

# Prepare the CSV output
with open("modelmetadata.csv", "w", newline='') as csvfile:
    writer = csv.writer(csvfile)

    # Write the header row with language codes
    language_codes = list(json_data.keys())
    writer.writerow(['Key'] + language_codes)

    # Write the data row by row
    for key in all_keys:
        row = [key]
        value = flattened_data.get(key, '')
        row.append(value)
        writer.writerow(row)