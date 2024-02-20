import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.css']
})
export class UploadInvoiceComponent implements OnInit {
  @Input() id: string = "";
  invoiceForm : FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.invoiceForm = this.fb.group({
      invoice: [null, Validators.required],
      bond: [null, Validators.required]
    });

   }

  ngOnInit() {
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.invoiceForm.get('invoice').setValue(file);
  }
  handleFileInputBond(event: any) {
    const file = event.target.files[0];
    this.invoiceForm.get('bond').setValue(file);
  }

  uploadInvoice() {
    const formData = new FormData();
    const invoiceControl = this.invoiceForm.get('invoice');
    const bondControl = this.invoiceForm.get('bond');
    formData.append('rigId', this.id);
    if (invoiceControl !== null && invoiceControl !== undefined) {
      formData.append('invoice', invoiceControl.value);
      console.log(invoiceControl.value)
    }
    if (bondControl !== null && bondControl !== undefined) {
      formData.append('bond', bondControl.value);
      console.log(bondControl.value)
    }
    this.userService.invoiceandbond(formData).subscribe({
      next:(result:any)=>{
        this.toastr.success(result.message)
      },
      error:(error=>{

      })
    })
  }


}
