import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: "app-partner-bond",
  templateUrl: "./partner-bond.component.html",
  styleUrls: ["./partner-bond.component.css"],
})
export class PartnerBondComponent implements OnInit {
  uploadText: string = 'Upload';
  isUploading: boolean = false;
  fileUploadForm: FormGroup;
  userId: string = ''; // Partner ID input field value

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<PartnerBondComponent>
  ) {}

  ngOnInit() {}

  selectedFile: File | null = null;

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    this.uploadText = 'Uploading...';
    this.isUploading = true;
    if (this.selectedFile) {
      console.log("Selected file:", this.selectedFile);

      const form = new FormData();
      form.append("bond", this.selectedFile);

      // Add Partner ID to the FormData object
      form.append("userId", this.userId);
      // console.log("Partner ID:", this.userId);

      this.userService.bondUpload(form).subscribe({
        next: (res: any) => {
          this.uploadText = 'Upload';
          this.isUploading = false;
          this.toastr.success(res.message);
          // Close the dialog upon successful upload
          this.dialogRef.close();
        },
        error: (err) => {
          this.toastr.warning(err.error.message);
        },
      });
    } else {
      this.toastr.error("No file selected");
    }
  }
}
