import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    myQuestions = [
        {
            id: "Question1",
            question: "Qual é a capital da França?",
            answers: {
                a: "Londres",
                b: "Berlim",
                c: "Paris"
            },
            correctAnswer: "c"
        },
        {
            id: "Question2",
            question: "Quem escreveu a obra 'Dom Quixote'?",
            answers: {
                a: "William Shakespeare",
                b: "Leo Tolstoy",
                c: "Miguel de Cervantes"
            },
            correctAnswer: "c"
        },
        {
            id: "Question3",
            question: "Qual é o maior planeta do sistema solar?",
            answers: {
                a: "Terra",
                b: "Marte",
                c: "Júpiter"
            },
            correctAnswer: "c"
        },
        {
            id: "Question4",
            question: "Qual é o oceano mais profundo do mundo?",
            answers: {
                a: "Oceano Atlântico",
                b: "Oceano Índico",
                c: "Oceano Pacífico"
            },
            correctAnswer: "c"
        },
        {
            id: "Question5",
            question: "Quem é a autora do livro 'Harry Potter'?",
            answers: {
                a: "J.R.R. Tolkien",
                b: "George Orwell",
                c: "J.K. Rowling"
            },
            correctAnswer: "c"
        },
        {
            id: "Question6",
            question: "Qual é a moeda oficial do Japão?",
            answers: {
                a: "Yuan",
                b: "Yen",
                c: "Won"
            },
            correctAnswer: "b"
        },
        {
            id: "Question7",
            question: "Qual é o maior deserto do mundo?",
            answers: {
                a: "Deserto do Saara",
                b: "Deserto de Gobi",
                c: "Deserto de Atacama"
            },
            correctAnswer: "a"
        },
        {
            id: "Question8",
            question: "Em que ano ocorreu a Primeira Guerra Mundial?",
            answers: {
                a: "1914",
                b: "1939",
                c: "1945"
            },
            correctAnswer: "a"
        },
        {
            id: "Question9",
            question: "Qual é o animal terrestre mais rápido do mundo?",
            answers: {
                a: "Leão",
                b: "Guepardo",
                c: "Cavalo"
            },
            correctAnswer: "b"
        },
        {
            id: "Question10",
            question: "Quem foi o primeiro homem a pisar na Lua?",
            answers: {
                a: "Neil Armstrong",
                b: "Buzz Aldrin",
                c: "Yuri Gagarin"
            },
            correctAnswer: "a"
        },
        {
            id: "Question11",
            question: "Qual é a maior cordilheira do mundo?",
            answers: {
                a: "Montanhas Rochosas",
                b: "Alpes",
                c: "Cordilheira dos Andes"
            },
            correctAnswer: "c"
        },
        {
            id: "Question12",
            question: "Qual é o segundo planeta do sistema solar?",
            answers: {
                a: "Vênus",
                b: "Terra",
                c: "Marte"
            },
            correctAnswer: "a"
        },
        {
            id: "Question13",
            question: "Qual é o maior rio do mundo em volume de água?",
            answers: {
                a: "Rio Amazonas",
                b: "Rio Nilo",
                c: "Rio Yangtzé"
            },
            correctAnswer: "a"
        },
        {
            id: "Question14",
            question: "Quem foi o fundador da Microsoft?",
            answers: {
                a: "Steve Jobs",
                b: "Jeff Bezos",
                c: "Bill Gates"
            },
            correctAnswer: "c"
        },
        {
            id: "Question15",
            question: "Qual é a capital da Rússia?",
            answers: {
                a: "Moscou",
                b: "São Petersburgo",
                c: "Kiev"
            },
            correctAnswer: "a"
        },
        {
            id: "Question16",
            question: "Qual é o país mais populoso do mundo?",
            answers: {
                a: "Índia",
                b: "Estados Unidos",
                c: "China"
            },
            correctAnswer: "c"
        },
        {
            id: "Question17",
            question: "Qual é o menor planeta do sistema solar?",
            answers: {
                a: "Marte",
                b: "Vênus",
                c: "Mercúrio"
            },
            correctAnswer: "c"
        },
        {
            id: "Question18",
            question: "Qual é a maior ilha do mundo?",
            answers: {
                a: "Ilha de Borneo",
                b: "Ilha de Java",
                c: "Groenlândia"
            },
            correctAnswer: "c"
        },
        {
            id: "Question19",
            question: "Quem escreveu 'Romeu e Julieta'?",
            answers: {
                a: "Charles Dickens",
                b: "William Shakespeare",
                c: "Jane Austen"
            },
            correctAnswer: "b"
        },
        {
            id: "Question20",
            question: "Qual é o elemento químico mais abundante no universo?",
            answers: {
                a: "Oxigênio",
                b: "Hidrogênio",
                c: "Carbono"
            },
            correctAnswer: "b"
        }
    ];
    
    selected = {};
    correctAnswers = 0;
    isSubmitted = false;
    currentPage = 1;
    itemsPerPage = 1;
    totalPages = 1; 

    connectedCallback() {
        this.totalPages = Math.ceil(this.myQuestions.length / this.itemsPerPage);
        this.updateDisplayedQuestions();
    }

    get allNotSelected() {
        return !(Object.keys(this.selected).length === this.myQuestions.length);
    }

    get isScoredFull() {
        return `slds-text-heading_large ${
            this.myQuestions.length === this.correctAnswers
                ? 'slds-text-color_success'
                : 'slds-text-color_error'
        }`;
    }

    get isPreviousButtonDisabled() {
        return this.currentPage === 1;
    }
    
    get isNextButtonDisabled() {
        return this.currentPage === this.totalPages;
    }

    updateDisplayedQuestions() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.displayedQuestions = this.myQuestions.slice(startIndex, endIndex);
    }

    changeHandler(event) {
        const { name, value } = event.target;
        this.selected = { ...this.selected, [name]: value };
    }

    submitHandler(event) {
        event.preventDefault();
        let correct = this.myQuestions.filter(
            (item) => this.selected[item.id] === item.correctAnswer
        );
        this.correctAnswers = correct.length;
        this.isSubmitted = true;
    }

    resetHandler(event) {
        this.selected = {};
        this.correctAnswers = 0;
        this.isSubmitted = false;
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateDisplayedQuestions();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updateDisplayedQuestions();
        }
    }

    updateDisplayedQuestions() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        let questions = this.myQuestions.slice(startIndex, endIndex);
    
        questions = questions.map((q) => {
            return {
                ...q,
                isOptionASelected: this.selected[q.id] === 'a',
                isOptionBSelected: this.selected[q.id] === 'b',
                isOptionCSelected: this.selected[q.id] === 'c'
            };
        });
    
        this.displayedQuestions = questions;
    }    
}