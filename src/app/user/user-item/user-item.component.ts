import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user.data.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  @Input() user: User = null;
  constructor(
    private dialog: MatDialog,
    private userDataService: UserDataService
  ) {}

  ngOnInit(): void {}
}
