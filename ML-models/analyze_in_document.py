from gensim import models
from gensim.utils import simple_preprocess
from rake_nltk import Rake
from model_summaries import accommodation_topic_summaries, math_objective_topic_summaries, math_overview_topic_summaries

# Initialize RAKE module
rake = Rake()

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

if __name__ == "__main__":
    # TWEAK THIS PATH TO POINT AT PROPER MODEL
    ACCOMMODATION_MODEL_PATH = 'models/accommodation_lda.model'
    MATH_OVERVIEW_MODEL_PATH = 'models/math_overview_lda.model'
    MATH_OBJECTIVE_MODEL_PATH = 'models/math_objective_lda.model'

    # DOCUMENT FOR ANALYSIS
    ACCOMMODATION_DOCUMENT = 'Breaking down math instructions into smaller, more manageable steps for better understanding.'
    OVERVIEW_DOCUMENT = '''Write the number 134 on the board. Ask, “What number is this? How do you know?”
Show students how 134 means one hundred, three tens, and four ones.
Bring out place value disks and show how to represent 134 with the disks.'''
    OBJECTIVE_DOCUMENT = 'Students will be able to use their understanding of place value to compare numbers.'

    accommodation_model = pick_model(ACCOMMODATION_MODEL_PATH)
    math_overview_model = pick_model(MATH_OVERVIEW_MODEL_PATH)
    math_objective_model = pick_model(MATH_OBJECTIVE_MODEL_PATH)

    accommodation_distribution, accommodation_keywords = analyze_document(accommodation_model, ACCOMMODATION_DOCUMENT)
    overview_distribution, overview_keywords = analyze_document(math_overview_model, OVERVIEW_DOCUMENT)
    objective_distribution, objective_keywords = analyze_document(math_objective_model, OBJECTIVE_DOCUMENT)
    
    accommodation_distribution_dict = { accommodation_topic_summaries[topic]: probability for topic, probability in accommodation_distribution }
    overview_distribution_dict = { math_overview_topic_summaries[topic]: probability for topic, probability in overview_distribution }
    objective_distribution_dict = { math_objective_topic_summaries[topic]: probability for topic, probability in objective_distribution }


    print(f"{accommodation_distribution_dict}\n{accommodation_keywords}\n")
    print(f"{overview_distribution_dict}\n{overview_keywords}\n")
    print(f"{objective_distribution_dict}\n{objective_keywords}\n")
