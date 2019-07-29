import json
import copy
from pycorenlp import StanfordCoreNLP
from sys import argv


stanfordCoreNLP = StanfordCoreNLP('http://localhost:9000')


def opennmtConversionFromSentences(sents):
    featured_sents = []
    for sent in sents:
        featured_source_tokens = []
        for token in sent:
            featured_source_token = "{}￨{}￨{}￨{}￨{}".format(
                token['token'],
                token['ans_tag'],
                token['case_tag'],
                token['pos_tag'],
                token['ner']
            )
            featured_source_tokens.append(featured_source_token)
        featured_sents.append(" ".join(featured_source_tokens))
    return featured_sents


def generateSentenceAnswer(sent, begin_ind, end_ind):
    new_sent = copy.deepcopy(sent)
    for ind, token in enumerate(new_sent):
        if ind < begin_ind or ind > end_ind:
            token['ans_tag'] = 'O'
    return new_sent



def cleanUpDuplicateSentencesWithAns(sents):
    new_sents = []
    for sent in sents:
        begin_ind, end_ind = None, None
        for ind, token in enumerate(sent):
            if token['ans_tag'] == 'B':
                begin_ind = ind
            elif token['ans_tag'] == 'I':
                continue
            else:
                if begin_ind is not None:
                    end_ind = ind - 1
                    new_sent = generateSentenceAnswer(sent, begin_ind, end_ind)
                    begin_ind = None
                    new_sents.append(new_sent)
                else:
                    begin_ind, end_ind = None, None
    return new_sents



def get_possible_ans_tags(ner_features_path='/home/pradeep/scripts/data/ner_features'):
    with open(ner_features_path, 'r') as f:
        possible_ans_tags = [line.split('\t')[0] for line in f]
    possible_ans_tags = [tag for tag in possible_ans_tags if tag != 'O']
    possible_ans_tags.append('CD')
    possible_ans_tags = set(possible_ans_tags)

    #print ("*****ANS TAGS**********************")
    #print (possible_ans_tags)
    #print ("***********************************")
    return possible_ans_tags


def updateTagging(sents, possible_ans_tags):
    for sent in sents:
        ans_tag = 'O'
        for token in sent:
            if token['ner'] in possible_ans_tags or token['pos_tag'] in possible_ans_tags:
                if ans_tag == 'B' or ans_tag == 'I':
                    ans_tag = 'I'
                else:
                    ans_tag = 'B'
            else:
                ans_tag = 'O'
            token['ans_tag'] = ans_tag


def generateSentencesFromNLP(corenlp_output):
    sents = []
    for sentence in corenlp_output['sentences']:
        sent_start_ind = sentence['index']
        sent = []
        for token in sentence['tokens']:
            token_start_ind = token['index']
            word = token['originalText']
            lower_word = word.lower()
            if (word[0] == word[0].upper() and word[0] != word[0].lower()):
                case_tag = 'UP'
            else:
                case_tag = 'LOW'
            ner_tag = token['ner']
            pos_tag = token['pos']
            sent.append(({'token': lower_word, 'ner': ner_tag, 'case_tag': case_tag, 'pos_tag': pos_tag}))
        sents.append(sent)

    #print ("****************SENTENCES********************")
    #print (sents)
    return sents


def main(text):
    output = stanfordCoreNLP.annotate(text, properties={
        'annotators': 'tokenize,ssplit,pos,ner',
        'outputFormat': 'json'}
    )
    if type(output) == str:
        output =json.loads(output, encoding='utf-8', strict=False)
    #print("**********************************")
    #print("************JSON******************")
    #print(output)
    #print("**********************************")
    #print("**********************************")
    possible_ans_tags = get_possible_ans_tags()
    sents = generateSentencesFromNLP(output)
    updateTagging(sents, possible_ans_tags)
    sents = cleanUpDuplicateSentencesWithAns(sents)

    opennmt_sents = opennmtConversionFromSentences(sents)
    for sent in opennmt_sents:
        print(sent)


if __name__ == '__main__':
    text = argv[1]
    main(text)



