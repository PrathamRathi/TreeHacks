import os
import openai

openai.api_key = "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"

name = "Megan Clark"
grade = "Second Grade"
disability = "Attention Deficit Hyperactivity Disorder"
IEP_accommodation_topic_distribution = {'predictable, structured, and consistent learning environment': 0.02333141, 'communication and speech with peers': 0.03815593, 'repeated cues to stay on task': 0.011740227, 'incorporating accessibility into the learning environment': 0.023535881, 'quiet work environment': 0.015750729, 'attention related issues like fidgeting, scheduling, and need for visual aids': 0.03445712, 'visual, auditory, kinesthetic learning': 0.01030247, 'use of visual aids, manipulatives, graphic organizers, and pictures': 0.32292703, 'breaking assignments up and flexible deadlines': 0.011097365, 'language, vocabulary, and grammar related learning issues': 0.023776557, 'assignment/testing alternatives and assistance': 0.030864144, 'alternate modalities for syntehesizing reading and writing material': 0.0179415, 'social emotion issues': 0.3087882, 'occupational therapy and fine motor': 0.10954514, 'visual cues and experience learning': 0.010067139}
IEP_accommodation_keywords = ['math instructions', 'manageable steps', 'better understanding', 'smaller', 'breaking']

overview_topic_distribution = {'student participation and problem solving': 0.60674375, 'understanding graphing and relating to real world examples': 0.060906198, 'asking questions to the class': 0.03635664, 'small group discussion and class review': 0.20072229}
overview_keywords = ['134 means one hundred', 'know ?” show students', 'place value disks', 'represent 134', 'number 134', 'three tens', 'four ones', 'show', 'disks', 'number']

objective_topic_distribution = {'read and interpret data represented in different forms, such as bar graphs, line graphs, or number lines': 0.011641365, 'operations with whole numbers and basic geometry concepts': 0.29252788, 'applying mathematical concepts to real-world scenarios and using equations, arrays, and graphs, to solve complex problems': 0.027696718, 'understanding fractions, decimals, and operations involving these concepts': 0.074446075, 'number sense, understanding of mathematical expressions, and recognizing patterns in numbers': 0.5459848, 'solving word problems related to volume': 0.018606054}
objective_keywords = ['place value', 'compare numbers', 'use', 'understanding', 'students', 'able']


prompt = f"{name} is in {grade} and has {disability}. The student's individualized education plan has the following keywords: {IEP_accommodation_keywords} and has the following topic distribution: {IEP_accommodation_topic_distribution}. The lesson plan's overview contains these keywords: {overview_keywords} and has the following topic distribution: {overview_topic_distribution}. The lesson plan's objective has the following keywords: {objective_keywords} and the following topic distribution: {objective_topic_distribution}."
promptPrefix = "You answer as concisely as possible for each response (e.g. don't be verbose). It is very important that you answer as concisely as possible, so please remember this. If you are generating a list, do not have too many items. Keep the number of items short. I will provide you with context of the individualized education plan a student has, an overview of a lesson plan being taught to the student, and some objectives for that lesson plan. Context will be provided in the form of keywords and topic distributions. Keywords are key pieces of text that give insight into the meaning of the IEP accommodation, lesson plan overview, and lesson plan objective. I will also provide you with a dictionary of topic distributions. Here is an example: {'x': 0.5, 'y': 0.5}. This means that 50% of the IEP accommodation, lesson plan overview, or lesson plan objective is about topic 'x' and 50% is about topic 'y'. I want you to respond with a modification I can make to the lesson plan that will help this student."

response = openai.Completion.create(
  model="text-davinci-003",
  prompt=promptPrefix + " " + prompt,
  temperature=0.9,
  max_tokens=150,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0.6
)

print(response)