import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../../services/user.service';
import {UserCreationRequest, UserResponse} from "../../modeles/user";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public newUser: UserCreationRequest = {
    numero: '',
    nom: '',
    prenom: ''
  };

  public users: UserResponse[] = [];
  public message = '';
  public messageType: 'success' | 'error' = 'success';

  constructor(private userService: UserService) {}

  public onSubmit(): void {
    if (!this.newUser.numero || !this.newUser.nom || !this.newUser.prenom) {
      this.message = 'Veuillez remplir tous les champs';
      this.messageType = 'error';
      return;
    }

    this.userService.createUser(this.newUser).subscribe({
      next: (response) => {
        this.message = 'Utilisateur créé avec succès';
        this.messageType = 'success';
        this.users.push(response);
        this.resetForm();
      },
      error: (error) => {
        this.message = 'Erreur lors de la création de l\'utilisateur: ' + error.message;
        this.messageType = 'error';
      }
    });
  }

  public resetForm(): void {
    this.newUser = {
      numero: '',
      nom: '',
      prenom: ''
    };
  }
}
