export interface QASessionQuestionDto {
    id: string
    qaSessionId: string
    //Array of user ids who liked question
    likedBy: string[]
    createdAt: string
    //Nickname = 'FirstName LastName'
    authorNickname: string
    isVisible: boolean
    question: string
}
