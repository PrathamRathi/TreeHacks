import numpy as np
from sklearn.linear_model import LinearRegression

def calculate_grade_trend(grades):
    # Calculate the regression slope of the student's grades over time
    x = np.arange(len(grades)).reshape((-1, 1))
    y = np.array(grades).reshape((-1, 1))
    model = LinearRegression().fit(x, y)
    regression_slope = model.coef_[0][0]

    # Calculate the average grade for the subject
    average_grade = sum(grades) / len(grades)

    return regression_slope, average_grade

def is_struggling(grades, regression_threshold, average_threshold, recent_grade_threshold, regression_weight, recent_grade_weight):
    if len(grades) < 4:
        return False
    regression_slope, average_grade = calculate_grade_trend(grades)

    # Determine if the student is struggling based on the regression slope, average grade, and most recent grade
    score = (regression_weight * regression_slope) + (recent_grade_weight * grades[-1]) + average_grade
    if score < (regression_weight * regression_threshold) + (recent_grade_weight * recent_grade_threshold) + average_threshold:
        return True  # struggling
    else:
        return False  # not struggling
