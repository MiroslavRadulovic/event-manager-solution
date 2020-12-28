import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllUsers } from '../store/user.selectors';
import { UserState } from '../store/reducers';
import { User } from 'src/app/models/user.model';
import { defaultDialogConfig } from 'src/app/shared/mat-dialog-default-config';
import { UserManageComponent } from '../user-manage/user-manage.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  constructor(private store: Store<UserState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(selectAllUsers));
  }

  onAddNewEvent(): void {
    const data = {
      dialogTitle: 'Add New User',
      event: new User(null, null, null),
      mode: 'create',
    };
    const dialogConfig = { ...defaultDialogConfig(), ...{ data } };
    this.dialog
      .open(UserManageComponent, dialogConfig)
      .afterClosed()
      .subscribe();
  }
}
