import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {SplitButton} from 'primeng/splitbutton';
import {InputText} from 'primeng/inputtext';
import {Image} from 'primeng/image';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    Button,
    Toolbar,
    IconField,
    InputIcon,
    SplitButton,
    InputText,
    Image
  ]
})
export class Home {

}
