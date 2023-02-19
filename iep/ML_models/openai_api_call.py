import os
import openai

openai.api_key = "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"

def makeOpenAIrequest(grade: int, disability: str, all_distribution_keyword_pairs: list[tuple]):
    IEP_accommodation_topic_distribution, IEP_accommodation_keywords = all_distribution_keyword_pairs[0]
    overview_topic_distribution, overview_keywords = all_distribution_keyword_pairs[1]
    objective_topic_distribution, objective_keywords = all_distribution_keyword_pairs[2]

    prompt = f"The student is in {grade} and has {disability}. The student's individualized education plan has the following keywords: {IEP_accommodation_keywords} and has the following topic distribution: {IEP_accommodation_topic_distribution}. The lesson plan's overview contains these keywords: {overview_keywords} and has the following topic distribution: {overview_topic_distribution}. The lesson plan's objective has the following keywords: {objective_keywords} and the following topic distribution: {objective_topic_distribution}."
    promptPrefix = "You answer as concisely as possible for each response (two sentences maximum). It is very important that you answer as concisely as possible, so please remember this. If you are generating a list, do not have too many items. Keep the number of items short. I will provide you with context of the individualized education plan a student has, an overview of a lesson plan being taught to the student, and some objectives for that lesson plan. Context will be provided in the form of keywords and topic distributions. Keywords are key pieces of text that give insight into the meaning of the IEP accommodation, lesson plan overview, and lesson plan objective. I will also provide you with a dictionary of topic distributions. Here is an example: {'x': 0.5, 'y': 0.5}. This means that 50% of the IEP accommodation, lesson plan overview, or lesson plan objective is about topic 'x' and 50% is about topic 'y'. I want you to respond with a modification I can make to the lesson plan that will help this student."

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=promptPrefix + " " + prompt,
        temperature=0.9,
        max_tokens=150,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0.6
    )

    return response