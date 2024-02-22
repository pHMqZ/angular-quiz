import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import  quiz_question  from '../../../assets/data/quiz_questions.json';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit{
  
  title: string = ""

  questions: any
  questionSelected: any

  answers: string[] =[]
  answerSelected:string =""

  questionIndex:number = 0
  questionMaxIndex:number =0

  finished:boolean = false

  constructor() { }
  
  ngOnInit(): void {
    if(quiz_question){
      this.finished = false;
      this.title = quiz_question.title;
    }

    this.questions = quiz_question.questions
    this.questionSelected = this.questions[this.questionIndex]

    this.questionIndex = 0
    this.questionMaxIndex = this.questions.length

    console.log(this.questionIndex)
    console.log(this.questionMaxIndex)
  }

  playerChoice(value: string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex +=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalResult:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quiz_question.results[finalResult as keyof typeof quiz_question.results]
    }
  }

  async checkResult(anwsers:string[]){
    const result = anwsers.reduce((previous, current, i, arr) => {
      if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length ){
        return previous
      } else {
        return current
      }
    })
    return result
  }

  resetQuiz(): void {
    this.questions = null; // Reiniciar perguntas
    this.questionSelected = null; // Reiniciar pergunta selecionada
    this.answers = []; // Limpar respostas
    this.answerSelected = ""; // Reiniciar resposta selecionada
    this.questionIndex = 0; // Reiniciar índice da pergunta
    this.questionMaxIndex = 0; // Reiniciar índice máximo da pergunta
    this.finished = false; // Reiniciar status do quiz 
    // Recarregar a página
    window.location.reload();
  }
}
