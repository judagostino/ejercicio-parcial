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
  EmpresaAlta:  Empresa;
  submitted = false;

  constructor(private empresasService: EmpresaService, private formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.EstadoForm = 'L';
    this.getEmpresa();
    this.submitted = false;
    this.FormReg = this.formBuilder.group({
         CantidadEmpleados: ['',[Validators.required]],
         FechaFundacion: ['',[Validators.required]],
         IdEmpresa: ['',[Validators.required]],
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

  Modificar(item){
    this.EstadoForm = 'M';
    console.log(item);
    this.FormReg.setValue(item);
  }

  Agregar(){
    window.scroll(0, 0);
    this.EstadoForm = 'A';
    this.submitted = false;
   
  }

  Listar(){
    this.EstadoForm = 'L';
    this.getEmpresa();
  }

  Actualizar(){
     if(this.FormReg.invalid){
       window.alert("Verifique los datos");
       return;
       }
    
    this.EmpresaAlta = new Empresa;
    this.EmpresaAlta.CantidadEmpleados = this.FormReg.value.CantidadEmpleados;
    this.EmpresaAlta.IdEmpresa = this.FormReg.value.IdEmpresa;
    this.EmpresaAlta.RazonSocial = this.FormReg.value.RazonSocial;
    this.EmpresaAlta.FechaFundacion = this.FormReg.value.FechaFundacion;
    this.empresasService.put(this.EmpresaAlta.IdEmpresa,this.EmpresaAlta).subscribe((res:any)=>{
      window.alert("Empresa grabada");
      this.Listar();
    } );
  }

  Grabar(){
     this.submitted = true;
    // verificar que los validadores esten OK
     if (this.FormReg.invalid)
     {
      return;
      }
     const itemCopy = { ...this.FormReg.value };
     itemCopy.IdEquipo = 0;
    this.empresasService.post(itemCopy).subscribe((res: any) => {
        this.getEmpresa();
        this.Volver();
});
  }
  Volver(){
    this.EstadoForm = 'L'
  }

}