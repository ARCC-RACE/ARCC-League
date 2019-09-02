

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { NbToastrService } from '@nebular/theme';

import { UserData, User } from '../../../@core/interfaces/common/users';
import { EMAIL_PATTERN, NUMBERS_PATTERN } from '../../../@auth/components';


export enum UserFormMode {
  // VIEW = 'View',
  EDIT = 'Edit',
  ADD = 'Add',
  EDIT_SELF = 'EditSelf',
}

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;

  /**
   * Subject that is for noting when the action is complete
   */
  protected readonly unsubscribe$ = new Subject<void>();

  // Getters for the form
  get login() { return this.userForm.get('login'); }

  get email() { return this.userForm.get('email'); }

  get age() { return this.userForm.get('age'); }

  get street() { return this.userForm.get('address').get('street'); }

  get city() { return this.userForm.get('address').get('city'); }

  get zipCode() { return this.userForm.get('address').get('zipCode'); }

  /**
   * What mode the form is being loaded in
   */
  mode: UserFormMode;

  /**
   * Setter for mode
   * @param viewMode
   */
  setViewMode(viewMode: UserFormMode) {
    this.mode = viewMode;
  }

  constructor(private usersService: UserData,
              private router: Router,
              private route: ActivatedRoute,
              private toasterService: NbToastrService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initUserForm();
    this.loadUserData();
  }

  /**
   * Initializes the user form
   */
  initUserForm() {
    this.userForm = this.fb.group({
      id: this.fb.control(''),
      role: this.fb.control(''),

      login: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      age: this.fb.control('', [Validators.required, Validators.min(1),
        Validators.max(120), Validators.pattern(NUMBERS_PATTERN)]),
      email: this.fb.control('', [
        Validators.required,
        Validators.pattern(EMAIL_PATTERN),
      ]),
      address: this.fb.group({
        street: this.fb.control(''),
        city: this.fb.control(''),
        zipCode: this.fb.control(''),
      }),
    });
  }

  // get canEdit(): boolean {
  //   return this.mode !== UserFormMode.VIEW;
  // }


  /**
   * Decides whether or not to load the users data, add a new user, or view another user
   * Consolidates multiple edit forms into one
   */
  loadUserData() {
    const id = this.route.snapshot.paramMap.get('id');
    // const isProfile = this.route.snapshot.queryParamMap.get('profile');
    const isAdd = this.route.snapshot.queryParamMap.get('add');
    if (isAdd) {
      this.setViewMode(UserFormMode.ADD);
    } else {
      if (id) {
        this.setViewMode(UserFormMode.EDIT);
        this.loadUser(id);
      } else {
        this.setViewMode(UserFormMode.EDIT_SELF);
        this.loadUser();
      }
    }
  }

  /**
   * Loads another user based on their ID
   * @param id User ID
   */
  loadUser(id?) {
    const loadUser = this.mode === UserFormMode.EDIT_SELF
      ? this.usersService.getCurrentUser() : this.usersService.get(id);
    loadUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        this.userForm.setValue({
          id: user.id,
          role: user.role,
          login: user.login ? user.login : '',
          age: user.age ? user.age : '',
          email: user.email,
          address: {
            street: (user.address && user.address.street) ? user.address.street : '',
            city: (user.address && user.address.city) ? user.address.city : '',
            zipCode: (user.address && user.address.zipCode) ? user.address.zipCode : '',
          },
        });

        // this is a place for value changes handling
        // this.userForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {   });
      });
  }


  /**
   * Converts object to user
   * @param value Object that will represent the user
   */
  static convertToUser(value: any): User {
    let user: User;
    user = value;
    return user;
  }

  /**
   * Saves the user to the database
   */
  save() {
    const user: User = UserComponent.convertToUser(this.userForm.value);

    let observable = new Observable<User>();
    if (this.mode === UserFormMode.EDIT_SELF) {
      observable = this.usersService.updateCurrent(user);
    } else {
      observable = user.id
        ? this.usersService.update(user)
        : this.usersService.create(user);
    }

    observable
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.toasterService.success('', `Item ${this.mode === UserFormMode.ADD ? 'created' : 'updated' }!`);
        this.back();
      });
  }

  /**
   * Go to the last page
   */
  back() {
    this.router.navigate(['/pages']).then();
  }

  /**
   * Unsubscribe from stuff on destroy
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
