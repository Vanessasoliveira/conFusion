import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { defaultRippleAnimationConfig } from '@angular/material/core';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  dishcopy: Dish;

  rating: MatSlider["value"];

  commentForm: FormGroup;
  comment: Comment;
  @ViewChild('cform') commentFormDirective: NgForm;



  formErrors = {
    'comment': ['', [Validators.required, Validators.minLength(2)]],
    'author': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
  };

  validationMessages = {
    'comment': {
      'required': 'Comment is required.',
      'minlength': 'Name must be at least 2 characters long. '

    },
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long. ',
      'maxlength': 'First name cannot be more than 25 characters long.'
    }
  };


  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id) });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      date: ''
      //message:''
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validations message
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        //clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + '';
            }
          }
        }
      }
    }
  }

  onSubmit() {

    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.commentForm.reset(
      {
        comment: '',
        author: '',
        rating: 5
      }
    );
    const date = new Date().toISOString();
    this.dish?.comments.push({
      ...this.comment,
      date
    });
    this.commentFormDirective.resetForm();

  }


}
