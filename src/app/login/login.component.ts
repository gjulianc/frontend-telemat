import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  username: string;
  recuerdame: boolean;

  usuario: Usuario;
  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    if (this.username.length > 1) {
      this.recuerdame = true;
    }
  }

  ngAfterViewInit() {
      $(function() {
          $('.preloader').fadeOut();
      });
      $(function() {
          (<any>$('[data-toggle="tooltip"]')).tooltip()
      });
      $('#to-recover').on('click', function() {
          $('#loginform').slideUp();
          $('#recoverform').fadeIn();
      });
  }

  onLoggedin() {
      localStorage.setItem('isLoggedin', 'true');
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    this.usuario = new Usuario(null, null, forma.value.username, forma.value.password);

    this._usuarioService.login(this.usuario, this.recuerdame)
      .subscribe( correcto => {this.router.navigate( ['/dashboard'] );
    });
  }


}
