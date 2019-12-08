import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Person } from './person';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, AfterViewInit {
  personne  : Person;

  validationMessages = {
    nom : {
      required : "Le nom de la personne est obligatoire",
      minlength : "Le nom doit avoir au moins 3 caracteres",
    },
    prenoms : {
      required : "Au moins un prenom est requis pour ce formulaire"
    }
  };

  formErrors = {
    nom : '',
    prenoms :''
  };

  @ViewChild('personForm', {static : false}) personForm : NgForm;
  constructor() { }

  ngOnInit() {
    this.personne = new Person();
  }
  ngAfterViewInit(){
    if(this.personForm){
      this.personForm.valueChanges.subscribe(
        data => this.onValueChanges(data)
      );
    }
  }

  onSubmit(){
    console.log(JSON.stringify(this.personne));
  }

  onValueChanges(data? :any){

    if(!this.personForm){ return ;}
    const form = this.personForm.form;
    console.log(form);

    for(const field in this.formErrors){
      // On supprime le message eventuel
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.value) console.log(control.value)
      
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        console.log(messages)
        for(const key in control.errors){
          console.log(control.errors)
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }

  }

}
