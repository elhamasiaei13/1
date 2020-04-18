import { normalize, schema } from 'normalizr';

const answerOption = new schema.Entity('answerOptions');

const question = new schema.Entity('questions', { answerOptions: [answerOption] });

const result = new schema.Entity('results', undefined, {idAttribute: 'surveyParticipantDataId'});

const surveyParticipantData = new schema.Entity('surveyParticipantData' );

// const link = new schema.Entity('_links',undefined,{idAttribute: 'rel'})

//const user = new schema.Entity('users', undefined, {idAttribute:'username'});

const survey = new schema.Entity('surveys', { questions: [question] });

export const surveyParticipantDataNormalizer = spdData=> normalize(
    {"surveyParticipantData":spdData},
    {"surveyParticipantData":[surveyParticipantData]});
export const resultNormalizer = resultData => normalize(resultData, result);
export const surveyNormalizer = surveyData => normalize(surveyData, survey);
export const surveysNormalizer = surveyData => normalize(
    { "surveys": surveyData },
    { "surveys": [survey] });
//export const userNormalizer = userData => normalize(userData, user);


