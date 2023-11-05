import { Component } from '@angular/core';

@Component({
  selector: 'app-update-lenderboss',
  templateUrl: './update.lenderboss.html',
  styleUrls: ['./update.lenderboss.css']
})
export class UpdateLenderBoss {
  /*listaPais: Pais[] = [];
  editorial: Editorial = {
	  razonSocial: "",
	  direccion: "",
	  ruc: "",
	  fechaCreacion: null,
	  pais: { idPais: -1 }
  };
  objUsuario: Usuario = {};

  constructor(private editorialService: EditorialService, private utilService: UtilService, private tokenService: TokenService) {
    utilService.listaPais().subscribe(
      x => this.listaPais = x
    );

    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  registra(){
    this.editorial.usuarioRegistro = this.objUsuario;
    this.editorial.usuarioActualiza = this.objUsuario;
    this.editorialService.registrar(this.editorial).subscribe(
      x => {
        Swal.fire({
          icon: "info",
          title: "",
          text: x.mensaje
        })
      }
    );
  }*/

}
