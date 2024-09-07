import pandas as pd
import random
from faker import Faker

DONT_CARE = "-"

# Initialize Faker to generate random data
fake = Faker()

# Number of rows of data to generate
num_rows = 100  # Adjust as needed

# Function to generate a row with a maximum of 4 "ENRL" values
def generate_enrollments(num_mits_columns, max_enrollments):
    table = []
    for i in range(num_rows):
        row = ["-" for _ in range(num_mits_columns)]
        # Randomly choose indices to set as "ENRL"
        enroll_indices = random.sample(range(num_mits_columns), k=min(max_enrollments, num_mits_columns))
        for idx in enroll_indices:
            row[idx] = "ENRL"

        table.append(row)
    
    for row in table:
        print(row)
    return table

# Generate random data for each column
data = {
    "StudentID": [fake.unique.random_int(min=1000, max=9999) for _ in range(num_rows)],
    "Student Name": [fake.name() for _ in range(num_rows)],
    "Personal Email": [DONT_CARE for _ in range(num_rows)],
    "University Email": [DONT_CARE for _ in range(num_rows)],
    "Student Type": [DONT_CARE for _ in range(num_rows)],
    "Offer Type": [DONT_CARE for _ in range(num_rows)],
    "Course Name": [random.choice(["Computer Science", "Engineering", "Mathematics", "Physics"]) for _ in range(num_rows)],
    "Campus": [random.choice(["Adelaide", "Parkville", "Campus C"]) for _ in range(num_rows)],
    "Original COE Start Date": [DONT_CARE for _ in range(num_rows)],
    "Course Start Date": [DONT_CARE for _ in range(num_rows)],
    "Course End Date": [DONT_CARE for _ in range(num_rows)],
    "COE Status": [DONT_CARE for _ in range(num_rows)],
    "Specialisation": [DONT_CARE for _ in range(num_rows)],
    "Pathway Indicator": [DONT_CARE for _ in range(num_rows)],
}

# Add MITS columns with max 4 "ENRL" per row
mits_columns = [
    "MITS4001", "MITS4002", "MITS4003", "MITS4004",
    "MITS5001", "MITS5002", "MITS5003", "MITS5004",
    "MITS5501", "MITS5502", "MITS5503", "MITS5505",
    "MITS5507", "MITS5509", "MITS6001", "MITS6002",
    "MITS6004", "MITS6005", "MITS6011", "MITS6500",
    "MITS5512"
]

# Generate MITS data and add to DataFrame
table = generate_enrollments(len(mits_columns), 4)
for idx, column in enumerate(mits_columns):
    data[column] = [table[i][idx] for i in range(num_rows)]

# Create a DataFrame from the generated data
df = pd.DataFrame(data)

# Save the DataFrame to an Excel file
df.to_excel("./random_data_with_limits.xlsx", index=False)

print("Excel file 'random_data_with_limits.xlsx' generated successfully!")
