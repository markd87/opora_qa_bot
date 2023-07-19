import pandas as pd
import re


def read_logs():

    with open("log1", "r") as f:
        logs = f.readlines()

    user_pattern = r"USER:\s(\d+)"
    question_pattern = r"Question:\s([A-Za-z_]*)"
    date_pattern = r"([A-Za-z]{3}\s\d{1,2},\s\d{2}:\d{2}:\d{2}\s[A-Za-z]{2})"

    users = []
    dates = []
    questions = []
    q_dates = []
    oks = 0

    year = "2023"

    for l in logs:
        # USERS
        match = re.search(user_pattern, l)
        if match:
            user = match.group(1)
            users.append(user)

            match = re.search(date_pattern, l)
            if match:
                date = match.group(1)
                dates.append(year + " " + date)

        # QUESTION
        match = re.search(question_pattern, l)
        if match:
            q = match.group(1)
            questions.append(q)

            match = re.search(date_pattern, l)
            if match:
                date = match.group(1)
                q_dates.append(year + " " + date)

        # OK
        match = re.search("__OK__", l)
        if match:
            oks += 1

    df_users = pd.DataFrame({"date": dates, "user": users})
    df_users["date"] = pd.to_datetime(df_users["date"], format="%Y %b %d, %I:%M:%S %p")
    df_users = df_users.set_index("date")

    df_questions = pd.DataFrame({"date": q_dates, "question": questions})
    df_questions["date"] = pd.to_datetime(df_questions["date"], format="%Y %b %d, %I:%M:%S %p")
    df_questions = df_questions.set_index("date")

    return df_users, df_questions


if __name__ == "__main__":
    users, questions = read_logs()

    print(f"\nTotal sessions: {len(users)}\n")
    print(f"Unique users: {len(users['user'].unique())}\n")
    print(f"Topics: {questions.value_counts()}")
    print(f"Total questions: {len(questions['question'])}")
