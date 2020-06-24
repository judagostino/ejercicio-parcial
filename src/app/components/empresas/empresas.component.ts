import { Component, OnInit } from '@angular/core';
import {Empresa} from '../../models/empresa';
import {EmpresaService} from '../../services/empresa.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  Titulo = "Empresas";
  Items: Empresa [] = [];
  FormReg: FormGroup;
  EstadoForm: string;

  constructor(private empresasService: EmpresaService, private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.EstadoForm = 'L';
    this.getEmpresa();
    this.FormReg = this.formBuilder.group({
         CantidadEmpleados: ['',[Validators.required]],
         FechaFundacion: ['',[Validators.required]],
         IdEmpleado: ['',[Validators.required]],
         RazonSocial: ['',[Validators.required]]
    }
     
    );
  }

  getEmpresa(){
     this.empresasService.get()
    .subscribe((res:Empresa[])=>{
      this.Items = res;

  });
  }

  Editar(){
    this.EstadoForm = 'E';
  }

}