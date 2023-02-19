import numpy as np
import scipy.stats

def jaccard(list1, list2):
    intersection = len(list(set(list1).intersection(list2)))
    union = (len(list1) + len(list2)) - intersection
    return float(intersection) / union

def jsd(p, q):
    """
    method to compute the Jenson-Shannon Distance 
    between two probability distributions
    """

    # convert the vectors into numpy arrays in case that they aren't
    p = np.array(p)
    q = np.array(q)

    # calculate m
    m = (p + q) / 2

    # compute Jensen Shannon Divergence
    divergence = (scipy.stats.entropy(p, m) + scipy.stats.entropy(q, m)) / 2

    # compute the Jensen Shannon Distance
    distance = (1 - np.sqrt(divergence))

    return distance

def similarity(jaccard, jensen, weight):
    return weight*jaccard + ((1-weight)*jensen)

def formatJensenTopics(topic_distribution1, topic_distribution2):
    max1 = max(topic_distribution1[1])
    max2 = max(topic_distribution2[1])
    maxTopics = max(max1, max2)
    result1 = np.zeros(maxTopics+1)
    result2 = np.zeros(maxTopics+1)
    for topic, distribution in topic_distribution1:
        result1[topic] = distribution
    for topic, distribution in topic_distribution2:
        result2[topic] = distribution
    return result1, result2

def similarity_between_distribution_and_keyword_pair(distribution_keyword_pair1: tuple, distribution_keyword_pair2: tuple, lambd=0.4) -> int:
    distribution1, keywords1 = distribution_keyword_pair1
    distribution2, keywords2 = distribution_keyword_pair2

    jaccardSim = jaccard(keywords1, keywords2)
    JensenShannonSim = jsd(formatJensenTopics(distribution1, distribution2))
    
    # Lower lambda will put more emphasis on the Jenson Shanon Similarity.
    # Higher lambda will put more emphasis on the Jaccard Similarity
    similarity(jaccardSim, JensenShannonSim, lambd)