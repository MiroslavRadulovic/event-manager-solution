import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user.data.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default-config';
import { UserState } from '../store/reducers';
import { userCreated } from '../store/user.actions';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
})
export class UserManageComponent implements OnInit {
  form: FormGroup;
  dialogTitle: string;
  user: User;
  mode: 'edit' | 'create';
  nameMaxLength = 30;
  usernameMaxLength = 30;
  unsavedChanges = false;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserManageComponent>,
    private userDataService: UserDataService,
    private store: Store<UserState>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.dialogTitle = data.dialogTitle;
    this.user = data.user;
    this.mode = data.mode;
    const formElements = {
      fullname: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(this.nameMaxLength),
        ]),
      ],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      username: [null, Validators.maxLength(this.usernameMaxLength)],
    };

    this.form = this.formBuilder.group(formElements);
    this.form.valueChanges.subscribe((f) => {
      this.unsavedChanges = this.form.dirty;
    });
  }

  ngOnInit(): void {}

  onSubmitForm(): void {
    if (!this.form.invalid) {
      const change: User = {
        ...this.user,
        ...this.form.value,
      };

      if (this.mode === 'create') {
        this.save(change);
      }
    }
  }

  private save(changes: User): void {
    this.userDataService.save(changes).subscribe((user) => {
      this.unsavedChanges = false;
      this.store.dispatch(userCreated({ user }));
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    if (this.unsavedChanges) {
      const data = {
        dialogTitle: 'Confirm',
        data: {
          message:
            'You have unsaved changes, Do you really want to cancel the changes?',
        },
      };
      const dialogConfig = { ...defaultDialogConfig(), ...{ data } };
      this.dialog
        .open(ConfirmDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe((result) => {
          if (result.action === 'yes') {
            this.dialogRef.close();
          }
        });
    } else {
      this.dialogRef.close();
    }
  }
}
