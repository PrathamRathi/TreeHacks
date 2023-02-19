from gensim import models
from gensim.utils import simple_preprocess
from rake_nltk import Rake
import pandas as pd

from .grades_analysis import is_struggling
from .model_summaries import accommodation_topic_summaries, math_objective_topic_summaries, math_overview_topic_summaries, ela_objective_topic_summaries, ela_overview_topic_summaries
from .similarity import similarity_between_distribution_and_keyword_pair
from .openai_api_call import makeOpenAIrequest

# Initialize RAKE module
rake = Rake()

# Path to models
ACCOMMODATION_MODEL_PATH = './ML_models/models/accommodation_lda.model'
MATH_OVERVIEW_MODEL_PATH = './ML_models/models/math_overview_lda.model'
MATH_OBJECTIVE_MODEL_PATH = './ML_models/models/math_objective_lda.model'
ELA_OVERVIEW_MODEL_PATH = './ML_models/models/ela_overview_lda.model'
ELA_OBJECTIVE_MODEL_PATH = './ML_models/models/ela_objective_lda.model'
ANALYZED_ACCOMMODATION_CSV = './ML_models/data/analyzed_accommodation.csv'

def pick_model(model_path: str) -> models.LdaModel:
    return models.LdaModel.load(model_path)

def analyze_document(model : models.LdaModel, document: str, top_n_keywords=10) -> tuple:
    list_of_keywords = rakeKeywords(document, top_n_keywords)
    # Example Usage
    document_tokens = simple_preprocess(document, deacc=True)
    document_bow = model.id2word.doc2bow(document_tokens)

    topic_distribution = model[document_bow]

    return [(topic_prob[0],topic_prob[1]) for topic_prob in topic_distribution[0]], list_of_keywords


def rakeKeywords(text, top_n_keywords):
    # Extract keywords
    rake.extract_keywords_from_text(text)
    top_keywords = rake.get_ranked_phrases()[:top_n_keywords]

    return top_keywords

def getAscendingGradesOfStudent(grade_list):
    grades = [ (obj['grade'], obj['date']) for obj in grade_list ] # get 'grade','date' attributes for sorting grades
    grades.sort(key=lambda x: x[1]) # sort by python date obj ascending datetime 
    return [grade for grade, _ in grades]

def requestPipeline(subject: str, overview_document: str, objective_document: str, accommodation_document: str, id_of_student: str, id_to_grade_map: dict, student_grade: str, student_disability: str):
    # If student not is struggling return -> list of (distribution keyword pairs), False
    # Else return -> list of suggested similar accommodations, True 
    if subject == "Math":
        overview_model_path = MATH_OVERVIEW_MODEL_PATH
        objective_model_path = MATH_OBJECTIVE_MODEL_PATH
        overview_summaries = math_overview_topic_summaries
        objective_summaries = math_objective_topic_summaries
    else:
        overview_model_path = ELA_OVERVIEW_MODEL_PATH
        objective_model_path = ELA_OBJECTIVE_MODEL_PATH
        overview_summaries = ela_overview_topic_summaries
        objective_summaries = ela_objective_topic_summaries

    accommodation_model = pick_model(ACCOMMODATION_MODEL_PATH)
    overview_model = pick_model(overview_model_path)
    objective_model = pick_model(objective_model_path)

    accommodation_distribution, accommodation_keywords = analyze_document(accommodation_model, accommodation_document)
    overview_distribution, overview_keywords = analyze_document(overview_model, overview_document)
    objective_distribution, objective_keywords = analyze_document(objective_model, objective_document)

    accommodation_distribution_dict = { accommodation_topic_summaries[topic]: probability for topic, probability in accommodation_distribution }
    overview_distribution_dict = { overview_summaries[topic]: probability for topic, probability in overview_distribution }
    objective_distribution_dict = { objective_summaries[topic]: probability for topic, probability in objective_distribution }

    regression_threshold = -5  # 5% decline in grades per semester
    average_threshold = 80  # passing threshold for average grade
    recent_grade_threshold = 85
    grades = getAscendingGradesOfStudent(id_to_grade_map[id_of_student])

    if not is_struggling(grades, regression_threshold, average_threshold, recent_grade_threshold, regression_weight = 1, recent_grade_weight = 2):
        analyzed_results = ((accommodation_distribution_dict, accommodation_keywords),(overview_distribution_dict, overview_keywords),(objective_distribution_dict, objective_keywords))
        response = makeOpenAIrequest(student_grade, student_disability, analyzed_results)
        return response.choices[0].text, False

    else:
        # Struggling Student
        df = pd.read_csv(ANALYZED_ACCOMMODATION_CSV)
        accommodation_distribution_list = df.accommodation_distribution.values.tolist()
        accommodation_keywords_list = df.accommodation_keywords.values.tolist()
        overview_distribution_list = df.overview_distribution.values.tolist()
        overview_keywords_list = df.overview_keywords.values.tolist()
        objective_distribution_list = df.objective_distribution.values.tolist()
        objective_keywords_list = df.objective_keywords.values.tolist()
        LP_accommodation_list = df.lp_accommodation.values.tolist()
        similarities = []
        for i in range(len(df)):
            acc_sim = similarity_between_distribution_and_keyword_pair((accommodation_distribution_list[i], accommodation_keywords_list[i]),(accommodation_distribution_dict, accommodation_keywords))
            over_sim = similarity_between_distribution_and_keyword_pair((overview_distribution_list[i], overview_keywords_list[i]),(overview_distribution_dict, overview_keywords)) 
            obj_sim = similarity_between_distribution_and_keyword_pair((objective_distribution_list[i], objective_keywords_list[i]),(objective_distribution_dict, objective_keywords))
            similarities.append((i,acc_sim * over_sim * obj_sim))
        similarities.sort(key=lambda sim: sim[1], reverse=True)
        return [ LP_accommodation_list[i] for i, _ in similarities[:3] ], True # Top 3 most similar accommodations
        