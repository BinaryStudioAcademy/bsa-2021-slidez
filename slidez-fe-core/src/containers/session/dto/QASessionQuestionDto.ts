export interface QASessionQuestionDto {
    id: string
    qaSessionId: string
    //Array of user ids who liked question
    likedBy: string[]
    createdAt: Date
    //Nickname = 'FirstName LastName'
    authorNickname: string
    question: string
}
