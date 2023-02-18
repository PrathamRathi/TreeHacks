from gensim import models
from gensim.utils import simple_preprocess
from rake_nltk import Rake

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
    MODEL_PATH = 'models/accommodation_lda.model'

    # DOCUMENT FOR ANALYSIS
    DOCUMENT = 'Breaking down math instructions into smaller, more manageable steps for better understanding.'

    model = pick_model(MODEL_PATH)
    print(analyze_document(model, DOCUMENT))
