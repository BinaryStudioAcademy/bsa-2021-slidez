export enum SessionResponseType {
    snapshot = 'SNAPSHOT',
    answeredPoll = 'ANSWERED_POLL',
    startedPoll = 'STARTED_POLL',
    askedQuestion = 'ASKED_QUESTION',
    likedQuestion = 'LIKED_QUESTION',
    reactionAdded = 'ADDED_REACTION',
    setQuestionVisibility = 'SET_QUESTION_VISIBILITY',
    displayedQASession = 'DISPLAYED_QA_SESSION',
    endCurrentInteraction = 'END_CURRENT_INTERACTION',
}
