import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-partner-bond",
  templateUrl: "./partner-bond.component.html",
  styleUrls: ["./partner-bond.component.css"],
})
export class PartnerBondComponent implements OnInit {
  fileUploadForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  selectedFile: File | null = null;

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      console.log("Selected file:", this.selectedFile);

      const form = new FormData();
      form.append("bond", this.selectedFile);
      this.userService.bondUpload(form).subscribe({
        next: (res: any) => {
          console.log(res.data);
          this.toastr.success(res.message);
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
